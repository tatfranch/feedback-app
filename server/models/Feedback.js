const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const FeedbackModel = mongoose.model('feedbacks', FeedbackSchema);
module.exports = FeedbackModel;
