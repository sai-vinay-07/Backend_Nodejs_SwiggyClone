const express = require('express');
const router = express.Router();

// ✅ Fix typo in 'Controllers' folder name and file
const vendorController = require('../Controllers/VenderControlls');

// POST /vendor/register
router.post('/register', vendorController.VenderRegister);

//POST /vendor/login
router.post('/login',vendorController.vendorLogin);

//GET /vendor/allVendorsData
router.get('/all-vendors',vendorController.getAllvendors);

//GET /vendor/single vendor data
// In your routes file
router.get('/single-vendor/:vendorId', vendorController.getVendorById);


module.exports = router;
