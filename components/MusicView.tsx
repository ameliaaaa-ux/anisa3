
import React, { useState } from 'react';
import { Artist } from '../types';

export const MusicView: React.FC<{ artist: Artist }> = ({ artist }) => {
  const [loadedAlbums, setLoadedAlbums] = useState<Record<number, boolean>>({});

  return (
    <section className="py-40 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
          <div className="space-y-6">
            <span className="text-[#64748b] font-black text-xs uppercase tracking-[0.5em]">Chart Archive</span>
            <h2 className="text-7xl font-black text-[#0f172a] font-serif tracking-tighter leading-none">The Top 5</h2>
          </div>
          <p className="text-slate-500 text-xl font-light italic max-w-sm lg:text-right border-r-4 border-slate-200 pr-8">
            The definitive record of current global streaming momentum.
          </p>
        </div>

        <div className="space-y-4 mb-48">
          {artist.popularTracks.slice(0, 5).map((track, idx) => (
            <div key={idx} className="group glass flex items-center p-8 rounded-[2.5rem] hover:bg-white transition-all cursor-pointer border-slate-200/50 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 text-4xl font-black text-slate-200 group-hover:text-[#64748b] transition-colors font-serif italic tracking-tighter">
                {idx + 1}
              </div>
              <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white mr-8 shadow-md">
                <i className="fas fa-play text-[10px]"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-black text-[#0f172a] mb-1 tracking-tight">{track.title}</h4>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{track.year} &nbsp;•&nbsp; {track.duration}</p>
              </div>
              <div className="hidden md:flex flex-col items-end mr-16">
                <div className="text-xl font-black text-[#0f172a] group-hover:text-[#64748b] transition-colors font-serif">{track.streams || 'Multi-Platinum'}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black">Verified Plays</div>
              </div>
              <button className="w-12 h-12 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-400 transition-colors bg-slate-50">
                <i className="fas fa-heart text-sm"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-32">
             <div className="text-center space-y-6">
                <h2 className="text-6xl font-black text-[#0f172a] font-serif tracking-tighter italic">Discography</h2>
                <div className="w-24 h-1.5 bg-[#64748b] mx-auto rounded-full"></div>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
              {artist.albums.map((album, idx) => (
                <div key={idx} className="group card-hover">
                  <div className="relative mb-10">
                    <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden shadow-xl z-10 bg-slate-100 border-[8px] border-white">
                        <img
                        src={album.coverUrl}
                        alt={album.title}
                        onLoad={() => setLoadedAlbums(prev => ({ ...prev, [idx]: true }))}
                        className={`w-full h-full object-cover transition-all duration-1000 ${loadedAlbums[idx] ? 'loaded' : ''}`}
                        />
                        <div className="absolute inset-0 bg-[#0f172a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <button className="w-16 h-16 bg-white rounded-2xl text-[#0f172a] flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                                <i className="fas fa-headphones text-xl text-[#64748b]"></i>
                            </button>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-8 py-3 bg-white border border-slate-100 rounded-full z-20 font-black text-[#0f172a] text-[9px] tracking-[0.4em] shadow-xl">
                        {album.year}
                    </div>
                  </div>
                  <div className="text-center space-y-4 px-4">
                    <h3 className="text-2xl font-black text-[#0f172a] tracking-tighter">{album.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed font-light italic line-clamp-2">
                        {album.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};
