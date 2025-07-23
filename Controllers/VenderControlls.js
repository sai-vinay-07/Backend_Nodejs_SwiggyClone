const Vendor = require('../Schema/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config({ quiet: true });
const secretKey = process.env.WHATISYOURNAME;

// Vendor Registration
const VenderRegister = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Basic validation
    // if (!username || !email || !password || !confirmPassword) {
    //   return res.status(400).json({ error: "All fields are required." });
    // }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const vendorExists = await Vendor.findOne({ email });
    if (vendorExists) {
      return res.status(409).json({ error: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

  newVendor.confirmPassword = confirmPassword;
   await newVendor.save();

    res.status(201).json({ message: "Vendor successfully registered." });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Vendor Login
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ error: "Invalid email. Try again." });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password. Check it." });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Vendor login successful.", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error. Login unsuccessful." });
  }
};

const getAllvendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    res.json({vendors});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// In your controller
const getVendorById = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { VenderRegister, vendorLogin, getAllvendors, getVendorById};