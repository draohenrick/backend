const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título do evento é obrigatório.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória.'],
  },
  bannerUrl: {
    type: String,
    required: [true, 'A URL do banner é obrigatória.'],
  },
  location: {
    type: String,
    required: [true, 'A localização é obrigatória.'],
  },
  eventDate: {
    type: Date,
    required: [true, 'A data do evento é obrigatória.'],
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
