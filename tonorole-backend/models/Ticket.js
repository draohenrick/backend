const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'O nome do ingresso é obrigatório.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'O preço do ingresso é obrigatório.'],
  },
  quantity: {
    type: Number,
    required: [true, 'A quantidade de ingressos é obrigatória.'],
  },
  sold: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
