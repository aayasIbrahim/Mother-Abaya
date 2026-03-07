"use server";

import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { z } from "zod";
import Order from "@/models/Order";
import StoreSettings from "@/models/Settings";
import { revalidatePath } from "next/cache";

const OrderSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(50),
  address: z.string().trim().min(5, "Address is required").max(200),
  phone: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Invalid BD Phone Number"),
  city: z.string().min(1, "City is required"),
  email: z.string().email().toLowerCase().optional().or(z.literal("")),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum(["cod", "bkash", "card"]),
  items: z
    .array(
      z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
        quantity: z
          .number()
          .min(1, "Minimum 1 quantity required")
          .max(10, "You cannot order more than 10 units at once"),
        size: z.string().min(1, "Please select a size"),
      }),
    )
    .min(1, "Your cart cannot be empty"),
});

export async function createOrderAction(formData: any) {
  try {
    // ১. ডাটাবেস কানেকশন
    await connectDB();
    const settings = await StoreSettings.findOne({}).lean();
    const insideDhaka = settings?.insideDhaka || 80;
    const outsideDhaka = settings?.outsideDhaka || 150;
    // ২. ইনপুট ভ্যালিডেশন
    const validatedData = OrderSchema.parse(formData);

    // ৩. প্রোডাক্ট ডাটা চেক করা
    const productIds = validatedData.items.map((i) => i.id);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== productIds.length) {
      throw new Error("Some products in your cart are no longer available.");
    }

    let subtotal = 0;
    const orderItems = [];

    // ৪. স্টক চেক এবং প্রাইস ক্যালকুলেশন
    for (const item of validatedData.items) {
      const product = dbProducts.find((p) => p._id.toString() === item.id);

      if (!product) throw new Error("Product data mismatch.");
      if (product.stock <= 0) {
        throw new Error(`Sorry, ${product.name} is currently out of stock.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Only ${product.stock} units of ${product.name} are available. Please reduce the quantity.`,
        );
      }
      // ✅ লজিক: ডিসকাউন্ট প্রাইস থাকলে সেটা নাও, না থাকলে রেগুলার প্রাইস
      const currentPrice =
        product.discountPrice > 0 ? product.discountPrice : product.price;
      subtotal += currentPrice * item.quantity;

      orderItems.push({
        product: item.id,
        name: product.name,
        quantity: item.quantity,
        size: item.size,
        price: currentPrice,
      });

      // ৫. সরাসরি স্টক আপডেট (Atomic Operation)
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity },
      });
    }
    //ডেলিভারি চার্জ ক্যালকুলেশন (সার্ভার সাইড ভেরিফিকেশন)
    const shippingCost =
      validatedData.city === "dhaka" ? insideDhaka : outsideDhaka;
    const finalTotal = subtotal + shippingCost;
    // ৬. অর্ডার সেভ করা
    const newOrder = await Order.create({
      customer: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        city: validatedData.city,
      },
      items: orderItems,
      subtotal,
      shippingCost,
      totalAmount: finalTotal,
      paymentMethod: validatedData.paymentMethod,
      status: "pending",
      notes: validatedData.notes,
    });
    const orderIdStr = newOrder._id.toString();
    revalidatePath("/admin/orders");
    revalidatePath(`/order-success/${orderIdStr}`);
    revalidatePath("/admin");

    // ৭. রিডাইরেক্ট লজিক
    if (validatedData.paymentMethod !== "cod") {
      return {
        success: true,
        url: `/checkout/payment?orderId=${orderIdStr}&amount=${finalTotal}`,
        orderId: orderIdStr,
      };
    }

    return {
      success: true,
      message: "Order placed successfully!",
      orderId: orderIdStr,
    };
  } catch (error: any) {
    console.error("CRITICAL_ORDER_ERROR:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => e.message).join(", "),
      };
    }

    return {
      success: false,
      error: error.message || "Failed to place order. Please try again.",
    };
  }
}

// import { auth } from "@clerk/nextjs/server";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await connectDB();
    if (!orderId || !newStatus) {
      throw new Error("Order ID and Status are required.");
    }

    // ১. অ্যাডমিন চেক (অত্যন্ত জরুরি)
    // const session = await auth();
    // if (session?.user?.role !== "admin") throw new Error("Unauthorized");

    await Order.findByIdAndUpdate(orderId, { status: newStatus });

    // ২. পেজ রিভ্যালিডেট করা যাতে সাথে সাথে আপডেট দেখা যায়
    revalidatePath(`/admin`);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);

    return { success: true, message: "Status updated!" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
export async function deleteOrder(orderId: string) {
  try {
    await connectDB();
    await Order.findByIdAndDelete(orderId);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete order" };
  }
}
