
import React, { useState } from 'react';
import { Song, Artist } from '../../types';

interface MusicManagerProps {
  artist: Artist;
  onUpdateTracks: (tracks: Song[]) => void;
  onBack: () => void;
}

export const MusicManager: React.FC<MusicManagerProps> = ({ artist, onUpdateTracks, onBack }) => {
  const [tracks, setTracks] = useState<Song[]>([...artist.popularTracks]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Song>({ title: '', duration: '', year: new Date().getFullYear(), streams: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(tracks[index]);
    setIsAdding(false);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this track?')) {
      const newTracks = tracks.filter((_, i) => i !== index);
      setTracks(newTracks);
      onUpdateTracks(newTracks);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.duration) return;

    let newTracks: Song[];
    if (editingIndex !== null) {
      newTracks = tracks.map((t, i) => (i === editingIndex ? formData : t));
    } else {
      newTracks = [...tracks, formData];
    }

    setTracks(newTracks);
    onUpdateTracks(newTracks);
    setEditingIndex(null);
    setIsAdding(false);
    setFormData({ title: '', duration: '', year: new Date().getFullYear(), streams: '' });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setIsAdding(false);
    setFormData({ title: '', duration: '', year: new Date().getFullYear(), streams: '' });
  };

  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <button onClick={onBack} className="text-slate-400 hover:text-indigo-600 mb-2 flex items-center gap-2 text-sm font-medium transition-colors">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-slate-900 font-serif">Manage Tracks</h2>
          <p className="text-slate-500">Edit or update the popular tracklist for {artist.name}</p>
        </div>
        {!isAdding && editingIndex === null && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <i className="fas fa-plus"></i> Add New Track
          </button>
        )}
      </div>

      {(isAdding || editingIndex !== null) && (
        <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-indigo-100">
          <h3 className="font-bold text-slate-900 mb-6">{isAdding ? 'Add New Track' : 'Edit Track'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Track Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Blank Space"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Duration</label>
              <input 
                type="text" 
                value={formData.duration} 
                onChange={e => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. 3:51"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Release Year</label>
              <input 
                type="number" 
                value={formData.year} 
                onChange={e => setFormData({...formData, year: parseInt(e.target.value) || 2024})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Streams (Label)</label>
              <input 
                type="text" 
                value={formData.streams || ''} 
                onChange={e => setFormData({...formData, streams: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. 1.2B"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={cancelEdit} className="px-6 py-2 rounded-lg text-slate-500 font-bold hover:bg-slate-200 transition-all">Cancel</button>
            <button onClick={handleSave} className="px-8 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md">
              {editingIndex !== null ? 'Save Changes' : 'Add Track'}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Track</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Year</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Duration</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Streams</th>
              <th className="pb-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tracks.map((track, idx) => (
              <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-4">
                  <span className="font-bold text-slate-900">{track.title}</span>
                </td>
                <td className="py-4 text-slate-500 text-sm">{track.year}</td>
                <td className="py-4 text-slate-500 text-sm">{track.duration}</td>
                <td className="py-4 text-slate-500 text-sm">{track.streams || '-'}</td>
                <td className="py-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEdit(idx)}
                    className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Edit Track"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => handleDelete(idx)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete Track"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
