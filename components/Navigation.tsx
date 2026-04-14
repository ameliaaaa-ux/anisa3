
import React from 'react';
import { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  onSearch: (name: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  const navItems: { label: string; value: ViewType }[] = [
    { label: 'Discover', value: 'home' },
    { label: 'Biography', value: 'profile' },
    { label: 'Discography', value: 'songs' },
    { label: 'Visual Archive', value: 'gallery' },
    { label: 'Press', value: 'news' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchValue('');
      // Always reset to 'home' (Discover) when a new search is initiated
      setView('home');
    }
  };

  return (
    <>
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item">Breaking: New Tour Dates Announced</span>
          <span className="ticker-item">Exclusive: Behind the Scenes of the New Video</span>
          <span className="ticker-item">Chart Alert: Top 10 Milestone Reached</span>
          <span className="ticker-item">Global Update: Fan Hub Reaches 1M Members</span>
          <span className="ticker-item">Now Trending: Official Merch Drop</span>
        </div>
      </div>
      <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('home')}>
              <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-lg transition-all group-hover:rotate-6">
                 <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 21H7.5L9.2 17H14.8L16.5 21H20L12 3ZM10.5 14L12 10L13.5 14H10.5Z" />
                    <path d="M9 14H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="17" cy="14" r="1.5" fill="currentColor" />
                  </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 font-serif">A Music</span>
            </div>

            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setView(item.value)}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                    currentView === item.value
                      ? 'text-slate-900'
                      : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {currentView === item.value && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#0f172a] rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search Artist..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-slate-100/50 border border-slate-200 rounded-full py-2.5 px-6 pl-10 text-[10px] text-slate-800 focus:ring-2 focus:ring-slate-300 outline-none transition-all w-40 focus:w-60 placeholder:text-slate-400 font-bold tracking-wider"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
