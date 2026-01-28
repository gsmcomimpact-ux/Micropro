
import React, { useState } from 'react';
import { Invoice, Order, Client } from '../types';
import { Icons } from '../constants';

interface InvoicesProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  orders: Order[];
  clients: Client[];
}

export const Invoices: React.FC<InvoicesProps> = ({ invoices, setInvoices, orders, clients }) => {
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  const pendingOrders = orders.filter(o => !invoices.some(inv => inv.orderId === o.id));

  const createInvoiceForOrder = (order: Order) => {
    const newInvoice: Invoice = {
      id: `FAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: order.id,
      amount: order.amount,
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const exportToCSV = () => {
    const headers = ['ID,Date,Client,Service,Montant'];
    const rows = invoices.map(inv => {
      const order = orders.find(o => o.id === inv.orderId);
      const client = clients.find(c => c.id === order?.clientId);
      return `${inv.id},${new Date(inv.date).toLocaleDateString()},"${client?.name}","${order?.service}",${inv.amount}`;
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `micropro_factures_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getInvoiceData = (inv: Invoice) => {
    const order = orders.find(o => o.id === inv.orderId);
    const client = clients.find(c => c.id === order?.clientId);
    return { order, client };
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-black leading-none">Facturation</h1>
          <p className="text-black text-sm mt-2 font-black">Gérez vos documents comptables et paiements.</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center space-x-2 bg-white border-2 border-slate-900 text-black px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span>Exporter CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black text-black uppercase tracking-[0.3em]">Historique des factures</h2>
            <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-1 rounded-full font-black uppercase">{invoices.length} Documents</span>
          </div>

          {invoices.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center mb-4">
                <Icons.Invoices className="w-8 h-8" />
              </div>
              <p className="text-black font-black">Aucune facture générée pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {invoices.map(inv => {
                const { client, order } = getInvoiceData(inv);
                return (
                  <div 
                    key={inv.id} 
                    className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all group relative overflow-hidden"
                    onClick={() => setActiveInvoice(inv)}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-12 -mt-12 rounded-full transition-transform group-hover:scale-150 group-hover:bg-blue-600/5"></div>
                    
                    <div className="flex justify-between items-start mb-6 relative">
                      <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icons.Invoices className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <p className="font-black text-black text-xl">{inv.amount.toLocaleString()} F</p>
                        <p className="text-[9px] text-black font-black uppercase tracking-widest">CFA</p>
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <p className="font-black text-black truncate">{client?.name}</p>
                      <p className="text-[10px] text-black font-black uppercase tracking-widest">{inv.id}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center relative">
                      <span className="text-[9px] text-black font-black uppercase">{new Date(inv.date).toLocaleDateString()}</span>
                      <button className="text-blue-900 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Détails</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <Icons.Plus className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-black text-black uppercase tracking-widest">Prêts à facturer</h3>
            </div>
            
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-[10px] text-black font-black uppercase tracking-widest italic opacity-50">Tout est à jour</p>
                </div>
              ) : (
                pendingOrders.map(order => {
                  const client = clients.find(c => c.id === order.clientId);
                  return (
                    <div key={order.id} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-black text-black uppercase opacity-60">CMD #{order.id}</p>
                        <p className="text-sm font-black text-black">{order.amount.toLocaleString()} F</p>
                      </div>
                      <p className="text-xs font-black text-black truncate mb-4">{order.service}</p>
                      <button 
                        onClick={() => createInvoiceForOrder(order)} 
                        className="w-full bg-blue-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-md hover:bg-blue-800"
                      >
                        Créer Facture
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1E3A8A] to-indigo-900 p-8 rounded-[3rem] text-white shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Total Facturé</p>
            <h3 className="text-3xl font-black mt-2 leading-none">
              {invoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString()} <span className="text-sm">F</span>
            </h3>
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black text-blue-200 uppercase">Mois en cours</p>
                <p className="font-black text-sm">+{invoices.length} Documents</p>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Icons.Dashboard className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto pt-20 pb-20">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-slideUp print:shadow-none print:rounded-none my-auto">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center print:hidden">
              <div className="flex space-x-2">
                <button onClick={() => window.print()} className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black active:scale-95 transition-all">
                  Imprimer / PDF
                </button>
                <button 
                  onClick={() => {
                    const { client } = getInvoiceData(activeInvoice);
                    const text = `Bonjour ${client?.name}, voici votre facture ${activeInvoice.id} d'un montant de ${activeInvoice.amount.toLocaleString()} F CFA.`;
                    window.open(`https://wa.me/${client?.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
                >
                  Envoyer WhatsApp
                </button>
              </div>
              <button onClick={() => setActiveInvoice(null)} className="p-2 text-black hover:scale-110 transition-transform">
                <Icons.Plus className="w-8 h-8 rotate-45" />
              </button>
            </div>

            <div className="p-8 md:p-12 space-y-12 bg-white print:p-0">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 text-black">
                <div>
                  <div className="bg-blue-900 text-white inline-block px-5 py-3 rounded-2xl font-black text-xl shadow-lg mb-6">
                    MicroPro Niger
                  </div>
                  <div className="space-y-1 text-sm font-black">
                    <p className="text-lg">ARTISAN PRO NIGER</p>
                    <p className="opacity-70 text-xs">Quartier Plateau, Niamey</p>
                    <p className="opacity-70 text-xs">NIF: 1234567/X • RCCM: NI-NIA-2024-B-001</p>
                    <p className="opacity-70 text-xs">Contact: +227 90 00 00 00</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <h2 className="text-4xl font-black leading-none mb-4">FACTURE</h2>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl inline-block border border-slate-200">
                    <p className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest mb-1">Numéro de pièce</p>
                    <p className="text-sm font-black text-blue-900 font-mono tracking-tighter">{activeInvoice.id}</p>
                  </div>
                  <div className="mt-4 space-y-1 text-sm font-black">
                    <p>Date: {new Date(activeInvoice.date).toLocaleDateString()}</p>
                    <p>Échéance: {new Date(activeInvoice.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                  <p className="text-[9px] font-black text-black opacity-40 uppercase tracking-[0.2em] mb-4">Client / Destinataire</p>
                  <p className="font-black text-black text-xl mb-2">{getInvoiceData(activeInvoice).client?.name}</p>
                  <div className="text-sm font-black text-black opacity-70 space-y-1">
                    <p>{getInvoiceData(activeInvoice).client?.address || 'Adresse non spécifiée'}</p>
                    <p>{getInvoiceData(activeInvoice).client?.phone}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden border-t-2 border-black pt-6">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="pb-4 text-[10px] font-black text-black uppercase tracking-widest">Désignation</th>
                      <th className="pb-4 text-[10px] font-black text-black uppercase tracking-widest text-right">Montant HT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-6 pr-4">
                        <p className="font-black text-black">{getInvoiceData(activeInvoice).order?.service}</p>
                        <p className="text-[10px] text-black opacity-50 mt-1 font-bold">Services professionnels rendus.</p>
                      </td>
                      <td className="py-6 text-right align-top">
                        <p className="font-black text-black text-lg">{activeInvoice.amount.toLocaleString()} F</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-8 border-t-2 border-black">
                <div className="order-2 md:order-1 flex flex-col items-center">
                  <p className="text-[9px] font-black text-black opacity-30 uppercase tracking-[0.3em] mb-12">Signature & Cachet</p>
                  <div className="w-40 h-40 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center opacity-30">
                    <span className="text-[8px] font-black text-black text-center">ZONE CACHET</span>
                  </div>
                </div>

                <div className="order-1 md:order-2 w-full md:w-80 space-y-4">
                  <div className="flex justify-between text-black font-black">
                    <span className="text-sm opacity-60">Sous-total</span>
                    <span className="text-sm">{activeInvoice.amount.toLocaleString()} F</span>
                  </div>
                  <div className="flex justify-between text-black font-black">
                    <span className="text-sm opacity-60">TVA (0%)</span>
                    <span className="text-sm">0 F</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t-2 border-black bg-slate-50 p-6 rounded-3xl">
                    <span className="text-xs font-black text-black uppercase tracking-widest">Net à payer</span>
                    <div className="text-right">
                      <p className="text-3xl font-black text-blue-900 leading-none">{activeInvoice.amount.toLocaleString()} F</p>
                      <p className="text-[8px] font-black text-blue-400 uppercase mt-1 tracking-widest">CFA - Niamey, Niger</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
