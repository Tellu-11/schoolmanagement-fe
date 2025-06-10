"use client"
import { useEffect, useState } from "react";
import { Lecture } from "./entity/lecture";
import { getAllLectures } from "./service/lectureService";
import { handleError } from "@/shared/utils/errorUtils";
import { useRouter } from "next/navigation";

export default function LecturerManagementPage() {

    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchLecture = async () => {
        try {
            const data = await getAllLectures();
            setLectures(data);
            console.log("Fetched lectures:", data);
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

    useEffect(() => {
        fetchLecture();
    }, [])

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4 bg-white rounded-lg shadow w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-medium">Lecture Management</h1>
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
                        <span>➕</span> Add Lecture
                    </button>
                </div>
            </div>
            <div className="max-h-[70vh] overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="sticky top-0 z-10 bg-[#F3F4F6]">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                                NIDN
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                                User ID
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-gray-200">
                                Faculty
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {lectures.map((lecture) => (
                            <tr
                                key={lecture.nidn}
                                className="hover:bg-[#FFC9C9] odd:bg-[#E4E6EB] transition-colors h-0"
                            >
                                <td className="px-4 py-4 text-sm text-[#667085] whitespace-nowrap">
                                    {lecture.nidn}
                                </td>
                                <td className="px-4 py-4 text-sm text-[#667085] whitespace-nowrap">
                                    {lecture.userId}
                                </td>
                                <td className="px-4 py-4 text-sm text-[#667085]">
                                    {lecture.userName}
                                </td>
                                <td className="px-4 py-4 text-sm text-[#667085]">
                                    {lecture.faculty}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}