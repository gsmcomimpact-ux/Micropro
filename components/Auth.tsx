
import React, { useState } from 'react';
import { Icons } from '../constants';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'authentification
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      businessName: formData.businessName || 'Artisan Niger',
      email: formData.email,
      phone: formData.phone || '+227 00 00 00 00'
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-fadeIn">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-black font-black text-xs uppercase tracking-widest hover:text-blue-900 transition-colors"
      >
        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" /></svg>
        <span>Retour</span>
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/20">
            <Icons.Dashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-black tracking-tighter">MicroPro Niger</h1>
          <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">
            {isLogin ? 'Bon retour parmi nous' : 'Créez votre compte artisan'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black text-black uppercase tracking-widest mb-2">Nom de l'entreprise</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-black focus:border-blue-900 focus:outline-none transition-all"
                  placeholder="Ex: Niger Couture"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-black uppercase tracking-widest mb-2">Email Professionnel</label>
              <input 
                required 
                type="email" 
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-black focus:border-blue-900 focus:outline-none transition-all"
                placeholder="artisan@mail.ne"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-black uppercase tracking-widest mb-2">Mot de passe</label>
              <input 
                required 
                type="password" 
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-black focus:border-blue-900 focus:outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-tighter"
            >
              {isLogin ? 'Se Connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-black text-blue-900 uppercase tracking-widest hover:underline"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
          Sécurisé par MicroPro Cloud Niger
        </p>
      </div>
    </div>
  );
};
