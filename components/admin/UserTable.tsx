"use client";

import React from "react";
import { Mail, Calendar } from "lucide-react";
import RoleSelector from "@/components/admin/RoleSelector";
import DeleteUserBtn from "@/components/admin/DeleteUserBtn";

export default function UserTable({ users }: { users: any[] }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-100">
              <th className="px-8 py-5">User Profile</th>
              <th className="px-8 py-5">Access Level</th>
              <th className="px-8 py-5">Registration</th>
              <th className="px-8 py-5 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user: any) => (
              <tr
                key={user._id.toString()}
                className="hover:bg-gray-50/30 transition-all group"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#B3589D] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-black/10">
                      {user.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 leading-none mb-1">
                        {user.name}
                      </p>
                      <p className="flex items-center gap-1 text-[11px] text-gray-400 font-bold">
                        <Mail size={12} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-5">
                  <RoleSelector
                    userId={user._id.toString()}
                    currentRole={user.role}
                  />
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold bg-gray-100 w-fit px-3 py-1 rounded-full">
                    <Calendar size={12} />
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </td>

                <td className="px-8 py-5 text-right">
                  <DeleteUserBtn
                    userId={user._id.toString()}
                    userName={user.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
