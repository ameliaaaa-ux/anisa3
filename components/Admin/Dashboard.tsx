
import React, { useState } from 'react';
import { Artist } from '../../types';

interface DashboardProps {
  artist: Artist;
  onLogout: () => void;
  onSelectArtist: (name: string) => void;
  onManageMusic: () => void;
  user: string;
}

export const AdminDashboard: React.FC<DashboardProps> = ({ artist, onLogout, onSelectArtist, onManageMusic, user }) => {
  const [newArtistName, setNewArtistName] = useState('');

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-serif">A Music Admin</h1>
          <p className="text-slate-500">Welcome back, <span className="font-bold text-indigo-600">{user}</span>. Manage your fanpage content.</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-slate-100 text-slate-600 px-6 py-2 rounded-full font-bold hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Active Artist</div>
          <div className="text-2xl font-bold text-slate-900 line-clamp-1">{artist.name}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 transition-all group" onClick={onManageMusic}>
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-indigo-400">Total Tracks</div>
          <div className="text-2xl font-bold text-slate-900 flex items-center justify-between">
            {artist.popularTracks.length}
            <i className="fas fa-music text-slate-100 group-hover:text-indigo-100 text-xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Profile Health</div>
          <div className="text-2xl font-bold text-emerald-500">Verified</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Last Updated</div>
          <div className="text-xl font-bold text-slate-900">Today</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Content Management</h3>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Editor</span>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={onManageMusic}
                  className="p-8 border border-slate-100 rounded-2xl text-left hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <i className="fas fa-compact-disc text-xl"></i>
                  </div>
                  <h4 className="font-bold text-slate-900">Music & Tracks</h4>
                  <p className="text-xs text-slate-400 mt-1">Manage, edit, or remove tracklist items for {artist.name}.</p>
                </button>
                <button className="p-8 border border-slate-100 rounded-2xl text-left opacity-50 cursor-not-allowed">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mb-4">
                    <i className="fas fa-images text-xl"></i>
                  </div>
                  <h4 className="font-bold text-slate-400">Gallery Assets</h4>
                  <p className="text-xs text-slate-300 mt-1">Coming Soon: Manual image upload and gallery management.</p>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6">Activity Log</h3>
            <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">User:</span> {user} logged in to the dashboard</p>
                    <p className="text-xs text-slate-400">Just now</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">System:</span> AI Profile generated for {artist.name}</p>
                    <p className="text-xs text-slate-400">Sync complete</p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
            <h3 className="text-xl font-bold mb-6">Switch Featured Artist</h3>
            <p className="text-indigo-100 text-sm mb-6">Change the main artist of the fanpage. This uses AI to populate the initial profile.</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="New Artist Name..."
                value={newArtistName}
                onChange={(e) => setNewArtistName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder:text-indigo-300 text-white outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button 
                onClick={() => {
                  if(newArtistName.trim()) {
                    onSelectArtist(newArtistName.trim());
                    setNewArtistName('');
                  }
                }}
                className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all"
              >
                Sync with AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
