const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // fixed typo: 'dotenc' ➜ 'dotenv'
const bodyParser = require('body-parser');
const vendorRoutes = require('./Routes/VendorRoutes');
const FirmRoutes = require('./Routes/FirmRoutes')
const productRoutes = require('./Routes/ProductsRoutes')
const path = require('path')


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load .env variables
dotenv.config({ quiet: true });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Base route
app.get('/', async (req, res) => {
  return res.status(200).send("<h1>Welcome to Swiggy");
});

// Vendor routes
app.use('/vendor', vendorRoutes);

//Firm routes
app.use('/firm',FirmRoutes);

//Product routes
app.use('/product',productRoutes);

app.use('/uploads',express.static('uploads'))

app.use('/home',(req,res)=>{
  res.send("<h1>Welcome to Swiggy");
})

const port = process.env.port || 4000;
// Start server
app.listen(port, () => {
  console.log("🚀 Server is running at http://localhost:4000");
});
