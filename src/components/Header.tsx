/**
 * Header Component
 */

'use client';

import { Brain, Bell, Settings, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', active: true },
  { label: 'Learning' },
  { label: 'Habits' },
  { label: 'Trading' },
  { label: 'Ideas' },
];

function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            item.active 
              ? "bg-white/10 text-white" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function MobileNav({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <nav className="md:hidden py-4 border-t border-white/10">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          className={cn(
            "block w-full text-left px-4 py-3 transition-colors",
            item.active 
              ? "text-white bg-white/10" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function UserMenu() {
  return (
    <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-white/10">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
        <span className="text-xs font-bold text-white">SK</span>
      </div>
    </div>
  );
}

function IconButtons({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
      </button>
      <button className="hidden sm:flex p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
        <Settings className="w-5 h-5" />
      </button>
      <button 
        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
      </button>
      <UserMenu />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-50"></div>
        <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">
          Saku<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Brain</span>
        </h1>
        <p className="text-xs text-slate-400">Knowledge Dashboard</p>
      </div>
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <DesktopNav />
          <IconButtons onMenuClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        <MobileNav isOpen={isMenuOpen} />
      </div>
    </header>
  );
}
