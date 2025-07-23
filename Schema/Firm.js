const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },


  area: {
    type: String,
    required: true,
    trim: true
  },

  category: [{
    type: String,
    enum: ['veg', 'non-veg']
  }],

  region: [{
    type: String,
    enum: ['south-indian', 'north-indian', 'chinese', 'bakery']  // fixed spelling: "backery" → "bakery"
  }],

  offer: {
    type: String,
    default: ''
  },

  image: {
    type: String,
    default: ''
  },

  vendor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vender'  // Ensure this matches the exported model name in Vender schema
  }],
   product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'  // Ensure this matches the exported model name in Vender schema
  }]
});

module.exports = mongoose.model('Firm', firmSchema);
