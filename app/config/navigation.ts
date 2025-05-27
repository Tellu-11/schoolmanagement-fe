interface MenuItem {
  icon: string;
  label: string;
  path?: string;
  roles: string[];
  subItems?: MenuItem[];
  isOpen?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  { icon: '🏠', label: 'Dashboard', path: '/dashboard', roles: ['admin', 'student', 'lecture'] },
  { icon: '👨‍🏫', label: 'Lecturer Management', path: '/dashboard/lecturer', roles: ['admin', 'lecture'] },
  { icon: '🎓', label: 'Student Management', path: '/dashboard/student', roles: ['admin', 'student', 'lecture'] },
  {
    icon: '📚',
    label: 'Academic Settings',
    roles: ['admin', 'lecture'],
    subItems: [
      { icon: '📝', label: 'Course Management', path: '/dashboard/academic/course', roles: ['admin', 'lecture'] },
      { icon: '🏫', label: 'Class Management', path: '/dashboard/academic/class', roles: ['admin', 'lecture'] },
      { icon: '📊', label: 'Grade Management', path: '/dashboard/academic/grade', roles: ['admin', 'lecture'] }
    ],
    isOpen: false
  },
  { icon: '📅', label: 'Study Plan Management', path: '/dashboard/studyPlan', roles: ['admin', 'lecture'] },
  { icon: '📈', label: 'Monitoring', path: '/monitoring', roles: ['admin', 'student'] }
];
