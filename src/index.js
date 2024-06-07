import cors from 'cors';
import express from 'express';
import CategoriasController from './controllers/CategoriasController.js';


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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
