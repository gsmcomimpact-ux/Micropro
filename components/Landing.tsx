
import React from 'react';
import { Icons } from '../constants';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div id="home" className="bg-slate-50 min-h-screen font-sans">
      {/* Header Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass-nav border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
              <Icons.Dashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">MicroPro<span className="text-orange-500">.ne</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">Services</a>
            <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">Tarifs</a>
          </div>
          <button onClick={onStart} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-orange-500 transition-all active:scale-95">
            Espace Artisan
          </button>
        </div>
      </nav>

      {/* Hero Section Modernized */}
      <section className="pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto md:flex items-center gap-16">
          <div className="md:w-3/5 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-100 mb-4">
              ✨ Propulsé par la Tech Africaine
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
              L'outil de gestion <span className="text-orange-500">indispensable</span> pour votre PME.
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              MicroPro centralise vos clients, vos factures et vos paiements. Gagnez 10h par semaine sur votre administratif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={onStart}
                className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-orange-900/20 hover:bg-slate-900 transition-all active:scale-95"
              >
                Créer mon compte
              </button>
              <button className="px-10 py-5 rounded-2xl border-2 border-slate-200 text-slate-900 font-bold hover:bg-white hover:border-slate-900 transition-all">
                Voir la démo
              </button>
            </div>
          </div>

          <div className="md:w-2/5 mt-16 md:mt-0 relative">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 relative z-10 rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                    <div className="h-4 w-32 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <p className="text-xs opacity-60 font-bold uppercase tracking-widest">Chiffre d'affaires</p>
                    <p className="text-3xl font-black mt-2">1.450.000 F</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-full bg-slate-50 rounded-2xl flex items-center px-4">
                      <div className="w-6 h-6 bg-orange-200 rounded-md mr-3"></div>
                      <div className="h-3 w-32 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-12 w-full bg-slate-50 rounded-2xl flex items-center px-4">
                      <div className="w-6 h-6 bg-blue-200 rounded-md mr-3"></div>
                      <div className="h-3 w-24 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>
            {/* Background decorations */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="features" className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-4">Fonctionnalités Clés</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-16">Tout ce dont vous avez besoin.</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Icons.Clients, title: "Clients", desc: "Base de données client complète avec historique WhatsApp." },
              { icon: Icons.Orders, title: "Missions", desc: "Suivi visuel de l'état de vos commandes de A à Z." },
              { icon: Icons.Invoices, title: "Facturation", desc: "Génération automatique de PDF et partage instantané." }
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white transition-all group">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Simple et transparent.</h3>
          <p className="text-slate-600 mb-12 font-medium">Pas de carte bancaire requise pour commencer.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 text-left">
              <p className="text-slate-500 font-bold uppercase text-xs mb-2">Plan Débutant</p>
              <p className="text-4xl font-black text-slate-900 mb-8">0 F<span className="text-sm font-bold opacity-40"> /mois</span></p>
              <ul className="space-y-4 mb-10 text-slate-600 font-medium">
                <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> 10 Clients</li>
                <li className="flex items-center"><span className="text-emerald-500 mr-2">✓</span> Commandes Illimitées</li>
              </ul>
              <button onClick={onStart} className="w-full py-4 rounded-xl border-2 border-slate-900 text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all">S'inscrire</button>
            </div>
            <div className="bg-slate-900 p-10 rounded-3xl text-white text-left shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest">Recommandé</div>
              <p className="text-slate-400 font-bold uppercase text-xs mb-2">Pack Artisan Pro</p>
              <p className="text-4xl font-black mb-8">3.000 F<span className="text-sm font-bold opacity-40"> /mois</span></p>
              <ul className="space-y-4 mb-10 text-slate-300 font-medium">
                <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> Clients Illimités</li>
                <li className="flex items-center"><span className="text-orange-500 mr-2">✓</span> Relances WhatsApp Auto</li>
              </ul>
              <button onClick={onStart} className="w-full py-4 rounded-xl bg-orange-600 text-white font-black hover:bg-orange-700 transition-all">Choisir Pro</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-slate-200 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">© 2024 MicroPro Niger • Made for Artisans</p>
      </footer>
    </div>
  );
};
