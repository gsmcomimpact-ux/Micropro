
import React, { useState } from 'react';
import { Icons } from '../constants';
import { BusinessProfile } from '../types';

interface SettingsProps {
  setActiveTab: (tab: string) => void;
  profile: BusinessProfile;
  setProfile: React.Dispatch<React.SetStateAction<BusinessProfile>>;
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ setActiveTab, profile, setProfile, onLogout }) => {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [formData, setFormData] = useState<BusinessProfile>(profile);

  const contactSupport = (msg = "Besoin d'aide avec MicroPro Niger.") => {
    window.open(`https://wa.me/22790000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setShowProfileModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div>
        <h1 className="text-2xl font-black text-black leading-tight">Mon Profil & Paramètres</h1>
        <p className="text-black text-sm mt-1 font-black">Personnalisez votre compte et gérez votre abonnement.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 flex flex-col items-center bg-gradient-to-b from-blue-50/50 to-white">
          <div className="relative group">
            <div className="w-28 h-28 bg-[#1E3A8A] rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl transition-transform group-hover:scale-105">
              {profile.businessName ? profile.businessName[0].toUpperCase() : 'A'}
            </div>
            <button 
              onClick={() => { setFormData(profile); setShowProfileModal(true); }}
              className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-3 rounded-2xl border-4 border-white shadow-lg hover:bg-orange-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
          </div>
          <h2 className="text-2xl font-black text-black mt-6 leading-none">{profile.businessName}</h2>
          <p className="text-blue-900 font-black text-xs mt-3 uppercase tracking-[0.2em] bg-blue-100 px-4 py-1.5 rounded-full shadow-sm">Entreprise vérifiée</p>
        </div>

        <div className="p-8 space-y-3">
          <div className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-4 px-2 opacity-40">Configuration générale</div>
          
          <button onClick={() => { setFormData(profile); setShowProfileModal(true); }} className="w-full flex items-center justify-between p-6 hover:bg-slate-50 rounded-[2rem] transition-all group border border-slate-100 shadow-sm">
            <div className="flex items-center space-x-5">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                <Icons.Settings className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-black text-black">Informations Entreprise</p>
                <p className="text-[10px] text-black font-black uppercase mt-0.5 opacity-60">NIF, RCCM & Coordonnées</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-black opacity-30 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>

          <button onClick={() => setShowPlanModal(true)} className="w-full flex items-center justify-between p-6 bg-orange-50 border border-orange-200 rounded-[2rem] group transition-all hover:bg-orange-100 shadow-sm">
            <div className="flex items-center space-x-5">
              <div className="p-3 rounded-2xl bg-orange-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                <Icons.Invoices className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-black text-black text-lg">Abonnement Pro</p>
                <p className="text-[10px] text-orange-900 font-black uppercase tracking-wider mt-0.5">3.000 F / mois • Activer</p>
              </div>
            </div>
            <span className="bg-orange-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase shadow-lg">Gérer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-black">
        <button onClick={() => contactSupport()} className="bg-white p-6 rounded-[2rem] border border-slate-200 text-black text-xs flex items-center justify-center space-x-3 shadow-md hover:border-blue-900 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <span className="uppercase tracking-widest">Support Niger</span>
        </button>
        
        <button onClick={onLogout} className="bg-rose-50 p-6 rounded-[2rem] border border-rose-200 text-rose-900 text-xs flex items-center justify-center space-x-3 shadow-md hover:bg-rose-100 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-rose-200 text-rose-900 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </div>
          <span className="uppercase tracking-widest">Déconnexion</span>
        </button>
      </div>

      <div className="text-center pt-8 opacity-40">
        <p className="text-[10px] text-black font-black uppercase tracking-[0.6em]">MicroPro Niger v1.5.0</p>
      </div>

      {showPlanModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp border-4 border-orange-500">
            <div className="p-8 bg-indigo-900 text-white text-center">
              <h3 className="text-3xl font-black italic">Pack Pro</h3>
              <p className="text-blue-200 text-xs mt-2 uppercase font-black tracking-widest">Abonnement Mensuel</p>
            </div>
            <div className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl">
                  <span className="text-orange-500 font-black">✓</span>
                  <span className="text-black font-black text-sm">Clients Illimités</span>
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl">
                  <span className="text-orange-500 font-black">✓</span>
                  <span className="text-black font-black text-sm">Relances WhatsApp auto</span>
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl">
                  <span className="text-orange-500 font-black">✓</span>
                  <span className="text-black font-black text-sm">Exports PDF personnalisés</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-black">3.000 F</p>
                <p className="text-[10px] font-black uppercase text-slate-400">Par mois • Sans engagement</p>
              </div>
              <button 
                onClick={() => contactSupport("Je souhaite activer le Pack Pro à 3.000 F CFA.")}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-700 active:scale-95 transition-all"
              >
                Activer via Mobile Money
              </button>
              <button onClick={() => setShowPlanModal(false)} className="w-full text-black font-black text-xs uppercase opacity-40 py-2">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp">
            <div className="p-8 bg-blue-900 text-white flex justify-between items-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Édition Profil</h3>
              <button onClick={() => setShowProfileModal(false)}><Icons.Plus className="w-8 h-8 rotate-45" /></button>
            </div>
            <form className="p-8 space-y-5 font-black" onSubmit={handleProfileSubmit}>
              <div>
                <label className="block text-[10px] text-black uppercase tracking-widest mb-2">Nom de l'entreprise</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-black uppercase tracking-widest mb-2">NIF</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.nif} onChange={(e) => setFormData({...formData, nif: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] text-black uppercase tracking-widest mb-2">RCCM</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.rccm} onChange={(e) => setFormData({...formData, rccm: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-black uppercase tracking-widest mb-2">Adresse</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition-all mt-4 uppercase">Enregistrer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
