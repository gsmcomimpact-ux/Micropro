
import React, { useState } from 'react';
import { Order, Client, OrderStatus, PaymentStatus, Invoice } from '../types';
import { Icons } from '../constants';

interface OrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  clients: Client[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export const Orders: React.FC<OrdersProps> = ({ orders, setOrders, clients, setInvoices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState<Partial<Order>>({ clientId: '', service: '', amount: 0, status: OrderStatus.PENDING, paymentStatus: PaymentStatus.UNPAID });

  const openAddModal = () => {
    setEditingOrder(null);
    setFormData({ clientId: '', service: '', amount: 0, status: OrderStatus.PENDING, paymentStatus: PaymentStatus.UNPAID });
    setIsModalOpen(true);
  };

  const openEditModal = (order: Order) => {
    setEditingOrder(order);
    setFormData(order);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientId || !formData.service || !formData.amount) return;
    
    if (editingOrder) {
      setOrders(prev => prev.map(o => o.id === editingOrder.id ? { ...o, ...formData } as Order : o));
    } else {
      const order: Order = {
        id: Math.random().toString(36).substr(2, 6).toUpperCase(),
        clientId: formData.clientId!,
        service: formData.service!,
        amount: Number(formData.amount),
        status: formData.status as OrderStatus,
        paymentStatus: formData.paymentStatus as PaymentStatus,
        date: new Date().toISOString(),
      };
      setOrders(prev => [order, ...prev]);
    }
    setIsModalOpen(false);
  };

  const markAsPaid = (order: Order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, paymentStatus: PaymentStatus.PAID, status: OrderStatus.COMPLETED } : o));
    const newInvoice: Invoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: order.id,
      amount: order.amount,
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-black">Suivi Commandes</h1>
        <button onClick={openAddModal} className="bg-orange-500 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center space-x-2 shadow-lg active:scale-95 transition-all">
          <Icons.Plus className="w-5 h-5" />
          <span>Nouvelle Mission</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-black font-black bg-white rounded-3xl border-2 border-dashed border-slate-200">Aucune commande enregistrée.</div>
        ) : (
          orders.map(order => {
            const client = clients.find(c => c.id === order.clientId);
            return (
              <div key={order.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${
                    order.status === OrderStatus.COMPLETED ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}>
                    {order.id.substr(0, 2)}
                  </div>
                  <div>
                    <p className="font-black text-black leading-tight">#{order.id} — {order.service}</p>
                    <p className="text-xs text-blue-900 font-black uppercase tracking-widest">{client?.name}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <div className="text-left md:text-right mr-4">
                    <p className="text-lg font-black text-black">{order.amount.toLocaleString()} F</p>
                    <p className="text-[10px] text-black font-black uppercase tracking-widest">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  
                  <span className={`text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-wider ${
                    order.status === OrderStatus.COMPLETED ? 'bg-emerald-100 text-emerald-900' :
                    order.status === OrderStatus.PROCESSING ? 'bg-orange-100 text-orange-900' : 'bg-slate-200 text-black'
                  }`}>
                    {order.status}
                  </span>

                  <div className="flex items-center space-x-1">
                    <button onClick={() => openEditModal(order)} className="p-2 text-black hover:text-blue-900 hover:bg-blue-50 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                    </button>
                    {order.paymentStatus !== PaymentStatus.PAID && (
                      <button onClick={() => markAsPaid(order)} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-widest">Payer</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp">
            <div className="bg-[#1E3A8A] text-white p-8 flex justify-between items-center">
              <h2 className="text-2xl font-black">{editingOrder ? 'Modifier' : 'Nouvelle'} Commande</h2>
              <button onClick={() => setIsModalOpen(false)}><Icons.Plus className="w-8 h-8 rotate-45" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-4 font-black">
                <div>
                  <label className="block text-[10px] text-black uppercase tracking-[0.2em] mb-2">Client</label>
                  <select required className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})}>
                    <option value="">Sélectionner un client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-black uppercase tracking-[0.2em] mb-2">Type de Service</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-black uppercase tracking-[0.2em] mb-2">Montant (F)</label>
                    <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-[10px] text-black uppercase tracking-[0.2em] mb-2">Statut Actuel</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-black font-black" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as OrderStatus})}>
                      {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition-all uppercase">{editingOrder ? 'Enregistrer' : 'Confirmer'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
