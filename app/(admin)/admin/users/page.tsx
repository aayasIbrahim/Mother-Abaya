import connectDB from "@/libs/db";
import User from "@/models/User";
import { Mail, ShieldCheck, User as UserIcon, Calendar, Search } from "lucide-react";
import RoleSelector from "@/components/admin/RoleSelector";

export default async function AdminUsersPage() {
  await connectDB();
  // ইন্ডাস্ট্রিয়াল অ্যাপে সাধারণত সব ইউজার একসাথে আনা হয় না, তবে শুরুতে সর্টিং জরুরি
  const users = await User.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="p-6 space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">User Management</h1>
          <p className="text-xs text-gray-400 font-bold uppercase mt-1">Total Registered Users: {users.length}</p>
        </div>
        
        {/* Search Bar (UI only, functional requires client state or query params) */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user: any) => (
                <tr key={user._id.toString()} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 uppercase font-black text-xs">
                        {user.name?.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="flex items-center gap-1 text-[10px] text-gray-400 font-bold lowercase">
                          <Mail size={10} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                      user.role === 'admin' 
                      ? 'bg-purple-50 text-purple-600 border-purple-100' 
                      : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {user.role === 'admin' && <ShieldCheck size={10} />}
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                      <Calendar size={12} className="text-gray-400" />
                      {new Date(user.createdAt).toLocaleDateString('en-GB')}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <RoleSelector 
                      userId={user._id.toString()} 
                      currentRole={user.role} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}