
import React from 'react';
import { Order, Client, OrderStatus } from '../types';

interface ReportsProps {
  orders: Order[];
  clients: Client[];
}

export const Reports: React.FC<ReportsProps> = ({ orders, clients }) => {
  const completedOrders = orders.filter(o => o.status === OrderStatus.COMPLETED);
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.amount, 0);
  
  // Basic Stats calculation
  const monthlyRevenue = totalRevenue; // In a real app, filter by current month
  const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  // Top Clients logic
  const clientRevenueMap = new Map<string, number>();
  completedOrders.forEach(o => {
    const current = clientRevenueMap.get(o.clientId) || 0;
    clientRevenueMap.set(o.clientId, current + o.amount);
  });

  const topClients = Array.from(clientRevenueMap.entries())
    .map(([id, total]) => ({
      name: clients.find(c => c.id === id)?.name || 'Anonyme',
      total
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Rapports & Statistiques</h1>
        <p className="text-slate-500 text-sm">Analysez la performance de votre micro-entreprise.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-200 text-xs font-black uppercase tracking-widest">Revenu Total (F)</p>
            <h3 className="text-4xl font-black mt-2 leading-none">{totalRevenue.toLocaleString()} F</h3>
            <p className="text-blue-300 text-[10px] mt-4 font-bold">Basé sur {completedOrders.length} commandes terminées</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Panier Moyen</p>
          <h3 className="text-3xl font-black text-slate-800 mt-2">{averageOrderValue.toLocaleString()} F</h3>
          <div className="mt-6 flex items-center space-x-2">
            <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-2/3"></div>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">+12%</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Satisfaction</p>
          <h3 className="text-3xl font-black text-slate-800 mt-2">98%</h3>
          <p className="text-emerald-500 text-[10px] mt-4 font-bold uppercase tracking-wider">Excellent</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-900 text-lg mb-8 uppercase tracking-widest flex items-center">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">⭐</span>
          Top Clients (CA)
        </h3>
        <div className="space-y-6">
          {topClients.length === 0 ? (
            <p className="text-center text-slate-400 italic py-10">Données insuffisantes.</p>
          ) : (
            topClients.map((client, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-700">{client.name}</span>
                  <span className="font-black text-blue-900">{client.total.toLocaleString()} F</span>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                    style={{ width: `${(client.total / (topClients[0].total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
