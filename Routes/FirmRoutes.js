const express = require("express")
const firmController = require('../Controllers/FirmController')
const verifyToken = require('../Middlewares/verifyToken')



const router = express.Router();

router.post('/add-firm', verifyToken, firmController.addFirm);

router.delete('/:firmId',firmController.firmDeleteById);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path2D.join(__dirname,'..','uploads',imageName));
})

module.exports =  router ;