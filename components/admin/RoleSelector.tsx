"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/actions/user.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RoleSelector({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    if (newRole === currentRole) return;

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        toast.success(`Role updated to ${newRole}`);
      } else {
        toast.error("Failed to update role");
      }
    });
  };

  return (
    <div className="relative inline-block">
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-gray-400 mr-4" />
      ) : (
        <select
          value={currentRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="bg-transparent text-[10px] font-black uppercase text-gray-400 hover:text-black outline-none cursor-pointer transition-colors"
        >
          <option value="user">Make User</option>
          <option value="admin">Make Admin</option>
        </select>
      )}
    </div>
  );
}
