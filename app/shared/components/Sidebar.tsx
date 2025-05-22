import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '👨‍💼', label: 'Admin', path: '/admin' },
    { icon: '👨‍🎓', label: 'Students', path: '/students' },
    { icon: '👨‍🏫', label: 'Teachers', path: '/teachers' },
    { icon: '📚', label: 'Library', path: '/library' },
    { icon: '👤', label: 'Account', path: '/account' },
    { icon: '🏛️', label: 'Class', path: '/class' },
    { icon: '📖', label: 'Subject', path: '/subject' },
    { icon: '📅', label: 'Routine', path: '/routine' },
    { icon: '📝', label: 'Attendance', path: '/attendance' },
    { icon: '📋', label: 'Exam', path: '/exam' },
    { icon: '📢', label: 'Notice', path: '/notice' },
    { icon: '🚌', label: 'Transport', path: '/transport' },
    { icon: '🏠', label: 'Hostel', path: '/hostel' }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-purple-600 mb-8">SCM Academy</h1>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded-lg mb-2 transition-colors">
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;