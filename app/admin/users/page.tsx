import connectDB from "@/libs/db";
import User from "@/models/User";
import {
  Mail,
  ShieldCheck,
  Calendar,
  Search,

  Trash2,
} from "lucide-react";
import RoleSelector from "@/components/admin/RoleSelector";
import DeleteUserBtn from "@/components/admin/DeleteUserBtn";
import SearchUsers from "@/components/admin/SearchUsers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; 
}) {
  await connectDB();

  
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  
  const filter = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(filter).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
             User Management
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            {users.length} Users Found in Mother Abaya
          </p>
        </div>

        {/* Client Component for Search */}
        <SearchUsers defaultValue={query} />
      </div>

      {/* Table Container */}
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
                      <div className="w-12 h-12 rounded-2xl bg-[#B3589D]  text-white flex items-center justify-center font-black text-sm shadow-lg shadow-black/10">
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

          {users.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 font-bold italic underline decoration-rose-500">
                No users found matching "{query}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}