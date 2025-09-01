-- Criação do banco de dados
CREATE DATABASE atividadeprocessual;
USE atividadeprocessual;

-- Criação da tabela (com correção do tipo de dado para Datacompra)
CREATE TABLE usuarios(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nomeProd VARCHAR(100) NOT NULL,
    PrecoCompra DECIMAL(10,2) NOT NULL,  -- Mudei para DECIMAL para valores monetários
    Quantidade INT NOT NULL,
    Datacompra DATE NOT NULL  -- Mudei para DATE para datas
);

-- Consulta para ver todos os registros
SELECT * FROM usuarios;

-- Exemplo de inserção manual (opcional)
INSERT INTO usuarios (nomeProd, PrecoCompra, Quantidade, Datacompra) 
VALUES ('Produto Exemplo', 29.99, 5, '2024-01-15');

-- Consulta para verificar um produto específico
SELECT * FROM usuarios WHERE id = 1;

-- Comando para deletar um produto específico (exemplo)
DELETE FROM usuarios WHERE id = 1;
