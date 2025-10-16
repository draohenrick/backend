const { readDB, writeDB } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

exports.createEvent = (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) return res.status(400).json({ message: 'title and date required' });
  const db = readDB();
  const ev = { id: uuidv4(), title, date, ...req.body };
  db.events.push(ev);
  writeDB(db);
  res.status(201).json(ev);
};

exports.getEvents = (req, res) => {
  const db = readDB();
  res.json(db.events);
};

exports.getEventById = (req, res) => {
  const db = readDB();
  const ev = db.events.find(e => e.id === req.params.id);
  if (!ev) return res.status(404).json({ message: 'Not found' });
  res.json(ev);
};

exports.deleteEvent = (req, res) => {
  const db = readDB();
  const idx = db.events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.events.splice(idx,1);
  writeDB(db);
  res.json({ message: 'deleted' });
};
