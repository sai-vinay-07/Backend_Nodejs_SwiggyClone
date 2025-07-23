const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,  // Use Number if price is numeric
    required: true
  },
  category: [{
    type: String,
    enum: ['veg', 'non-veg'],
    required: true
  }],
  image: {
    type: String
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  firm: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm'
  }]
});

module.exports = mongoose.model('Product', productSchema);
  