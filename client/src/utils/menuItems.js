import { dashboard, expenses, transactions, trend, dollar } from '../utils/icons.js';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard',
    },
    {
        id: 2,
        title: 'Incomes',
        icon: trend,
        link: '/income',
    },
    {
        id: 3,
        title: 'Expenses',
        icon: expenses,
        link: '/expenses',
    },
    {
        id: 4,
        title: 'Budget',
        icon: dollar, // Use the dollar icon for Budget
        link: '/budget',
    },
];
