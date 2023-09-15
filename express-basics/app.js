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


//4================WORKIN WITH PARAMS & QUERY EXAMPLE=============================//

const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");
const products = require("./routes/products");
const query = require("./routes/query")

app.use("/api/products",products);
app.use("/api/v1/query",query)
//5A===========WORKIN WITH PARAMS TO GET A SINGLE PRODUCT EXAMPLE===================//

//5B========== A complex query parameter scenerio:
app.get("/api/products/:productID/reviews/:reveiwID", (req, res) => {
  res.send("<h1>HowZ</h1>");
  //this was what i typed:http://localhost:5000/api/products/3/reviews/1
  //then HowZ showed in the browser
});

// app.listen(5000, "localhost", () => {
//   console.log("Server listening on port 5000");
// });

//6===========WORKING WITH QUERY STRING EXAMPLE===================//

//7===========HOW TO USE GET METHOD===================//

//8===========HOW TO USE POST METHOD [FORMMETHOD]===================//

//static assets:
app.use(express.static("../methods-public"));

//parse form data; in order to get the form data,the body and enable us to access what we posted to "/login":
app.use(express.urlencoded({ extended: false }));
app.use("/login",auth)

// app.listen(5000, "localhost", () => {
//   console.log("Server listening on port 5000");
// });

//8B===========HOW TO USE POST METHOD [JAVASCRIPTMETHOD]===================//

//parse json:
app.use(express.json());
app.use("/api/people",people)
//8===========HOW TO USE PUT METHOD [WORKIN WITH POSTMAN]===================//



// app.listen(5000, "localhost", () => {
//   console.log("Server listening on port 5000");
// });

//9===========HOW TO USE DELETE METHOD [WORKIN WITH POSTMAN]===================//


app.listen(5000, "localhost", () => {
  console.log("Server listening on port 5000");
});
