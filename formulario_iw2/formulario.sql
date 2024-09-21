-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS IPI_2;
USE IPI_2;

-- Criação da tabela usuario
CREATE TABLE usuario (
    id INT AUTO_INCREMENT RY KEY,
    nome VARCHAR(255) NOT NULL,
    nascimento DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    assunto VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adicionando alguns índices para otimizar buscas
CREATE INDEX idx_email ON usuario(email);
CREATE INDEX idx_cpf ON usuario(cpf);
CREATE INDEX idx_rg ON usuario(rg);
