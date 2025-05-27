'use client';

import React, { useEffect } from 'react';
import { MENU_ITEMS } from '@/config/navigation';
import { useRouter, usePathname } from 'next/navigation';
import '@flaticon/flaticon-uicons/css/all/all.css';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = React.useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    MENU_ITEMS.forEach((item, index) => {
      if (item.subItems?.some(sub => pathname === sub.path)) {
        setOpenMenus(prev => ({ ...prev, [index]: true }));
      }
    });
  }, [pathname]);

  const toggleSubmenu = (index: number) => {
    setOpenMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isActive = (path?: string) => path === pathname;

  return (
    <aside className="w-80 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 pt-12">
        <Link href={'/dashboard'} className="flex items-center justify-center">
          <Image src={"/image/graduate-hat.png"} alt="Logo" width={50} height={50} />
          <h1 className="text-5xl text-center text-blue-950 font-bold">SMS</h1>
        </Link>
        <p className="text-base text-center text-gray-500 font-medium mb-8">School Management System</p>
        <nav className="mb-32">
          {MENU_ITEMS.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleSubmenu(index);
                  } else if (item.path) {
                    router.push(item.path);
                  }
                }}
                className={`flex w-full items-center justify-between p-3 text-base font-semibold rounded-lg transition-colors cursor-pointer
                  ${isActive(item.path) && !item.subItems
                    ? 'bg-red-400 text-white'
                    : 'text-gray-500 hover:bg-red-50'}
                `}
              >
                <div className="flex items-center">
                  <span className="pr-4"><i className={item.icon}></i></span>
                  <span>{item.label}</span>
                </div>
                {item.subItems && (
                  <span className={`transform transition-transform ${openMenus[index] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                )}
              </button>
              {item.subItems && openMenus[index] && (
                <div className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => {
                        if (subItem.path) router.push(subItem.path);
                      }}
                      className={`flex w-full items-center p-2 text-sm font-medium rounded-lg transition-colors cursor-pointer
                        ${isActive(subItem.path)
                          ? 'bg-red-400 text-white'
                          : 'text-gray-500 hover:bg-red-50'}
                      `}
                    >
                      <span className="mr-2"><i className={subItem.icon}></i></span>
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={() => { }}
            className={`flex w-full items-center justify-between p-3 text-base font-semibold rounded-lg transition-colors
                  text-gray-500 hover:bg-purple-50
                `}
          >
            <div className="flex items-center">
              <span className="mr-3">⚙️</span>
              <span>Settings</span>
            </div>
          </button>
          <button
            onClick={() => { }}
            className={`flex w-full items-center justify-between p-3 text-base font-semibold rounded-lg transition-colors
                  text-gray-500 hover:bg-purple-50
                `}
          >
            <div className="flex items-center">
              <span className="mr-3">🚪</span>
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
