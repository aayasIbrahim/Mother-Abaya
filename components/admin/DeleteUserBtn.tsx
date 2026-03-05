"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { deleteUser } from "@/libs/actions/user";
import { toast } from "sonner";

export default function DeleteUserBtn({ userId, userName }: { userId: string, userName: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete ${userName}? This will remove all their data permanently.`)) return;

    startTransition(async () => {
      const res = await deleteUser(userId);
      if (res.success) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-3 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all disabled:opacity-50"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}