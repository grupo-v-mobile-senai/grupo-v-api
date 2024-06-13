import cors from 'cors';
import express from 'express';
import CategoriasController from './controllers/CategoriasController.js';
import AutenticacaoController from './controllers/AutenticacaoUsuariosController.js';
import UsuariosController from './controllers/UsuariosController.js';
import ProdutosController from './controllers/ProdutosController.js';

// const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);

// CRUD categorias
const categoriasController = new CategoriasController();
app.get('/categorias', categoriasController.listar)
app.post('/categorias', categoriasController.adicionar)
app.put('/', (req, res) => {
    res.send('Chamou o PUT!');
});
app.delete('/', (req, res) => {
    res.send('Chamou o DELETE!');
});

//CRUD produtos
const produtosController = new ProdutosController()
app.get('/produtos', produtosController.listar)
app.post('/produtos', produtosController.adicionar)

// autenticação
const autenticacaoController = new AutenticacaoController();
app.post('/logar', autenticacaoController.logar);

// CRUD Usuários
const usuariosController = new UsuariosController();
app.get('/usuarios', usuariosController.listar);
app.post('/usuarios', usuariosController.adicionar);
app.put('/usuarios', usuariosController.atualizar);
app.delete('/usuarios/:idUsuario', usuariosController.excluir);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
