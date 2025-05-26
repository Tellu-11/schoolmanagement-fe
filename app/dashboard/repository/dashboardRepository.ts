const fetchDashboardData = () => {
     const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/' },
    { icon: '👨‍🏫', label: 'Lecturer Management', path: '/lecturer' },
    { icon: '🎓', label: 'Student Management', path: '/student' },
    { icon: '📚', label: 'Academic Settings', path: '/academic' },
    { icon: '📅', label: 'Study Plan Management', path: '/studyplan' },
    { icon: '📈', label: 'Monitoring', path: '/monitoring' }
  ];

  return menuItems
  };

  export {fetchDashboardData}