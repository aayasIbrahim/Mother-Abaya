"use client";
import { useEffect } from "react";

export default function ProductTracker({ id }: { id: string }) {
  useEffect(() => {
    // ID না থাকলে বা উইন্ডো না থাকলে রিটার্ন
    if (typeof window === "undefined" || !id) return;

    try {
      const savedIds = localStorage.getItem("recentlyViewed");
      let viewedIds: string[] = [];

      // JSON পার্স করার সময় সেফটি চেক
      if (savedIds) {
        const parsed = JSON.parse(savedIds);
        if (Array.isArray(parsed)) viewedIds = parsed;
      }

      // অর্ডার আপডেট: বর্তমান আইডি সরিয়ে সবার সামনে আনা
      const updatedIds = [
        id,
        ...viewedIds.filter((existingId) => existingId !== id),
      ];

      // লিমিট সেট করা (১০টি)
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(updatedIds.slice(0, 10)),
      );
    } catch (error) {
      console.error("Recently Viewed Storage Error:", error);
    }
  }, [id]);

  return null;
}
