const express = require("express");
const router = express();

let { products } = require("../data");


router.get("/", (req, res) => {
  
    const {search,limit} =req.query
    let sortedProducts = [...products];
  
    if (search) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.name.startsWith(search);
      });
    }
    if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
      return res.send("Lisa Lipps is a hawt property");
    }
    res.status(200).json(sortedProducts);
  });

  module.exports = router;