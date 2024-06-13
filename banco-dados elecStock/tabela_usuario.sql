CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- inserções padrão para iniciar a aplicação 
INSERT INTO categoria
(nome, cor, imagem)
VALUES
('Fones de ouvido','terceira','fone'),
('CPUs','quarta','cpu'),
('Mouses','primaria','mouse'),
('Televisores','secundaria','televisor'),
('Câmeras','terceira','camera'),
('Carregadores','quarta','carregador'),
('Relógios','primaria','relogio'),
('Consoles','secundaria','console'),
('Controles','terceira','controle');