/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
  // সার্ভার অ্যাকশনের ফাইল সাইজ লিমিট বাড়ানোর জন্য নিচের অংশটুকু যোগ করা হলো
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
