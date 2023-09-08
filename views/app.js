//Sending A Html Page To The Browser:

// const fs = require('fs');
// const http = require("http");

// const server = http.createServer((req,res)=>{
//     console.log("request made");

//     res.writeHead(200,{"Content-Type","text/html"});

//     fs.readFile("./views/index.html",function(error,data){
//         if(error){
//             return
//         }else{
//             console.log(data.toString())
//             res.write(data)
//             res.end()
//         }
//     })    
    
// });

// server.listen(5000,"localhost",()=>{
//     console.log("server listening on port 5000")
// });

const fs = require("fs");
const http = require("http");

const server = http.createServer((req,res)=>{
    console.log("request made");

    res.setHeader("Content-Type","text/html");
    // res.writeHead(200,{"Content-Type","text/html"});

    let path = "./";
    // let url = req.url;
    if(req.url==="/"){
        path+= "index.html"
        res.statusCode = 200
    }else if(req.url==="/about"){
        path += "about.html"
        res.statusCode = 200
    }else if(req.url ==="/about-me"){
        res.setHeader("Content-Type","text/html")
        path += "about.html"
        res.statusCode = 301
    }
    else{
        path +="404.html"
        res.statusCode = 404
    };

    fs.readFile(path,function(error,data){
        if(error){
            return
        }else{
            res.write(data)
            res.end()
        }
    })

});

server.listen(5000,"localhost",()=>{
    console.log("server listening on port 5000")
})