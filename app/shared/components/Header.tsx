import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-80 h-20 bg-white shadow-sm z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className='felx items-center'>
          <div className='relative'>
            <h1 className='text-3xl text-blue-950 font-semibold'>Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <i className='fi fi-rs-bell-notification-social-media'></i>
          </button>

          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image
                src="/image/admin.png"
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm text-blue-950">Papi Jio</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button>
              <i className='fi fi-br-angle-small-down'></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;