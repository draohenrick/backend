const { readDB, writeDB } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

exports.createTicket = (req, res) => {
  const { eventId, buyerName } = req.body;
  if (!eventId || !buyerName) return res.status(400).json({ message: 'eventId and buyerName required' });
  const db = readDB();
  const ticket = { id: uuidv4(), eventId, buyerName, ...req.body };
  db.tickets.push(ticket);
  writeDB(db);
  res.status(201).json(ticket);
};

exports.getTickets = (req, res) => {
  const db = readDB();
  res.json(db.tickets);
};

exports.getTicketById = (req, res) => {
  const db = readDB();
  const t = db.tickets.find(t => t.id === req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
};

exports.deleteTicket = (req, res) => {
  const db = readDB();
  const idx = db.tickets.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.tickets.splice(idx,1);
  writeDB(db);
  res.json({ message: 'deleted' });
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  deleteTicket
};
