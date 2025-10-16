const express = require('express');
const router = express.Router();

// Importa as funções do controller
const {
  createTicket,
  getTicketsByEvent,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

// Rota para buscar todos os ingressos de um evento específico
// GET /api/tickets/event/:eventId
router.get('/event/:eventId', getTicketsByEvent);

// Rota para criar um novo tipo de ingresso
// POST /api/tickets
router.post('/', createTicket);

// Rota para atualizar os detalhes de um ingresso
// PUT /api/tickets/:id
router.put('/:id', updateTicket);

// Rota para deletar um ingresso
// DELETE /api/tickets/:id
router.delete('/:id', deleteTicket);

module.exports = router;
