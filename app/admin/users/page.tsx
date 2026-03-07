import connectDB from "@/libs/db";
import User from "@/models/User";
import SearchUsers from "@/components/admin/SearchUsers";
import UserTable from "@/components/admin/UserTable";



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

  const usersData = await User.find(filter).sort({ createdAt: -1 }).lean();
  
  // JSON serialization নিশ্চিত করতে
  const users = JSON.parse(JSON.stringify(usersData));

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
    </div>
  );
}