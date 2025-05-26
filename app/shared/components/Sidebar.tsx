"use client"

import { fetchDashboardData } from '@/dashboard/repository/dashboardRepository';
import { useState } from 'react';

const Sidebar = () => {

  const menuItems = fetchDashboardData();
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);

  function handleMenuClick(index: number) {
    setCurrentMenuIndex(index); 
    console.log(currentMenuIndex);
    
  }

  return (
    <aside className="w-80 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 pt-12">
        <div className="flex items-center justify-center">
          <img src="/image/GraduationCap.png" alt="" height={45} width={45} className='mr-2'/>
          <h1 className="text-5xl text-center text-blue-950 font-bold">SMS</h1>
        </div>
        <p className="text-base text-center text-gray-500 font-medium mb-8">School Management System</p>
        <nav>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => 
                handleMenuClick(index)
              }
              className={`flex w-full items-center p-3 text-base font-semibold rounded-lg mb-2 transition-colors
                ${currentMenuIndex === index
                  ? 'bg-red-400 text-white' 
                  : 'text-gray-500 hover:bg-purple-50'}
              `}>
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;