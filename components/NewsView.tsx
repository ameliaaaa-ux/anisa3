
import React from 'react';
import { Artist } from '../types';

export const NewsView: React.FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex justify-between items-end">
          <div className="space-y-4">
            <span className="text-[#64748b] font-black text-xs uppercase tracking-[0.5em] mb-2 block">The Press Feed</span>
            <h2 className="text-5xl font-black text-[#0f172a] font-serif tracking-tighter">Current Headlines</h2>
          </div>
          <button className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0f172a] transition-colors pb-1 border-b-2 border-slate-200 hover:border-[#0f172a]">View All Press</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {artist.news.map((item) => (
            <article key={item.id} className="group glass rounded-[2.5rem] p-10 hover:bg-white transition-all border-slate-200/40 shadow-sm hover:shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <span className="px-5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 group-hover:bg-[#0f172a] group-hover:text-white transition-all">
                  {item.category}
                </span>
                <time className="text-slate-400 text-[9px] font-bold mt-1 uppercase tracking-tighter">{item.date}</time>
              </div>
              <h3 className="text-2xl font-black text-[#0f172a] mb-4 leading-tight group-hover:text-[#64748b] transition-colors font-serif">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-8 line-clamp-3 text-base leading-relaxed font-light italic">
                {item.excerpt}
              </p>
              <button className="flex items-center gap-3 text-[#64748b] font-black text-[9px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                The Full Story <i className="fas fa-arrow-right text-[8px]"></i>
              </button>
            </article>
          ))}
        </div>

        <div className="mt-32 glass rounded-[3.5rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border-slate-200 relative overflow-hidden shadow-2xl">
          <div className="max-w-xl text-center md:text-left relative z-10 space-y-4">
            <h3 className="text-4xl font-black text-[#0f172a] font-serif italic tracking-tighter">A Music Circle</h3>
            <p className="text-slate-600 text-lg font-light leading-relaxed">Join for priority tour access, news alerts, and exclusive digital assets.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 relative z-10">
            <input 
              type="email" 
              placeholder="Newsletter Email" 
              className="bg-white border border-slate-200 rounded-full px-8 py-4 text-[#0f172a] focus:outline-none focus:ring-4 focus:ring-slate-200/50 w-full sm:w-72 transition-all placeholder:text-slate-400 font-medium text-xs"
            />
            <button className="btn-primary px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
