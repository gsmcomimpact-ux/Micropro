
import React from 'react';
import { Client, Order, Invoice, OrderStatus } from '../types';
import { Icons } from '../constants';

interface DashboardProps {
  clients: Client[];
  orders: Order[];
  invoices: Invoice[];
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ clients, orders, invoices, setActiveTab }) => {
  const totalRevenue = orders.filter(o => o.status === OrderStatus.COMPLETED).reduce((sum, o) => sum + o.amount, 0);
  const activeOrdersCount = orders.filter(o => o.status === OrderStatus.PROCESSING || o.status === OrderStatus.PENDING).length;
  
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, color, onClick }: any) => (
    <button 
      onClick={onClick}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center space-x-5 text-left hover:shadow-xl transition-all group"
    >
      <div className={`p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-black mt-1 leading-none">{value}</p>
      </div>
    </button>
  );

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black leading-none">Tableau de bord</h1>
          <p className="text-slate-900 text-sm mt-3 font-semibold">Bon retour parmi nous, gérez vos activités.</p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 flex items-center space-x-4 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <p className="text-[10px] font-black text-black uppercase tracking-widest">Système Opérationnel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard onClick={() => setActiveTab('invoices')} title="CA Terminé" value={`${totalRevenue.toLocaleString()} F`} icon={Icons.Invoices} color="bg-emerald-500" />
        <StatCard onClick={() => setActiveTab('orders')} title="En Cours" value={activeOrdersCount} icon={Icons.Orders} color="bg-orange-500" />
        <StatCard onClick={() => setActiveTab('clients')} title="Clients" value={clients.length} icon={Icons.Clients} color="bg-blue-600" />
        <StatCard onClick={() => setActiveTab('reports')} title="Top Performance" value="98%" icon={Icons.Dashboard} color="bg-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="font-black text-black uppercase tracking-widest text-sm">Récentes activitées</h2>
            <button onClick={() => setActiveTab('orders')} className="text-blue-900 text-[10px] font-black uppercase tracking-widest hover:underline">Tout voir</button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-900 italic font-bold">Aucune commande.</div>
            ) : (
              recentOrders.map(order => {
                const client = clients.find(c => c.id === order.clientId);
                return (
                  <div key={order.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group" onClick={() => setActiveTab('orders')}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {client?.name[0] || 'C'}
                      </div>
                      <div>
                        <p className="font-black text-black">{client?.name}</p>
                        <p className="text-[10px] text-slate-900 font-black uppercase">{order.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-black">{order.amount.toLocaleString()} F</p>
                      <span className={`text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter ${
                        order.status === OrderStatus.COMPLETED ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-black text-black uppercase tracking-widest text-sm px-2">Raccourcis rapides</h2>
          <div className="grid grid-cols-2 gap-5">
            <button 
              onClick={() => setActiveTab('clients')}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-4 hover:border-orange-500 transition-all group"
            >
              <div className="p-4 rounded-2xl bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-md">
                <Icons.Plus className="w-8 h-8" />
              </div>
              <span className="text-xs font-black text-black uppercase tracking-widest">Nouveau Client</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-4 hover:border-blue-500 transition-all group"
            >
              <div className="p-4 rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                <Icons.Orders className="w-8 h-8" />
              </div>
              <span className="text-xs font-black text-black uppercase tracking-widest">Nouvelle Commande</span>
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-black text-xl leading-tight">Passez à la vitesse supérieure</h3>
              <p className="text-blue-100 text-xs mt-3 leading-relaxed font-bold">Activez les notifications WhatsApp automatiques et les exports avancés pour seulement 3.000 F / mois.</p>
              <button 
                onClick={() => setActiveTab('settings')}
                className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl hover:bg-orange-600 active:scale-95 transition-all"
              >
                Activer MicroPro+
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
              <Icons.Invoices className="w-48 h-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
