import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: File) => {
  try {
    // ১. ফাইলকে বাফার থেকে বেস৬৪-এ রূপান্তর (Server Action Friendly)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    // ২. ক্লাউডিনারিতে আপলোড (ফোল্ডারসহ)
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "mother_abaya/products", // ফাইল গুছিয়ে রাখার জন্য
      resource_type: "auto",
    });

    // ৩. পুরো অবজেক্ট রিটার্ন (যাতে secure_url এবং public_id দুটাই পাওয়া যায়)
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    return result; // সফল হলে { result: 'ok' } দেয়
  } catch (err) {
    console.error("Cloudinary Delete Error:", err);
    throw new Error("Failed to delete image from Cloudinary");
  }
};