//1=======================EXPRESS BASICS ====================================//

// const express = require("express");
// const app  = express();

// app.get("/",(req,res)=>{
//     console.log("request made")
//     res.status(200).send("<h1>Home Page</h1>")
// });
// app.get("/about",(req,res)=>{
//     console.log("request made")
//     res.status(200).sendFile("./views/about.html",{root:__dirname})
// });

// //This is for routes that dont exist, to display 404:
// // app.use((req,res)=>{
// //     res.status(404).sendFile("./views/404.html",{root:__dirname})
// // })
// //Or:
// app.all("*",(req,res)=>{
//     res.status(404).send("<h1>Resource not found </p>")
// })

// app.listen(5000,"localhost", ()=>{
//     console.log("server listening on port 5000")
// });

//2==================== NAVBAR EXAMPLE=======================================//

// const express = require("express");
// const app = express();
// const path = require("path");

// //setup static and middleware:line37
// app.use(express.static("../public"))

// // app.get("/",(req,res)=>{
// //     res.sendFile(path.resolve(__dirname,"../navbar-app/index.html"))
// // })
// //Commented this out bcuz we moved the index.html into the public folder found on line 37. Together with browser-app.js,styles.css and logo.Else if i didnt move the index.html into the publiv folder along with the other, it would still work well.But moved it there for orderliness and best practice. ;
// app.all("*",(req,res)=>{
//     res.status(404).sendFile("../views/404.html",{root:__dirname})
// });

// app.listen(5000,"localhost",()=>{
//     console.log("Server is listening on port 5000")
// })

//3================WORKIN WITH DATA EXAMPLE=======================================//

// const express = require("express");
// const app = express();
// const {products,people} = require("./data")

// //The code on line 59 will output products content on the homepage
// app.get("/",(req,res)=>{
//     res.json(products)
// })

// app.listen(5000,"localhost",()=>{
//     console.log("Server listening on port 5000")
// })

//4================WORKIN WITH PARAMS & QUERY EXAMPLE=============================//

const express = require("express");
const app = express();
 const { products, people } = require("./data");

//The code on line 78 will output the words
// HOME PAGE and PRODUCTS on the homepage
// and when we click on products it serves us line 78
app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1><a href="/api/products">products</a>`);
});

//if we put res.json(products),it loads all the fields of product, but we want to load all the fields except description:
app.get("/api/products", (req, res) => {
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

// app.listen(5000, "localhost", () => {
//   console.log("Server listening on port 5000");
// });


//5A===========WORKIN WITH PARAMS TO GET A SINGLE PRODUCT EXAMPLE===================//
app.get("/api/products/:productID", (req, res) => {
    // console.log(req)
    // console.log(req.params)

  //const productID = req.params  { productID: '2' }
  const {productID} = req.params //2

    const singleProduct = products.find((product)=>product.id=== Number(productID));
    if(!singleProduct){
      res.status(404).send("<h1>Product does not exist</h1>")
    }
    res.json(singleProduct)
  });
  


  //5B========== A complex query parameter scenerio:
  app.get("/api/products/:productID/reviews/:reveiwID",(req,res)=>{
    res.send("<h1>HowZ</h1>")
    //this was what i typed:http://localhost:5000/api/products/3/reviews/1
    //then HowZ showed in the browser
  });

  // app.listen(5000, "localhost", () => {
  //   console.log("Server listening on port 5000");
  // });


//6===========WORKING WITH QUERY STRING EXAMPLE===================//
app.get("/api/v1/query",(req,res)=>{
  // console.log(req.query)
  // res.send("<h1>Hello world</h1>")

  //typed this http://localhost:5000/api/v1/query in browser . Got {} in terminal Hello World in page

  //typed this http://localhost:5000/api/v1/query?name=john&id=4 in browser. Got this in terminal:{ name: 'john', id: '4' } and Hello World in the page.

  //The name and id allows us to access the parameters and perform functionalities on them. So if the user wants to search for a specific product,he or she needs to provide that search query parameter.
  
  //So lets look for search and limit parameters instead of name and id: typed this http://localhost:5000/api/v1/query?search=a&limit=2 in browser. Got this in terminal:{ search: 'a', limit: '2' } . we are searching for products that strt with a and return 2 products.
  //Now lets setup the functionality:

  const {search,limit} =req.query
  let sortedProducts =[...products];

  if(search){
    sortedProducts= sortedProducts.filter((product)=>{
      return product.name.startsWith(search)
    }) 
  }
  if(limit){
    sortedProducts = sortedProducts.slice(0,Number(limit))
  };
  if(sortedProducts.length <1){
    return  res.send("Lisa Lipps is a hawt property")
  }
  res.status(200).json(sortedProducts)
  
});

app.listen(5000,"localhost",()=>{
  console.log("Server listening on port 5000")
});