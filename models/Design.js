const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  picture: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Связь с коллекцией Category
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Design', DesignSchema);
