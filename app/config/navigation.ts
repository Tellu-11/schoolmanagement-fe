interface MenuItem {
  icon: string;
  label: string;
  path?: string;
  roles: string[];
  subItems?: MenuItem[];
  isOpen?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  { icon: 'fi fi-sr-chart-pie-alt', label: 'Dashboard', path: '/dashboard', roles: ['admin', 'student', 'lecture'] },
  { icon: 'fi fi-br-workshop', label: 'Lecturer Management', path: '/dashboard/lecturer', roles: ['admin', 'lecture'] },
  { icon: 'fi fi-br-users-alt', label: 'Student Management', path: '/dashboard/student', roles: ['admin', 'student', 'lecture'] },
  {
    icon: 'fi fi-br-settings-sliders',
    label: 'Academic Settings',
    roles: ['admin', 'lecture'],
    subItems: [
      { icon: 'fi fi-rs-book-bookmark', label: 'Course Management', path: '/academic/course', roles: ['admin', 'lecture'] },
      { icon: 'fi fi-rr-school', label: 'Class Management', path: '/academic/class', roles: ['admin', 'lecture'] },
      { icon: 'fi fi-rr-test', label: 'Grade Management', path: '/academic/grade', roles: ['admin', 'lecture'] }
    ],
    isOpen: false
  },
  { icon: 'fi fi-br-book-alt', label: 'Study Plan Management', path: '/dashboard/studyPlan', roles: ['admin', 'lecture'] }
];
