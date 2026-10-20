'use client';

import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  keywords?: string; // Tambahkan properti keywords untuk pencarian bahasa Indonesia
}

interface CustomSelectProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function CustomSelect({
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // PENCARIAN PINTAR: Cari berdasarkan label (Inggris), value (Kode), dan keywords (Indonesia)
  const filteredOptions = options.filter((opt) => {
    const search = searchTerm.toLowerCase();
    return (
      opt.label.toLowerCase().includes(search) ||
      opt.value.toLowerCase().includes(search) ||
      (opt.keywords && opt.keywords.toLowerCase().includes(search))
    );
  });

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3.5 bg-white border border-gray-300 rounded text-left text-[15px] focus:outline-none transition-colors ${
          isOpen ? 'border-gray-400' : ''
        } ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:border-gray-400'}`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-600'}>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-60 w-full mt-2 bg-white border border-gray-200 rounded shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#00a991]"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          
          {/* Options List */}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">No results found</li>
            ) : (
              filteredOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 ${
                      value === opt.value ? 'bg-gray-50 font-medium text-[#00a991]' : 'text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}