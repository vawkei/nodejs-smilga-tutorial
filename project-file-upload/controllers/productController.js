const Product = require("../models/product");

const getProducts =async (req, res) => {

  // res.send("Get products");
  const products =await Product.find({});
  res.status(200).json({products})
};

const createProducts =async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({product}) 
};


module.exports = {getProducts,createProducts}