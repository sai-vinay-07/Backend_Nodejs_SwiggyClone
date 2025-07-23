const Vendor = require('../Schema/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const secretKey = process.env.WHATISYOURNAME;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);  // ✅ Correct variable name
    const vendor = await Vendor.findById(decoded.vendorId);  // ✅ Using the correct variable

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    req.vendorId = vendor._id;
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
