-- Script para la creación de la base de datos para Mega
CREATE DATABASE mega;
USE mega;

-- Script para la creación de la tabla Country
CREATE TABLE Country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Script para la creación de la tabla Client
CREATE TABLE Client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    registration_date DATE NOT NULL,
    country_id INT,
    FOREIGN KEY (country_id) REFERENCES Country(id)
);

-- Script para la creación de un índice en el campo email de la tabla Client
CREATE UNIQUE INDEX idx_email ON Client(email);

-- Script para poblar la tabla de Country
INSERT INTO Country (name) VALUES ('Chile'), ('Argentina'), ('Perú');

-- Script para poblar la tabla de Client
INSERT INTO Client (name, email, password, registration_date, country_id) VALUES
('John Doe', 'john.doe@example.com', '123456789', '2023-01-15', 1),
('Jane Smith', 'jane.smith@example.com', '123456789', '2023-02-01', 2),
('Alice Johnson', 'alice.johnson@example.com', '123456789', '2023-03-05', 3);

ALTER TABLE `client` ADD `rol` VARCHAR(40) NOT NULL DEFAULT 'user' AFTER `password`;
UPDATE `client` SET `rol` = 'admin' WHERE `client`.`id` = 1;
