// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Record = require('./models/Record');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Updated connection string without deprecated options mydatabase
mongoose.connect('mongodb+srv://yaswanthchennareddy25:qel4iphauKWaQ2uV@cluster0.jby94.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.post('/addRecord', async (req, res) => {
  try {
    const { date, nameOrVillage, quantity, price } = req.body;
    const count = await Record.countDocuments();
    const sno = count + 1;
    const record = new Record({ sno, date, nameOrVillage, quantity, price });
    await record.save();
    res.status(201).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    const totalBags = records.reduce((acc, rec) => acc + rec.quantity, 0);
    const totalMoney = records.reduce((acc, rec) => acc + rec.quantity * rec.price, 0);
    const avg = totalMoney / totalBags || 0;
    res.status(200).send({ records, totalBags, totalMoney, avg });
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
