"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleError } from "@/shared/utils/errorUtils";
import { formatDate } from "@/shared/utils/dateUtils";
import { Grade } from "./entity/gradeEntity";
import { getAllGrades } from "./service/gradeService";



export default function GradePage() {
    const [grade, setGrade] = useState<Grade[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Grade | null>(null);
    const [editUser, setEditUser] = useState<Grade | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    const router = useRouter();
    
    const fetchGrade = async () => {
        try {
            const data = await getAllGrades();
            setGrade(data);
            setError(null);
        } catch (error) {
            const errorMessage = handleError(error as Error);
            if (errorMessage.includes("Unauthorized")) {
                alert("Session expired. Please login again.");
                router.push("/login"); 
            } else {
                setError("Failed to load grade data");
            }
        } finally {
            setIsLoading(false); 
        }
    };
        
    useEffect(() => {
        fetchGrade();

    }, []);

    const handleViewDetail = (user: Grade) => {
        setSelectedUser(user);
        setShowModalCreate(true);
    };

    const handleEdit = (user: Grade) => {
        setEditUser(user);
        setShowModalEdit(true);
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //       setDeleteLoading(id);
    //       await deleteGrade(id);
    //       setGrade(grade.filter((user) => user.id !== id)); 
    //     }  catch (error) {
    //       console.error("Error deleting user:", error);
    //       alert("Failed to delete user"); 
    //     } finally {
    //       setDeleteLoading(null);
    //     }
    // }
    if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading grade...</p>
        </div>
      </div>
    );
  }
  
    if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchGrade}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Grade Management</h1>
          <p className="text-gray-600 text-sm mt-1">Manage system Grade and their permissions</p>
        </div>
        <button
          onClick={() => setShowModalCreate(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Grade
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Grades</p>
              <p className="text-2xl font-bold text-blue-700">{grade.length}</p>
            </div>
            <div className="bg-blue-200 p-2 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="max-h-[60vh] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 z-10 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Course Assignment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Midterm Score 
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Final Score 
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grade.map((grade, index) => (
                <tr
                  key={grade.id}
                  className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{grade.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{grade.courseRegistrationId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{grade.midtermScore}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{grade.finalScore}</div>
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

