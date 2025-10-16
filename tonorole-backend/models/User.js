const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
  },
  role: {
    type: String,
    enum: ['publico', 'produtor', 'admin'],
    default: 'publico',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
