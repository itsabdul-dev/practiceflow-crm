'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Stethoscope,
  LogOut,
  CalendarDays,
  CreditCard,
} from 'lucide-react';


const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Patients', href: '/patients', icon: UserCircle },
  { label: 'Clinical Notes', href: '/clinical-workspace', icon: Stethoscope },
  { label: 'Scheduling', href: '/scheduling', icon: CalendarDays },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Staff', href: '/staff-management', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] flex-shrink-0 flex-col bg-slate-900">
      {/* Brand */}
      <div className="flex items-center justify-center px-5 pt-8 pb-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="PracticeFlow"
            width={260}
            height={100}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>
      </div>


      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1 px-3 flex-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname?.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'nav-active bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <Icon className={`h-[18px] w-[18px] transition-colors ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              {label}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-400 pulse-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-xs font-bold text-white">
              SS
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Dr. Sarah Smith</p>
            <p className="text-[11px] text-slate-500">Administrator</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}