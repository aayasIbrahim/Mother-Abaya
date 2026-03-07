import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    // ১. কাস্টমার ডিটেইলস
    customer: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },

    // ২. অর্ডার আইটেমস (পণ্যর স্ন্যাপশট রাখা ভালো যেন ভবিষ্যতে দাম বদলালে অর্ডারে সমস্যা না হয়)
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true }, // অর্ডার করার সময়কার দাম
      },
    ],

    // ৩. পেমেন্ট ও ক্যালকুলেশন
    subtotal: { type: Number, required: true, default: 0 }, // পণ্যের মোট দাম
    shippingCost: { type: Number, required: true, default: 0 }, // ডেলিভারি চার্জ
    totalAmount: { type: Number, required: true }, // subtotal + shippingCost
    paymentMethod: {
      type: String,
      enum: ["cod", "bkash", "card"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    // ৪. অর্ডার স্ট্যাটাস
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    // ৫. অতিরিক্ত তথ্য
    notes: { type: String },
    transactionId: { type: String }, // bKash/SSLCommerz এর জন্য
  },
  {
    timestamps: true, // এটি অটোমেটিক createdAt এবং updatedAt তৈরি করবে
  },
);

// নেক্সট জেএস-এ মডেল যেন বারবার রেজিস্টার না হয় সেটার হ্যান্ডলিং
const Order = models.Order || model("Order", OrderSchema);

export default Order;
