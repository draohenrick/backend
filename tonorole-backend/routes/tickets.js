const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/auth');

// create ticket (no auth required or change as you prefer)
router.post('/', ticketController.createTicket);
router.get('/', auth, ticketController.getTickets);
router.get('/:id', auth, ticketController.getTicketById);
router.delete('/:id', auth, ticketController.deleteTicket);

module.exports = router;
