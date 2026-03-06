import mongoose, { Schema, model, models } from "mongoose";

// ১. ইন্টারফেস তৈরি (TypeScript এর জন্য)
export interface IStoreSettings {
  insideDhaka: number;
  outsideDhaka: number;
  bkashNumber: string;
  supportEmail: string;
  maintenanceMode: boolean;
  announcementText: string;
  showAnnouncement: boolean;
  lowStockThreshold: number;
  facebookUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
}

// ২. মঙ্গুস স্কিমা ডিফাইন করা
const SettingsSchema = new Schema<IStoreSettings>(
  {
    insideDhaka: { 
      type: Number, 
      default: 80 
    },
    outsideDhaka: { 
      type: Number, 
      default: 150 
    },
    bkashNumber: { 
      type: String, 
      default: "" 
    },
    supportEmail: { 
      type: String, 
      default: "support@motherabaya.com" 
    },
    maintenanceMode: { 
      type: Boolean, 
      default: false 
    },
    announcementText: { 
      type: String, 
      default: "Welcome to Mother Abaya!" 
    },
    showAnnouncement: { 
      type: Boolean, 
      default: false 
    },
    lowStockThreshold: { 
      type: Number, 
      default: 5 
    },
    facebookUrl: { 
      type: String, 
      default: "" 
    },
    instagramUrl: { 
      type: String, 
      default: "" 
    },
    whatsappNumber: { 
      type: String, 
      default: "" 
    },
  },
  { 
    timestamps: true, // এটি createdAt এবং updatedAt অটোমেটিক যোগ করবে
    versionKey: false // __v ফিল্ডটি রিমুভ করবে
  }
);

// ৩. মডেল এক্সপোর্ট করা (Next.js এর জন্য hot reload হ্যান্ডলিং সহ)
const StoreSettings = models.StoreSettings || model<IStoreSettings>("StoreSettings", SettingsSchema);

export default StoreSettings;