"use server";

import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { z } from "zod";
import Order from "@/models/Order";
import mongoose from "mongoose";
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
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"), // মঙ্গোডিবি আইডি চেক
        quantity: z.number().min(1).max(10), // একবারে ১০টির বেশি নয়
        size: z.string().min(1),
      }),
    )
    .min(1, "Cart cannot be empty"),
});

export async function createOrderAction(formData: any) {
  // ১. সেশন শুরু (Atomic Transaction) - এটি নিশ্চিত করে যে হয় সব হবে, নয়তো কিছুই হবে না
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectDB();

    // ২. ইনপুট ভ্যালিডেশন
    const validatedData = OrderSchema.parse(formData);

    // ৩. ডাটাবেস থেকে রিয়েল-টাইম প্রোডাক্ট ডাটা আনা
    const productIds = validatedData.items.map((i) => i.id);
    const dbProducts = await Product.find({ _id: { $in: productIds } }).session(
      session,
    );

    if (dbProducts.length !== productIds.length) {
      throw new Error("Some products in your cart are no longer available.");
    }

    let totalAmount = 0;
    const orderItems = [];

    // ৪. স্টক চেক এবং প্রাইস ক্যালকুলেশন
    for (const item of validatedData.items) {
      const product = dbProducts.find((p) => p._id.toString() === item.id);

      if (!product) throw new Error("Product data mismatch.");

      // সেফটি চেক: স্টক আছে কি না? (যদি আপনার মডেলে stock থাকে)
      if (product.stock < item.quantity) {
        throw new Error(
          `Sorry, only ${product.stock} units of ${product.name} are available.`,
        );
      }

      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;

      orderItems.push({
        product: item.id,
        name: product.name,
        quantity: item.quantity,
        size: item.size,
        price: product.price,
      });

      // ৫. স্টক কমিয়ে দেওয়া (Inventory Update)
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // ৬. অর্ডার সেভ করা
    const [newOrder] = await Order.create(
      [
        {
          customer: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            address: validatedData.address,
            city: validatedData.city,
          },
          items: orderItems,
          totalAmount,
          paymentMethod: validatedData.paymentMethod,
          status: "pending",
          notes: validatedData.notes,
        },
      ],
      { session },
    );

    // ৭. ট্রানজ্যাকশন সম্পন্ন করা
    await session.commitTransaction();
    session.endSession();

    // ৮. পেমেন্ট গেটওয়ে রিডাইরেক্ট লজিক (নিরাপদ URL হ্যান্ডলিং)
    if (validatedData.paymentMethod !== "cod") {
      return {
        success: true,
        url: `/checkout/payment?orderId=${newOrder._id}&amount=${totalAmount}`, // ব্যাকএন্ড থেকে জেনারেটেড ইউআরএল হবে এখানে
      };
    }

    return {
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    };
  } catch (error: any) {
    // যদি কোনো এরর হয়, তবে ট্রানজ্যাকশন রোলব্যাক হবে (ডাটাবেসে কোনো অর্ধেক ডাটা থাকবে না)
    await session.abortTransaction();
    session.endSession();

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((e) => e.message).join(", "),
      };
    }

    console.error("CRITICAL_ORDER_ERROR:", error);
    return {
      success: false,
      error: error.message || "Security check failed. Please try again.",
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
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);

    return { success: true, message: "Status updated!" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
