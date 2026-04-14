
import React, { useState, useEffect } from 'react';
import { Artist } from '../types';

interface HeroProps {
  artist: Artist;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ artist, onExplore }) => {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setImgStatus('loading');
  }, [artist.imageUrl]);

  // High quality abstract fallback if image fails or is missing
  const fallbackImage = "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="relative min-h-[90vh] w-full flex items-center pt-10">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
        <div className="lg:col-span-7 space-y-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white rounded-full shadow-sm border border-slate-200/50 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[var(--artist-accent)] animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Global Artist Search</span>
          </div>
          
          <h1 className="text-8xl md:text-[120px] font-black text-[#0f172a] font-serif leading-[0.85] tracking-tighter title-reveal">
            {artist.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-light italic border-l-4 border-slate-300 pl-8">
            "{artist.bio.split('.')[0]}."
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={onExplore}
              className="btn-primary px-16 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Enter the Hub <i className="fas fa-arrow-right ml-4"></i>
            </button>
            <a 
              href={artist.officialUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-16 py-5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 transition-all flex items-center gap-4 shadow-sm"
            >
              Official Website
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          {/* Main Portrait Frame */}
          <div className="relative w-full aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white group bg-slate-100 ring-1 ring-slate-200">
             {imgStatus === 'loading' && (
               <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-[var(--artist-accent)] rounded-full animate-spin"></div>
               </div>
             )}
             <img
              src={imgStatus === 'error' || !artist.imageUrl ? fallbackImage : artist.imageUrl}
              alt={artist.name}
              onLoad={() => setImgStatus('loaded')}
              onError={() => setImgStatus('error')}
              className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s] ease-out ${imgStatus === 'loaded' ? 'loaded opacity-100' : 'opacity-0'}`}
              style={{ opacity: imgStatus === 'loaded' ? 1 : 0 }}
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent opacity-60"></div>
          </div>
          
          {/* Stats Floating Card */}
          <div className="absolute -bottom-8 -left-12 glass p-10 rounded-[3rem] shadow-2xl max-w-[300px] border-slate-200/50 animate-fade-in-up">
             <div className="space-y-8">
                <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Global Chart Ranking</span>
                    <span className="text-[var(--artist-accent)] font-black text-3xl font-serif tracking-tighter">#{artist.stats.globalRank}</span>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Audience Reach</span>
                    <span className="text-[#0f172a] font-black text-3xl font-serif tracking-tighter">{artist.stats.monthlyListeners}</span>
                </div>
             </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--artist-accent)] rounded-full blur-[80px] opacity-10 -z-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
