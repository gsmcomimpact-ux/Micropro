
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Clients } from './components/Clients';
import { Orders } from './components/Orders';
import { Invoices } from './components/Invoices';
import { Settings } from './components/Settings';
import { Reports } from './components/Reports';
import { Landing } from './components/Landing';
import { Auth } from './components/Auth';
import { Client, Order, Invoice, BusinessProfile, User } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isStarted, setIsStarted] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [profile, setProfile] = useState<BusinessProfile>({
    businessName: 'Artisan Pro Niger',
    nif: '1234567/X',
    rccm: 'NI-NIA-2024-B-001',
    address: 'Niamey, Plateau',
    phone: '+227 90 00 00 00',
    email: 'contact@artisanpro.ne'
  });

  // Initialisation sécurisée
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      const savedClients = localStorage.getItem('clients');
      const savedOrders = localStorage.getItem('orders');
      const savedInvoices = localStorage.getItem('invoices');
      const savedProfile = localStorage.getItem('businessProfile');
      const hasStarted = localStorage.getItem('hasStarted');

      if (hasStarted === 'true') setIsStarted(true);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      if (savedClients) setClients(JSON.parse(savedClients));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    } catch (e) {
      console.error("Erreur de chargement localStorage", e);
    }
  }, []);

  // Sauvegardes persistantes
  useEffect(() => { localStorage.setItem('clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('businessProfile', JSON.stringify(profile)); }, [profile]);
  
  useEffect(() => { 
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setProfile(prev => ({...prev, businessName: currentUser.businessName}));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleStart = () => {
    setIsStarted(true);
    localStorage.setItem('hasStarted', 'true');
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    handleStart();
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      setCurrentUser(null);
      setIsStarted(false);
      localStorage.removeItem('hasStarted');
      localStorage.removeItem('currentUser');
      setActiveTab('dashboard');
    }
  };

  const renderContent = () => {
    const commonProps = { key: activeTab }; // Forcer le re-mount pour les animations
    switch (activeTab) {
      case 'dashboard': return <Dashboard clients={clients} orders={orders} invoices={invoices} setActiveTab={setActiveTab} {...commonProps} />;
      case 'clients': return <Clients clients={clients} setClients={setClients} setActiveTab={setActiveTab} {...commonProps} />;
      case 'orders': return <Orders orders={orders} setOrders={setOrders} clients={clients} setInvoices={setInvoices} {...commonProps} />;
      case 'invoices': return <Invoices invoices={invoices} setInvoices={setInvoices} orders={orders} clients={clients} {...commonProps} />;
      case 'reports': return <Reports orders={orders} clients={clients} {...commonProps} />;
      case 'settings': return <Settings setActiveTab={setActiveTab} profile={profile} setProfile={setProfile} onLogout={handleLogout} {...commonProps} />;
      default: return <Dashboard clients={clients} orders={orders} invoices={invoices} setActiveTab={setActiveTab} />;
    }
  };

  if (!isStarted) {
    return <Landing onStart={handleStart} />;
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} onBack={() => setIsStarted(false)} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      businessName={profile.businessName} 
      clientsCount={clients.length}
      onLogout={handleLogout}
    >
      <div className="animate-fadeIn transition-all duration-300">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
