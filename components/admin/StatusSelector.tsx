"use client";
import { useTransition } from "react";
// import { updateOrderStatus } from "@/app/actions/order";
import { updateOrderStatus } from "@/app/actions/order";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function StatusSelector({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        toast.success("Status updated!");
      } else {
        toast.error(result.error || "Failed to update");
      }
    });
  };

  return (
    <div className="relative flex items-center gap-2">
      <select
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={handleChange}
        className={`border rounded-lg px-2 py-1.5 text-[11px] font-bold uppercase outline-none transition-all
          ${isPending ? "opacity-50 bg-gray-100" : "bg-white hover:border-black"}`}
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {isPending && (
        <Loader2 size={14} className="animate-spin text-gray-400" />
      )}
    </div>
  );
}
