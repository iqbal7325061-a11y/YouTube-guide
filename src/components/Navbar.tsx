import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layout, Sparkles, Image as ImageIcon, Video, Beaker, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/channel', icon: Layout, label: 'Channel' },
  { path: '/ai', icon: Sparkles, label: 'AI Page' },
  { path: '/thumbmagic', icon: ImageIcon, label: 'ThumbMagic' },
  { path: '/video', icon: Video, label: 'Video' },
  { path: '/labs', icon: Beaker, label: 'Labs' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-full md:w-64 md:h-screen bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 p-4 sticky top-0 z-50">
      <div className="flex text-2xl font-bold mb-8 items-center gap-2 text-red-500">
        <Video size={32} />
        <span>YouTube Guide</span>
      </div>
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                isActive ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => auth.signOut()}
        className="mt-auto hidden md:flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors w-full"
      >
        <LogOut size={20} />
        <span className="text-sm font-medium">Log Out</span>
      </button>
    </nav>
  );
}
