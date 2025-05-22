import React from 'react';
import Image from 'next/image';

interface Student {
  id: string;
  name: string;
  avatar: string;
  marks: number;
  percent: number;
  year: number;
}

const StarStudents = () => {
  const students: Student[] = [
    {
      id: 'PRE43178',
      name: 'Evelyn Harper',
      avatar: '/students/student1.jpg',
      marks: 1185,
      percent: 98,
      year: 2014
    },
    {
      id: 'PRE43174',
      name: 'Diana Plenty',
      avatar: '/students/student2.jpg',
      marks: 1165,
      percent: 91,
      year: 2014
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Star Students</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Marks</th>
              <th className="pb-3 font-medium">Percent</th>
              <th className="pb-3 font-medium">Year</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b last:border-0">
                <td className="py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{student.id}</td>
                <td className="py-4 text-gray-600">{student.marks}</td>
                <td className="py-4 text-gray-600">{student.percent}%</td>
                <td className="py-4 text-gray-600">{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StarStudents;