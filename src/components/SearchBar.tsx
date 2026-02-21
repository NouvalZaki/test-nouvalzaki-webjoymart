// src/components/SearchBar.tsx
'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mb-10">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cari kebutuhan harianmu di Joymart..."
          className="block w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[1.5rem] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white dark:focus:bg-black transition-all shadow-inner"
        />
        {value && (
          <button 
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}