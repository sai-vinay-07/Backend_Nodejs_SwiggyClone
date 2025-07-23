const express = require('express');
const ProductController = require('../Controllers/ProductController');

const router = express.Router();

router.post('/add-product/:firmId', ProductController.addProduct);

router.get('/:firmId/products',ProductController.getProductByFirm)

router.delete('/:productId',ProductController.productDeleteById)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path2D.join(__dirname,'..','uploads',imageName));
})

module.exports = router;
