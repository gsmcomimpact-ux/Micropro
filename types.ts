
export enum OrderStatus {
  PENDING = 'En attente',
  PROCESSING = 'En cours',
  COMPLETED = 'Terminé',
  CANCELLED = 'Annulé'
}

export enum PaymentStatus {
  UNPAID = 'Non payé',
  PARTIAL = 'Partiel',
  PAID = 'Payé'
}

export interface User {
  id: string;
  businessName: string;
  email: string;
  phone: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface Order {
  id: string;
  clientId: string;
  service: string;
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  dueDate: string;
}

export interface ReportData {
  monthlyRevenue: number;
  ordersCount: number;
  topClients: {name: string, total: number}[];
}

export interface BusinessProfile {
  businessName: string;
  nif: string;
  rccm: string;
  address: string;
  phone: string;
  email: string;
}
