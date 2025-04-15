const express = require('express');
const app = express();
const port = 3000;

// middleware para aceitar o JSON
app.use(express.json());

// Rotas
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);


// Iniciando o servidor
app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:${port}');
});

