// const express = require("express");
// const app = express();
// const logger = require("./logger");
// const authorize = require("./authorize")

// // const logger = (req,res,next) => {
// //   const url = req.url;
// //   const method = req.method;
// //   const date = new Date().getFullYear();
// //   console.log(url);
// //   console.log(method);
// //   console.log(date);
// //   next();
// //   //so when i go to home page i get this in the terminal: /,GET,2023
// //   //and when i go to about page i get this in the terminal: /about,GET,2023
// // };

// app.use(logger)

// app.get("/", (req, res) => {
//   //    const url = req.url;
//   //    const method = req.method;
//   //    const date = new Date().getFullYear();
//   //     console.log(url)
//   //     console.log(method)
//   //     console.log(date)

//   res.send("<h1>Home Page </h1>");
// });
// app.get("/about",logger, (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

// app.listen(5000, "localhost", () => {
//   console.log("server listening on port 5000");
// });

//EXECUTING MULTIPLE MIDDLEWARES===========================================
const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");

app.use([logger, authorize]);

app.get("/", (req, res) => {
  const name = req.query;
  res.send("<h1>Home Page </h1>");
  console.log(name);
});
app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.listen(5000, "localhost", () => {
  console.log("server listening on port 5000");
});
