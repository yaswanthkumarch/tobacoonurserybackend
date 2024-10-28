// models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  sno: { type: Number, required: true },
  date: { type: Date, required: true },
  nameOrVillage: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Record', recordSchema);
