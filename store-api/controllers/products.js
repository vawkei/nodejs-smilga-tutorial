//const products = require("../product.json");
const Product = require("../models/products");

//============================Normal:
const getAllProducts = async (req, res) => {
  //initially:
  //res.json(products);

  //const products = await Product.find({}); //All Products;
  //const products = await Product.find({featured:true}) Products with featured=true;
  //const products = await Product.find({name:"modern bookshelf"})Product with nameof modern bookshelf;

  const { featured, company, name, sort, fields, numericFilters } = req.query;

  // if i type in the url: localhost:3000/api/v1/products?company=ikea
  // i get ikea in the terminal
  // console.log(company);

  const queryObject = {};
  console.log(queryObject);
  //  in the terminal, i get: {}

  if (company) {
    queryObject.company = company;
    //    so if company exists in the query,create an object property in the empty queryObject and affix it to the property
  }

  //console.log(featured);
  // if i type in the url: localhost:3000/api/v1/products/static?featured=false
  // i get false in the terminal.

  if (featured) {
    // queryObject.featured = featured === "true" ? true : false;
    //0R simply put:
    queryObject.featured = featured;
    // so if featured exists in our query, create an object property in the queryObject and affix the features to the property. And if featured is true return the objects withe features of true with true, else return false. it will return false objects, because we typed fasle in the url
  }

  //console.log(name);
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }


  let results = Product.find(queryObject);
  console.log(sort);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results.sort("createdAt");
  }

  console.log(fields);
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    results = results.select(fieldsList);
    //  if i type: localhost:3000/api/v1/products?sort=-name,price&fields=company,rating
    //   i get:{
    //     "rating": 4.5,
    //     "_id": "650fad10602fe8516027771e",
    //     "company": "caressa"
    // },
    // {
    //     "rating": 4.5,
    //     "_id": "650fad10602fe8516027771c",
    //     "company": "ikea"
    // }, till the last object
  }

  const products = await results;

  //const products = await Product.find(queryObject);

  res.status(200).json({ products, nbHits: products.length });
};



//=====================
//Testing filtering{featured,name,company}:
//=====================


// const getAllProductsTesting = async (req, res) => {
//   //res.send("<h2>Lets test this motherf*cker out.<h2>")
//   //  const products = await Product.find({})

//   const { featured, company, name } = req.query;

//   // if i type in the url: localhost:3000/api/v1/products/static?company=ikea
//   // i get ikea in the terminal
//  console.log(company);

//   const queryObject = {};
//   console.log(queryObject);
//   //  in the terminal, i get: {}

//   if (company) {
//     queryObject.company = company;
//     //    so if company exists in the query,create an object property in the empty queryObject and affix it to the property
//   }

//   console.log(featured);
//   // if i type in the url: localhost:3000/api/v1/products/static?featured=false
//   // i get false in the terminal.

//   if (featured) {
//     // queryObject.featured = featured === "true" ? true : false;
//     //0R simply put:
//     queryObject.featured = featured
//     // so if featured exists in our query, create an object property in the queryObject and affix the features to the property. And if featured is true return the objects withe features of true with true, else return false. it will return false objects, because we typed fasle in the url
//   }

// console.log(name);
// if(name){
//     queryObject.name = {$regex:name,$options:"i"}
// };

// // if i type:localhost:3000/api/v1/products/static?featured=false&company=ikea&name=e
// // in the terminal i get:false,ikea,e. And all product objects that match the queries.

//   const products = await Product.find(queryObject);

//   //this returns the objects that matches whatever company we typed in our query, so if we type in ikea, it brings out every object that has ikea in it. but if we type a name like lisa ann, we get{
//   //     "products": [],
//   //     "nbHits": 0
//   // } and lisa ann in the terminal
//   res.status(200).json({ products, nbHits: products.length });
// };

//=====================Testing sorting{}:
//const getAllProductsTesting =async (req,res)=>{
//const products = await Product.find({}).sort("name");arranges the products by name alphabetically a-z. so if i type: localhost:3000/api/v1/products/static in the url, i get the products arranged from a-z

//const products = await Product.find({}).sort("-name");arranges the products by name alphabetically z-a. so if i type: localhost:3000/api/v1/products/static in the url, i get the products arranged from z-a;

//const products = await Product.find({}).sort("-name price")
//res.status(200).json({products})
//}

//=====================Testing select{}:
const getAllProductsTesting = async (req, res) => {
  //const products = await Product.find({}).select("name price")// this selects only the name and price properties.

  const products = await Product.find({price:{ $gt:30}})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(2);

  res.status(200).json({ products });
};

module.exports = { getAllProducts, getAllProductsTesting };
