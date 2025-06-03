import { formatDate } from "@/shared/utils/dateUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllUsers } from "../service/dashboardService";

interface Student {
  nip: string;
  name: string;
  roleName: string;
  isActive: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const StarStudents = () => {
  const [users, setUsers] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error && err.message.includes("Unauthorized")) {
          alert("Session expired. Please login again.");
          router.push("/login");
        } else {
          setError("Failed to load student data");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading students...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Star Students</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          {/* Existing SVG icon */}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 bg-gray-100">
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold">NIP</th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold">Name</th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold hidden md:table-cell">
                Role
              </th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold">Active</th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold hidden md:table-cell">
                Created By
              </th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold hidden md:table-cell">
                Updated By
              </th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold hidden md:table-cell">
                Created At
              </th>
              <th className="px-2 py-2 md:px-4 md:py-3 font-bold hidden md:table-cell">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((student) => (
              <tr
                key={student.nip}
                className="odd:bg-gray-200 hover:bg-red-200 last:border-0 transition-colors "
              >
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm">
                  {student.nip}
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm font-medium">
                  {student.name}
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm hidden md:table-cell">
                  {student.roleName}
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      student.isActive === "Yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.isActive}
                  </span>
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm hidden md:table-cell">
                  {student.createdBy}
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm hidden md:table-cell">
                  {student.updatedBy}
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm hidden md:table-cell">
                  {formatDate(student.createdAt)}
                </td>
                <td className="px-2 py-2 md:px-4 md:py-3 text-gray-700 text-sm hidden md:table-cell">
                  {formatDate(student.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StarStudents;
