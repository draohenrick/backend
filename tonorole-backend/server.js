const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- Importação das suas rotas ---
const authRoutes = require('./routes/auth'); 
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

// --- CONFIGURAÇÃO DO CORS ---
const corsOptions = {
  origin: 'https://tonorole.netlify.app',
  optionsSuccessStatus: 200 
};

// --- Middlewares ---
app.use(cors(corsOptions));
app.use(express.json());

// --- Conexão com o Banco de Dados ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// --- Rotas da API ---
app.get('/', (req, res) => {
  res.send('API da Plataforma de Eventos TonoRolê no ar!');
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes); // CORRIGIDO AQUI

// --- Iniciar o Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
