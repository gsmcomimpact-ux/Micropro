
import React, { useState } from 'react';
import { Client } from '../types';
import { Icons } from '../constants';

interface ClientsProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  setActiveTab: (tab: string) => void;
}

export const Clients: React.FC<ClientsProps> = ({ clients, setClients, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({ name: '', phone: '', email: '', address: '' });

  const CLIENT_LIMIT = 10;
  const isLimitReached = clients.length >= CLIENT_LIMIT;

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const openAddModal = () => {
    if (isLimitReached) {
      setShowUpgradeModal(true);
      return;
    }
    setEditingClient(null);
    setFormData({ name: '', phone: '', email: '', address: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    if (editingClient) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? { ...c, ...formData } as Client : c));
    } else {
      const client: Client = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        phone: formData.phone!,
        email: formData.email || '',
        address: formData.address || '',
        createdAt: new Date().toISOString(),
      };
      setClients(prev => [client, ...prev]);
    }
    setIsModalOpen(false);
  };

  const deleteClient = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce client ?')) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  const sendWhatsAppUpgrade = () => {
    const text = "Bonjour, j'ai atteint la limite de 10 clients sur MicroPro Niger et je souhaite passer au forfait Premium à 3.000 F CFA / mois.";
    window.open(`https://wa.me/22790000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-black">Annuaire Clients</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            {clients.length} / {CLIENT_LIMIT} Clients utilisés
          </p>
        </div>
        <button 
          onClick={openAddModal}
          className={`${isLimitReached ? 'bg-indigo-900' : 'bg-orange-500'} text-white px-5 py-2.5 rounded-2xl font-bold flex items-center space-x-2 shadow-lg active:scale-95 transition-all`}
        >
          {isLimitReached ? <Icons.Invoices className="w-5 h-5" /> : <Icons.Plus className="w-5 h-5" />}
          <span>{isLimitReached ? 'Passer Pro' : 'Nouveau'}</span>
        </button>
      </div>

      <div className="relative group">
        <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-focus-within:text-blue-900 transition-colors" />
        <input 
          type="text" 
          placeholder="Rechercher par nom ou numéro..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-sm text-black font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClients.map(client => (
          <div key={client.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-black text-2xl shadow-inner">
                    {client.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-black text-lg leading-tight">{client.name}</h3>
                    <p className="text-blue-900 text-sm font-black">{client.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => { setEditingClient(client); setFormData(client); setIsModalOpen(true); }} className="p-2 text-black hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button onClick={() => deleteClient(client.id)} className="p-2 text-black hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-xs">
                  <span className="w-20 font-black uppercase tracking-wider text-[10px] text-black">Lieu</span>
                  <span className="text-black font-black">{client.address || 'Non spécifié'}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-auto">
              <button 
                onClick={() => setActiveTab('orders')}
                className="flex items-center justify-center space-x-2 py-3 bg-blue-100 text-blue-900 rounded-2xl font-black text-xs hover:bg-blue-200 transition-all border border-blue-200"
              >
                <span>Détails & Historique</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp border-4 border-orange-500">
            <div className="p-8 bg-gradient-to-br from-indigo-900 to-blue-900 text-white text-center relative">
              <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-12">
                <Icons.Invoices className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black leading-tight">Limite atteinte !</h2>
              <p className="text-blue-200 text-xs mt-3 font-bold uppercase tracking-widest">Forfait Gratuit (10/10)</p>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-4">
                <p className="text-black font-black text-center text-lg leading-relaxed">
                  Félicitations pour votre croissance ! Vous avez utilisé tous vos slots gratuits.
                </p>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
                  <p className="text-xs font-black text-black flex items-center">
                    <span className="text-orange-500 mr-2 text-xl">✓</span> Clients & Commandes Illimités
                  </p>
                  <p className="text-xs font-black text-black flex items-center">
                    <span className="text-orange-500 mr-2 text-xl">✓</span> Rappels WhatsApp Automatiques
                  </p>
                  <p className="text-xs font-black text-black flex items-center">
                    <span className="text-orange-500 mr-2 text-xl">✓</span> Support Client Prioritaire
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={sendWhatsAppUpgrade}
                  className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 hover:bg-orange-700 active:scale-95 transition-all"
                >
                  Passer au Pack Pro (3.000 F)
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full py-4 text-black font-black text-xs uppercase tracking-widest hover:bg-slate-50 rounded-2xl"
                >
                  Peut-être plus tard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-slideUp">
            <div className="bg-[#1E3A8A] text-white p-8 flex justify-between items-center relative">
              <div>
                <h2 className="text-2xl font-black">{editingClient ? 'Modifier Client' : 'Nouveau Client'}</h2>
                <p className="text-blue-100 text-xs mt-1 font-bold">Détails du client {clients.length + 1}/10</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <Icons.Plus className="w-8 h-8 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Nom complet *</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all text-black font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Téléphone *</label>
                  <input required type="tel" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all text-black font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-widest mb-2">Adresse</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all text-black font-bold" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 active:scale-95 transition-all mt-4">
                {editingClient ? 'Mettre à jour' : 'Ajouter le client'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
