import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-xl shadow-sm`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

const DashboardStats = () => {
  const stats = [
    {
      title: 'Students',
      value: '15.00K',
      icon: '👨‍🎓',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Teachers',
      value: '2.00K',
      icon: '👨‍🏫',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Parents',
      value: '5.6K',
      icon: '👨‍👩‍👧‍👦',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Earnings',
      value: '$19.3K',
      icon: '💰',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;