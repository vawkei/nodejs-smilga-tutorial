//STREAMS:
// const fs = require ("fs");

// const readStream = fs.createReadStream("./create-big-file/large-file.js");

// readStream.on("data",(chunk)=>{
//     console.log("\n-----NEW CHUNK-----\n")
//     console.log(chunk.toString())
// });

const fs = require("fs");

const readStream = fs.createReadStream("./large-file.txt");
const writeStream = fs.createWriteStream("./large-file2.txt");


readStream.on("data",(chunk)=>{
    console.log("it's on...")
    writeStream.write("-----NEW CHUNK-----")
    writeStream.write(chunk.toString())
})