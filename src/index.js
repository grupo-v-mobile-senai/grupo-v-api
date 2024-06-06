import cors from 'cors';


const express = require('express');
const port = 3000;
app.use(
    cors({
        origin: '*',
    })
);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Chamou o GET!');
});

app.post('/', (req, res) => {
    res.send('Chamou o POST!');
});

app.put('/', (req, res) => {
    res.send('Chamou o PUT!');
});

app.delete('/', (req, res) => {
    res.send('Chamou o DELETE!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
