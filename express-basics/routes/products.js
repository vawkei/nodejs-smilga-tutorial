const express = require("express");
const router = express();

let { products } = require("../data");

router.get("/",(req,res)=>{
    res.json(products)
})



router.get("/", (req, res) => {
    const productx = products;
    const newProduct = productx.map((product) => {
      const newArray = {
        id: product.id,
        name: product.name,
        image: product.image,
      };
      return newArray;
    });
    res.json(newProduct);
  });

  router.get("/:productID", (req, res) => {
    // console.log(req)
    // console.log(req.params)
  
    //const productID = req.params  { productID: '2' }
    const { productID } = req.params; //2
  
    const singleProduct = products.find(
      (product) => product.id === Number(productID)
    );
    if (!singleProduct) {
      res.status(404).send("<h1>Product does not exist</h1>");
    }
    res.json(singleProduct);
  });

  
  

  module.exports = router;