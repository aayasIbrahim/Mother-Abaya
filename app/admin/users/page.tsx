import connectDB from "@/libs/db";
import User from "@/models/User";
import SearchUsers from "@/components/admin/SearchUsers";
import UserTable from "@/components/admin/UserTable";
import Pagination from "@/components/admin/Pagination";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>; // page যোগ করা হয়েছে
}) {
  await connectDB();

  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 5;
  const skip = (currentPage - 1) * limit;

  // সার্চ ফিল্টার লজিক
  const filter = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  // ১. ডাটা এবং টোটাল কাউন্ট একসাথে আনা (প্যাজিনেশন লজিকসহ)
  const [usersData, totalUsers] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(filter), // ফিল্টার অনুযায়ী মোট কতজন ইউজার আছে
  ]);

  // ২. সিরিয়ালাইজেশন
  const users = JSON.parse(JSON.stringify(usersData));

  // ৩. টোটাল পেজ ক্যালকুলেশন
  const totalPages = Math.ceil(totalUsers / limit);
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-0">
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

        <SearchUsers defaultValue={query} />
      </div>

      {/* Table Component */}
      {users.length > 0 ? (
        <UserTable users={users} />
      ) : (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100">
          <p className="text-gray-400 font-bold italic underline decoration-rose-500">
            No users found matching "{query}"
          </p>
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />

      <div className="text-xs text-gray-400 font-bold uppercase tracking-widest px-4">
        Showing {users.length} of {totalUsers} users
      </div>
    </div>
  );
}
