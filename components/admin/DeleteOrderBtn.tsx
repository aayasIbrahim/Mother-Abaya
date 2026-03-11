"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { deleteOrder } from "@/actions/order.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DeleteOrderBtn({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this order? This action cannot be undone.",
    );

    if (!isConfirmed) return;

    startTransition(async () => {
      try {
        const res = await deleteOrder(orderId);

        if (res.success) {
          toast.success("Order deleted successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete order");
        }
      } catch (error) {
        console.error("DELETE_ERROR:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      title="Delete Order"
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-red-600" />
      ) : (
        <Trash2
          size={16}
          className="group-hover:scale-110 transition-transform"
        />
      )}
    </button>
  );
}
