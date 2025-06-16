'use client';

import ExamResultChart from '@/dashboard/components/ExamResultChart';
import StarStudents from '@/dashboard/components/StarStudents';
import React from 'react';
import DashboardStats from './components/DashboardStats';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mt-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ExamResultChart />
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Students</h2>
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
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                    Total
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-purple-600">
                    15000
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                <div
                  style={{ width: '70%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                />
                <div
                  style={{ width: '30%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-purple-500 mr-1" />
                  Male
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-orange-500 mr-1" />
                  Female
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <StarStudents />
        </div>
      </div>
    </div>
  );
}
