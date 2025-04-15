-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS REST;

-- Usar o banco de dados
USE REST;

-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Criar índices para melhor performance
CREATE INDEX idx_email ON Users(email);