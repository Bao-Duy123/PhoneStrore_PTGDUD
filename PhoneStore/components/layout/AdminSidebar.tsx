'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSidebar } from '@/lib/store/slices/uiSlice';
import { cn } from '@/lib/utils';

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Sản phẩm', icon: Package },
  { href: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart },
  { href: '/admin/users', label: 'Người dùng', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  return (
    <aside
      className={cn(
        'bg-gray-900 text-white min-h-screen transition-all duration-300',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {isOpen && <span className="font-bold text-lg">PhoneStore Admin</span>}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-gray-800 rounded transition-colors"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-[#ff4d4f] text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && <span>{link.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back to Store */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isOpen && <span>Quay lại cửa hàng</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
