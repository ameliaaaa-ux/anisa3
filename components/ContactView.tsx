
import React from 'react';

export const ContactView: React.FC = () => {
  return (
    <section className="py-20 bg-white min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 font-serif mb-6">Get in Touch</h2>
        <p className="text-slate-500 text-lg mb-12">
          Have questions about the fanpage, press inquiries, or just want to send some love to the artist? Reach out to the team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">General Inquiry</h4>
                <p className="text-slate-500">hello@popverse-amusic.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shrink-0">
                <i className="fas fa-bullhorn"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Press & Management</h4>
                <p className="text-slate-500">management@artistrep.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shrink-0">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Mailing Address</h4>
                <p className="text-slate-500">123 Music Row, Nashville, TN 37203</p>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
            />
            <textarea 
              rows={4} 
              placeholder="Message" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            ></textarea>
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
