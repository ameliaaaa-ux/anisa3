
import React from 'react';
import { Artist } from '../types';

export const ProfileView: React.FC<{ artist: Artist }> = ({ artist }) => {
  // Ensure we have paragraphs even if the AI returns a single block
  const bioParagraphs = artist.bio.includes('\n') 
    ? artist.bio.split('\n').filter(p => p.trim() !== '')
    : [artist.bio];

  return (
    <section className="py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-28 items-start">
          
          <div className="lg:col-span-7 space-y-16">
            <div>
                <span className="text-[#64748b] font-black text-xs uppercase tracking-[0.5em] block mb-10">Career Retrospective</span>
                <h2 className="text-8xl font-black text-slate-950 mb-12 font-serif leading-[0.85] tracking-tighter italic">
                    The <br/>Narrative
                </h2>
                <div className="w-24 h-2 bg-[#64748b] rounded-full"></div>
            </div>
            
            <div className="space-y-10 text-slate-700 leading-relaxed text-xl font-light">
               {bioParagraphs.map((paragraph, i) => (
                    <p key={i} className={i === 0 ? "first-letter:text-7xl first-letter:font-serif first-letter:text-[#64748b] first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]" : ""}>
                        {paragraph}
                    </p>
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                <div className="p-10 glass rounded-[3rem] border-slate-200/50">
                    <div className="text-[9px] text-slate-400 uppercase font-black tracking-[0.3em] mb-4">Origin Hub</div>
                    <div className="text-slate-900 font-black text-2xl font-serif tracking-tight">{artist.origin}</div>
                </div>
                <div className="p-10 glass rounded-[3rem] border-slate-200/50">
                    <div className="text-[9px] text-slate-400 uppercase font-black tracking-[0.3em] mb-4">Legacy Active</div>
                    <div className="text-slate-900 font-black text-2xl font-serif tracking-tight">{artist.activeSince}</div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
             {/* New Official Connections Card */}
             <div className="p-12 bg-white rounded-[4rem] border border-slate-200/50 shadow-xl space-y-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-slate-950 mb-8 font-serif italic">Official Channels</h3>
                    <div className="space-y-4">
                        <a 
                            href={artist.officialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-[#0f172a] hover:text-white transition-all group"
                        >
                            <span className="font-bold text-sm">Official Website</span>
                            <i className="fas fa-external-link-alt text-xs opacity-40 group-hover:opacity-100"></i>
                        </a>
                        <a 
                            href={artist.instagramUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-[#E1306C] hover:text-white transition-all group"
                        >
                            <span className="font-bold text-sm">Instagram Profile</span>
                            <i className="fab fa-instagram text-base opacity-40 group-hover:opacity-100"></i>
                        </a>
                        {artist.twitterUrl && (
                            <a 
                                href={artist.twitterUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-black hover:text-white transition-all group"
                            >
                                <span className="font-bold text-sm">X (Twitter)</span>
                                <i className="fab fa-twitter text-base opacity-40 group-hover:opacity-100"></i>
                            </a>
                        )}
                    </div>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-100 rounded-full blur-3xl opacity-50"></div>
             </div>

             <div className="p-12 glass rounded-[4rem] border-slate-200/50 shadow-2xl relative">
                <h3 className="text-3xl font-black text-slate-950 mb-10 font-serif tracking-tight italic">Key Milestones</h3>
                <div className="space-y-6">
                    {artist.achievements.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex gap-6 p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 bg-[#64748b] rounded-xl flex items-center justify-center text-white text-lg shrink-0">
                            <i className="fas fa-award"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-slate-900 text-sm truncate">{item.award}</h4>
                          <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{item.year}</p>
                        </div>
                    </div>
                    ))}
                </div>
             </div>

             <div className="bg-[#0f172a] rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-[10px] font-black mb-12 uppercase tracking-[0.5em] text-slate-500">Global Reach</h3>
                    <div className="space-y-10">
                        <div>
                            <div className="text-4xl font-black mb-2 font-serif tracking-tighter">{artist.stats.followers}</div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Verified Followers</div>
                        </div>
                        <div className="h-px bg-slate-800"></div>
                        <div>
                            <div className="text-4xl font-black mb-2 font-serif tracking-tighter">Top Tier</div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Artist Ranking</div>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#64748b] opacity-10 blur-[100px]"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
