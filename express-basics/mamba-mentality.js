const express = require("express");
const app = express();
const {products,people} = require("./data");

app.get("/", (req, res) => {
  const query = req.query; 
  //typed in the browser: http://localhost:5000/?name=voke&game=playstation&post=fullstack%20developer and got in the terminal:{ name: 'voke', game: 'playstation', post: 'fullstack developer' }

  res.send(`<h1>Home Page </h1><a href="/api/v1">Product Filter</a>`);
  res.end();
});


app.get("/api/v1",(req,res)=>{
    
  const sortedProducts = products; 
  //console.log(sortedProducts);

  const {search} = req.query  
  console.log(search);

  const filteredSearch = products.filter((product)=>{
    return product.name.startsWith(search)
  });

  if(filteredSearch.length <1){
   return res.send("<h1>No Match Detected </h1>")
   
  }else{
    return res.json(filteredSearch)
  }
})

app.listen(5000, "localhost", () => {
  console.log("server is listening on port 5000");
});
