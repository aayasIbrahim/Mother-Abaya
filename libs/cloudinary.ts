import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: File) => {
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);

   await cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
    if (error) throw error;
    return result;
  });

  // Alternative: use base64 string
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64);
  return result; // contains secure_url & public_id
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