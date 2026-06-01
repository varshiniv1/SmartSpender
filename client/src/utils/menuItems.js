import { dashboard, expenses, trend } from '../utils/icons.js';

export const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: dashboard,
    path: '/dashboard',
  },
  {
    id: 2,
    title: 'Incomes',
    icon: trend,
    path: '/income',
  },
  {
    id: 3,
    title: 'Expenses',
    icon: expenses,
    path: '/expenses',
  },
];
