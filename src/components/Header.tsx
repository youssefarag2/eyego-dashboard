"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="md:hidden bg-white shadow-md p-4 flex items-center">
      <button
        onClick={onMenuClick}
        className="text-gray-600 hover:text-gray-900"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-bold text-slate-800 ml-4">Dashboard</h1>
    </header>
  );
}
