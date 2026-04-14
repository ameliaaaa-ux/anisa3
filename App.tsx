
import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProfileView } from './components/ProfileView';
import { MusicView } from './components/MusicView';
import { GalleryView } from './components/GalleryView';
import { NewsView } from './components/NewsView';
import { ContactView } from './components/ContactView';
import { AdminLogin } from './components/Admin/Login';
import { AdminDashboard } from './components/Admin/Dashboard';
import { MusicManager } from './components/Admin/MusicManager';
import { fetchArtistData } from './services/geminiService';
import { Artist, ViewType, Song } from './types';
import { INITIAL_ARTIST_NAME } from './constants';

type AdminViewType = 'dashboard' | 'music-crud';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>('home');
  const [adminView, setAdminView] = useState<AdminViewType>('dashboard');
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Update theme colors when artist changes
  useEffect(() => {
    if (artist?.themeColor) {
      document.documentElement.style.setProperty('--artist-accent', artist.themeColor);
      
      // Convert Hex to RGB for gradients
      const hex = artist.themeColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        document.documentElement.style.setProperty('--artist-accent-rgb', `${r}, ${g}, ${b}`);
      }
      
      // Persist the current artist name so reload is "sticky"
      localStorage.setItem('last_viewed_artist', artist.name);
    }
  }, [artist]);

  const loadArtist = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArtistData(name);
      setArtist(data);
    } catch (err: any) {
      const message = err?.message || "Internal error encountered.";
      setError(`Unable to retrieve data for "${name}". ${message.includes("500") ? "The AI search service is currently experiencing high load. Please try again in a moment." : "Please check your connection or try another artist."}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedArtist = localStorage.getItem('last_viewed_artist');
    loadArtist(savedArtist || INITIAL_ARTIST_NAME);
  }, [loadArtist]);

  const handleSearch = (name: string) => {
    loadArtist(name);
  };

  const handleUpdateTracks = (newTracks: Song[]) => {
    if (artist) {
      setArtist({ ...artist, popularTracks: newTracks });
    }
  };

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-[var(--artist-accent)] rounded-full animate-spin mb-6 transition-colors duration-300 shadow-sm"></div>
          <p className="text-xl font-medium animate-pulse accent-text uppercase tracking-widest text-[10px] font-black">Syncing Data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="max-w-2xl mx-auto py-32 px-4 text-center">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-100 shadow-sm">
            <i className="fas fa-exclamation-triangle text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900 font-serif italic">Interface Connection Issue</h2>
          <p className="text-slate-500 mb-10 text-lg font-light leading-relaxed">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => loadArtist(INITIAL_ARTIST_NAME)}
              className="bg-slate-900 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
            >
              Back to Default
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="accent-bg text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
            >
              Retry Connection
            </button>
          </div>
        </div>
      );
    }

    if (!artist) return null;

    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero artist={artist} onExplore={() => setView('profile')} />
            <ProfileView artist={artist} />
            <MusicView artist={artist} />
            <NewsView artist={artist} />
          </>
        );
      case 'profile':
        return <ProfileView artist={artist} />;
      case 'songs':
        return <MusicView artist={artist} />;
      case 'gallery':
        return <GalleryView artist={artist} />;
      case 'news':
        return <NewsView artist={artist} />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        if (!isAuthenticated) {
          return <AdminLogin onLogin={handleLogin} />;
        }
        
        if (adminView === 'music-crud') {
          return <MusicManager artist={artist} onUpdateTracks={handleUpdateTracks} onBack={() => setAdminView('dashboard')} />;
        }

        return (
          <AdminDashboard 
            artist={artist} 
            user={currentUser}
            onLogout={() => setIsAuthenticated(false)} 
            onManageMusic={() => setAdminView('music-crud')}
            onSelectArtist={(name) => {
              handleSearch(name);
              setView('home');
            }} 
          />
        );
      default:
        return <Hero artist={artist} onExplore={() => setView('profile')} />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-[var(--artist-accent)] selection:text-white">
      <Navigation currentView={currentView} setView={setView} onSearch={handleSearch} />
      
      {isAuthenticated && currentView !== 'admin' && (
        <div className="accent-bg text-white py-3 px-6 text-center text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in shadow-xl relative z-[60]">
          System Admin: <span className="opacity-80">{currentUser}</span> • <button onClick={() => { setView('admin'); setAdminView('dashboard'); }} className="underline decoration-2 underline-offset-4 font-black">Control Panel</button>
        </div>
      )}

      <main className="transition-opacity duration-300 min-h-[70vh]">
        {renderContent()}
      </main>

      <footer className="bg-white/80 backdrop-blur-xl py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8 group">
                <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-lg">
                   <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L4 21H7.5L9.2 17H14.8L16.5 21H20L12 3ZM10.5 14L12 10L13.5 14H10.5Z" />
                      <path d="M9 14H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="17" cy="14" r="1.5" fill="currentColor" />
                    </svg>
                </div>
                <span className="text-3xl font-black tracking-tighter text-slate-800 font-serif">A Music</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-10 leading-relaxed font-light text-lg italic">
                The premier hub for international musical excellence. Curated insights, 
                AI-driven analysis, and exclusive artist portraits.
              </p>
              <div className="flex gap-4">
                {artist?.twitterUrl && (
                  <a href={artist.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] transition-all border border-slate-100 hover:shadow-md">
                    <i className="fab fa-twitter"></i>
                  </a>
                )}
                {artist?.instagramUrl && (
                  <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#E1306C] transition-all border border-slate-100 hover:shadow-md">
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                <a href={artist?.officialUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#0f172a] transition-all border border-slate-100 hover:shadow-md">
                  <i className="fas fa-globe"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-slate-900">Explore</h4>
              <ul className="space-y-6 text-slate-400 font-medium text-sm">
                <li><button onClick={() => setView('profile')} className="hover:text-slate-900 transition-colors">Biography</button></li>
                <li><button onClick={() => setView('songs')} className="hover:text-slate-900 transition-colors">Discography</button></li>
                <li><button onClick={() => setView('gallery')} className="hover:text-slate-900 transition-colors">Visual Archive</button></li>
                <li><button onClick={() => setView('news')} className="hover:text-slate-900 transition-colors">Press</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-slate-900">Network</h4>
              <ul className="space-y-6 text-slate-400 font-medium text-sm">
                <li><button onClick={() => { setView('admin'); setAdminView('dashboard'); }} className="hover:text-slate-900 transition-colors flex items-center gap-3">
                  <i className="fas fa-lock text-[8px]"></i> Admin Portal
                </button></li>
                <li><a href={artist?.officialUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Official Store</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Fan Circle</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Media Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-300">
            <p>&copy; 2025 A Music Entertainment. Archive of Excellence.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-500 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
