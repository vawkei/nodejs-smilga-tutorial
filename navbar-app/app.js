// //http sever example:

const fs = require("fs");
const http = require("http");

const homePage = "./index.html";
const homeStyle = "./styles.css";
const homeLogo = "./logo.svg";
const homeLogic = "./browser-app.js";

const server = http.createServer((req, res) => {
  console.log("request made");

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(homePage, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        res.write(data.toString());
        console.log(data.toString());
        res.end();
      }
    });
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.readFile(homeStyle, function (error, data) {
      if (error) {
        return;
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/logo.svg") {
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    fs.readFile(homeLogo, function (error, data) {
      if (error) {
        return;
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if(req.url==="/browser-app.js"){
    res.writeHead(200,{"Content-Type":"text/javascript"});
    fs.readFile(homeLogic,function(error,data){
        if(error){
            return
        }else{
            res.write(data)
            res.end()
        }
    })
  } 
  else {
    res.end();
  }
});

server.listen(5000, "localhost", () => {
  console.log("server listening on port 5000");
});


//MAMBAMENTALITY=================================================


