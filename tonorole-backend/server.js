const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Pacote para gerenciar permissões
require('dotenv').config();

// --- Importação das suas rotas ---
// (Verifique se os nomes dos arquivos estão corretos na sua pasta 'routes')
const authRoutes = require('./routes/auth'); 
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');
// Adicione outras rotas se tiver

const app = express();
const PORT = process.env.PORT || 5000;

// --- CONFIGURAÇÃO DO CORS ---
// Opções do CORS para permitir apenas o seu frontend
const corsOptions = {
  origin: 'https://tonorole.netlify.app', // Apenas este site pode fazer pedidos
  optionsSuccessStatus: 200 
};

// --- Middlewares ---
app.use(cors(corsOptions)); // Aplica a configuração do CORS
app.use(express.json());   // Para a API entender JSON

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
app..use('/api/tickets', ticketRoutes);
// Adicione outras rotas se tiver

// --- Iniciar o Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
