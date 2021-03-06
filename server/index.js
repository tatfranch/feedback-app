const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FeedbackModel = require('./models/Feedback');

require('dotenv').config();

const cors = require('cors'); //used to connect with react

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uc2be.mongodb.net/feedback_app_db?retryWrites=true&w=majority`
);

app.get('/getFeedback', (req, res) => {
  FeedbackModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post('/getFeedback', async (req, res) => {
  try {
    const feedback = req.body;
    const newFeedback = new FeedbackModel(feedback);
    await newFeedback.save();

    res.json(feedback);
    console.log('feedback', feedback);
  } catch (error) {
    res.json(error);
  }
});

app.delete('/Feedback/:id', (req, res) => {
  const id = req.params.id;

  //console.log('ID', id);
  FeedbackModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/Feedback/:id', (req, res) => {
  const id = req.params.id;
  const updItem = req.body;

  console.log('ID', id);

  FeedbackModel.findByIdAndUpdate(id, updItem, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('server runs perfectly!');
});
