//Example 1:
const fs = require ("fs");

console.log("Started first task")

fs.readFile("./built-in-modules/contents/first.txt",function(error,data){
    if(error){
        console.log(error)
    }else{
        console.log(data.toString())
        console.log("completed first task")
    };
})
console.log("Started next task");
//out: 
//[nodemon] starting `node app.js`
// Started first task
// Started next task
// Hello World! This is the First text file
// completed first task
// [nodemon] clean exit - waiting for changes before restart.
//The reason for our response being ordered that way is because it is asynchronous in nature, readFile.


//Example 2
console.log("first");

setTimeout(()=>{
    console.log("second")
},0);

console.log("third")
//out:
//[nodemon] starting `node app.js`
//first
//third
//second
//[nodemon] clean exit - waiting for changes before restart.
//setTimeout is asynchronous, so it gets offloaded from the line and run later