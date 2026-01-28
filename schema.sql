
-- MicroPro Database Schema

CREATE DATABASE IF NOT EXISTS micropro_db;
USE micropro_db;

-- Table for Users (Artisans/PME)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    plan_type ENUM('free', 'pro', 'premium') DEFAULT 'free',
    subscription_end DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Clients
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    client_id INT NOT NULL,
    service_description TEXT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    status ENUM('En attente', 'En cours', 'Terminé', 'Annulé') DEFAULT 'En attente',
    payment_status ENUM('Non payé', 'Partiel', 'Payé') DEFAULT 'Non payé',
    order_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Table for Invoices
CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE,
    pdf_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexing for performance
CREATE INDEX idx_user_clients ON clients(user_id);
CREATE INDEX idx_user_orders ON orders(user_id);
CREATE INDEX idx_user_invoices ON invoices(user_id);
