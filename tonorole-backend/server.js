require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const ticketsRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 10000;

const FRONT = process.env.FRONTEND_URL || 'https://tonorole.netlify.app';

app.use(cors({
  origin: [FRONT, 'https://tonorole.onrender.com'],
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/tickets', ticketsRoutes);

app.get('/', (req, res) => res.json({ message: 'Tô no Rolê backend running' }));

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
