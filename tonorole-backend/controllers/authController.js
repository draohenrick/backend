const { readDB, writeDB } = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_tonorole';

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email e password required' });

  const db = readDB();
  if (db.users.find(u => u.email === email)) return res.status(409).json({ message: 'Usuário já existe' });

  const hashed = bcrypt.hashSync(password, 8);
  const user = { id: uuidv4(), name: name || '', email, password: hashed };
  db.users.push(user);
  writeDB(db);

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email e password required' });

  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
};
