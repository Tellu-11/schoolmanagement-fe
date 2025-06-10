"use client";

import { useEffect, useState } from "react";
import { User } from "./entity/userEntity";
import { getAllUsers } from "./service/userService";
import { useRouter } from "next/navigation";
import { handleError } from "@/shared/utils/errorUtils";
import { formatDate } from "@/shared/utils/dateUtils";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        console.log("Fetched users:", data);
      } catch (error) {
        const errorMessage = handleError(error as Error);
        if (errorMessage.includes("Unauthorized")) {
          alert("Session expired. Please login again.");
          router.push("/login");
        } else {
          setError("Failed to load user data");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) return <div>Loading students...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">User Management</h1>
        <div className="flex gap-3 items-center">
          <button className="px-4 py-2 text-sm bg-[#F3F4F6] hover:bg-gray-200 text-[#667085] rounded-md transition-colors flex items-center gap-2">
            {/* Icon placeholder */}
            <span>🗑️</span> Delete
          </button>
          <button className="px-4 py-2 text-sm bg-[#F3F4F6] hover:bg-gray-200 text-[#667085] rounded-md transition-colors flex items-center gap-2">
            <span>🔍</span> Filter
          </button>
          <button className="px-4 py-2 text-sm bg-[#F3F4F6] hover:bg-gray-200 text-[#667085] rounded-md transition-colors flex items-center gap-2">
            <span>📤</span> Export
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2">
            <span>➕</span> Add User
          </button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-[#F3F4F6]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                NIP
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Active
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Created By
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Updated By
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.nip}
                className="hover:bg-[#FFC9C9] odd:bg-[#E4E6EB] transition-colors h-0"
              >
                <td className="px-4 py-4 text-sm text-[#667085] whitespace-nowrap">
                  {user.nip}
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  {user.name}
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  {user.roleName}
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  <div
                    className={`inline-flex items-center gap-x-1 rounded-full px-2 py-1 ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        user.isActive ? "bg-green-600" : "bg-gray-500"
                      }`}
                    ></div>
                    {user.isActive ? "Yes" : "No"}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  {user.createdBy}
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  {user.updatedBy}
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-4 py-4 text-sm text-[#667085]">
                  {formatDate(user.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
