"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Book, 
  Users, 
  Settings,
  BarChart3
} from 'lucide-react';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart
  },
  {
    name: 'Books',
    href: '/admin/books',
    icon: Book
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}