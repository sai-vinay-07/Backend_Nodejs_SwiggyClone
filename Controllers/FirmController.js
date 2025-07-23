const Firm = require('../Schema/Firm');
const Vendor = require("../Schema/Vendor");
const multer = require("multer");
const path = require("path");

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

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : '';

        // ✅ Validate required fields
        if (!firmName || !area || !category || !region) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // ✅ Find Vendor
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // ✅ Create Firm
        const firm = new Firm({
            firmName,
            area,
            category: Array.isArray(category) ? category : [category],
            region: Array.isArray(region) ? region : [region],
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await  firm.save();

        vendor.firm.push(savedFirm)

        await vendor.save()

        res.status(201).json({ message: 'Firm added successfully', firm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const firmDeleteById = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deleteFirm = await Product.findByIdAndDelete(firmId);

        if(!deleteProduct){
            return res.status(500).json({error : "No product found"});

        }
    } 
    catch (error) {
          console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
    }
}


// ✅ Export with upload middleware
module.exports = {
    addFirm: [upload.single('image'), addFirm],firmDeleteById
};
