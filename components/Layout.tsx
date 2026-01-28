
import React, { ReactNode } from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  businessName: string;
  clientsCount?: number;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, businessName, clientsCount = 0, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Accueil', icon: Icons.Dashboard },
    { id: 'clients', label: 'Clients', icon: Icons.Clients },
    { id: 'orders', label: 'Commandes', icon: Icons.Orders },
    { id: 'invoices', label: 'Factures', icon: Icons.Invoices },
    { id: 'reports', label: 'Rapports', icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    )},
    { id: 'settings', label: 'Profil', icon: Icons.Settings },
  ];

  const clientLimit = 10;
  const progress = (clientsCount / clientLimit) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-[#1E3A8A] text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg">
            <Icons.Dashboard className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">MicroPro</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold leading-none">{businessName}</p>
            <p className="text-[10px] text-blue-200">Niger, Niamey</p>
          </div>
          <div className="w-9 h-9 bg-orange-400 rounded-full border-2 border-white flex items-center justify-center font-bold text-white shadow-sm">
            {businessName ? businessName[0].toUpperCase() : 'A'}
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-0 md:pl-64">
        <aside className="hidden md:flex flex-col w-64 bg-white border-r h-full fixed left-0 top-16 pt-4">
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-900 font-bold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-900' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-4 py-2">
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all font-bold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>Déconnexion</span>
            </button>
          </div>

          <div className="p-4 border-t">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] text-blue-900 font-black uppercase tracking-widest">Plan Gratuit</p>
                <p className="text-[10px] font-black text-black">{clientsCount}/{clientLimit}</p>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden border border-blue-100 mb-4">
                <div 
                  className={`h-full transition-all duration-1000 ${clientsCount >= clientLimit ? 'bg-orange-500' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <button 
                onClick={() => setActiveTab('settings')}
                className="w-full bg-blue-900 text-white text-[10px] font-black py-2.5 rounded-xl hover:bg-black transition-all shadow-md uppercase tracking-widest"
              >
                Passer Premium
              </button>
            </div>
          </div>
        </aside>

        <div className="max-w-6xl mx-auto p-4 md:p-8 mb-10">
          {children}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t flex justify-around items-center py-2 px-1 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center flex-1 py-1 rounded-lg transition-all ${
              activeTab === item.id ? 'text-blue-900 scale-110' : 'text-slate-400'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[9px] mt-1 font-bold uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
