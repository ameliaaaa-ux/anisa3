
import React, { useState } from 'react';
import { Artist } from '../types';

export const GalleryView: React.FC<{ artist: Artist }> = ({ artist }) => {
  const [loadedIndices, setLoadedIndices] = useState<Record<number, boolean>>({});

  const moments = [
    "on stage",
    "concert tour",
    "backstage",
    "red carpet",
    "music video",
    "portrait",
  ];

  const artistSearchTerm = encodeURIComponent(artist.name.toLowerCase().replace(/\s/g, ''));

  return (
    <section className="py-40 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32 space-y-6">
            <span className="accent-text font-black text-xs uppercase tracking-[0.5em] block">Visual Archive</span>
            <h2 className="text-7xl font-black text-slate-900 font-serif tracking-tighter italic">Iconic <span className="opacity-40 not-italic">Moments</span></h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          {moments.map((moment, i) => (
            <div key={i} className="relative group overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-xl cursor-zoom-in">
              <img
                src={`https://loremflickr.com/800/1000/${artistSearchTerm},${encodeURIComponent(moment.replace(/\s/g, ''))}/all?lock=${i + 50}`}
                alt={`${artist.name} ${moment}`}
                onLoad={() => setLoadedIndices(prev => ({ ...prev, [i]: true }))}
                className={`w-full h-auto object-cover transition-all duration-1000 ${loadedIndices[i] ? 'loaded' : ''}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-12 flex flex-col justify-end backdrop-blur-[2px]">
                <div className="w-12 h-1 accent-bg mb-6 transform -translate-x-6 group-hover:translate-x-0 transition-transform duration-700"></div>
                <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Capture: {moment}</p>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed">A definitive visual record from the current global era.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
