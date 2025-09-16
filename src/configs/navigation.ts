import { LayoutDashboard, Users } from 'lucide-react';

export type BaseMainItem = {
  title: string;
  icon: React.ElementType;
  url: string;
};

export type CollapsibleNavMainItem = Omit<BaseMainItem, 'url'> & {
  defaultOpen?: boolean;
  items: Array<{
    title: string;
    url: string;
  }>;
};

export type NavMainItem = CollapsibleNavMainItem | BaseMainItem;

export const navMain: NavMainItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'User Management',
    defaultOpen: true,
    icon: Users,
    items: [
      {
        title: 'Overview',
        url: '/users',
      },
      {
        title: 'Role & Group',
        url: '/users/roles',
      },
      {
        title: 'Settings',
        url: '/users/settings',
      },
    ],
  },
];
