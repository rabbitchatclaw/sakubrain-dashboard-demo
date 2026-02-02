/**
 * Header Component with Scroll Navigation
 */

'use client';

import { Brain, Bell, Settings, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', id: 'overview' },
  { label: 'Learning', id: 'learning' },
  { label: 'Habits', id: 'habits' },
  { label: 'Trading', id: 'trading' },
  { label: 'Ideas', id: 'ideas' },
];

// Scroll to section helper
function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80; // Height of sticky header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return true;
  }
  return false;
}

function DesktopNav() {
  const { showToast } = useToast();
  const [activeItem, setActiveItem] = useState('overview');

  // Track scroll position to update active menu
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));
      
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveItem(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, label: string) => {
    const success = scrollToSection(id);
    if (success) {
      setActiveItem(id);
      showToast(`Scrolled to ${label} 📍`, 'info');
    } else {
      showToast(`Section ${label} not found`, 'error');
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id, item.label)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            activeItem === item.id
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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { showToast } = useToast();
  const [activeItem, setActiveItem] = useState('overview');

  if (!isOpen) return null;

  const handleNavClick = (id: string, label: string) => {
    const success = scrollToSection(id);
    if (success) {
      setActiveItem(id);
      showToast(`Scrolled to ${label} 📍`, 'info');
      onClose();
    }
  };

  return (
    <nav className="md:hidden py-4 border-t border-white/10 animate-in slide-in-from-top-2">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id, item.label)}
          className={cn(
            "block w-full text-left px-4 py-3 transition-colors rounded-lg",
            activeItem === item.id
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
  const { showToast } = useToast();
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className="flex items-center gap-2">
      <button 
        className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        onClick={() => {
          setHasNotifications(false);
          showToast('No new notifications', 'info');
        }}
      >
        <Bell className="w-5 h-5" />
        {hasNotifications && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
        )}
      </button>
      <button 
        className="hidden sm:flex p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        onClick={() => showToast('Settings panel coming soon!', 'info')}
      >
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
  const { showToast } = useToast();
  
  return (
    <div 
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Back to top 👆', 'info');
      }}
    >
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
        <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
