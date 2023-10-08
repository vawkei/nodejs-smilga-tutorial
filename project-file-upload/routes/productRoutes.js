const express = require("express");
const router = express.Router();

const {getProducts,createProducts} = require("../controllers/productController");
const {uploadProductImage} = require("../controllers/uploadsController");


router.get("/",getProducts);
  
router.post("/",createProducts);

router.post("/uploads",uploadProductImage);

  module.exports =router;