const path = require("path");
const Firm = require('../Schema/Firm');
const Product = require('../Schema/Products');
const multer = require("multer");
const { findById } = require("../Schema/Vendor");
const { error } = require("console");

// ✅ Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, filename);
    }
});

// ✅ Multer upload middleware
const upload = multer({ storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : '';

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(400).json({ error: "Firm ID not found!" });
        }

        // Create new product
        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: [firm._id]  // 👈 Wrap in array, because schema uses type: [ObjectId]
        });

        const savedProduct = await product.save();

        // If your Firm schema includes a "products" array, push it:
        firm.product.push(savedProduct._id); 
        await firm.save(); // 👈 this was missing the parentheses!

        res.status(200).json(savedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "No firm Found" });
    }

    const products = await Product.find({ firm: firmId });
    const resturentName = firm.firmName; // ✅ correct!

    res.status(200).json({ resturentName, products });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const productDeleteById = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deleteProduct = await Product.findByIdAndDelete(productId);

        if(!deleteProduct){
            return res.status(500).json({error : "No product found"});

        }
    } 
    catch (error) {
          console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
    }
}


// Export with upload middleware
module.exports = {
    addProduct: [upload.single('image'), addProduct],getProductByFirm,productDeleteById
};
