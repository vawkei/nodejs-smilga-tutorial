const fs = require("fs");

// //read file using readFileSync:this is synchronous,it blocks the execution of other codes until it's finished running
// const readfileSync = fs.readFileSync("./contents/first.txt","utf8");
// console.log(readfileSync);

// //read file using readFile:
// //this function is asynchronous, it doesnt block other codes when readin the file
// fs.readFile("./contents/first.txt",function(error,data){
//     if(error){
//         console.log(error)
//     }
//         //console.log(data)//this returns a buffer;
//         console.log(data.toString())

// });

// //write file using writeFileSync:
// const data1 ="Node is lookin interesting"

// const writeFileSync =fs.writeFileSync("./contents/second.txt", data1)
// console.log("file written");

// //write file using writeFile:
// const data2 = "All I want is to be Damn good at this Sh!t. Nuttin more."
// fs.writeFile("./contents/second.txt",data2,function(){
//     console.log("file written2")
// })

//merge the content in the two txt files in one file:
fs.readFile("./contents/first.txt", (error, data) => {
  if (error) {
    console.log(error);
  }
  const result = data.toString();
  console.log(result);
  fs.readFile("./contents/second.txt", (error, data) => {
    if (error) {
      console.log(error);
    }
    const result2 = data.toString();
    console.log(result2);
    const mergedText = `${result} \n${result2}`;
    if (!fs.existsSync("./contents/textsMerged.txt")) {
      fs.writeFile("./contents/textsMerged.txt", mergedText, () => {
        console.log("file is written");
      });
    } else {
      return;
    }
  });
});

//Another way:
//const fs = require("fs");
const util = require("util");

const readfilePromise = util.promisify(fs.readFile);
const writefilePromise = util.promisify(fs.writeFile);

const start =async ()=>{
    try{
        const first  =await readfilePromise("./contents/first.txt");
        const second =await readfilePromise("./contents/second.txt");
        
        console.log(first.toString(), second.toString());
        await writefilePromise("./contents/textsMerged2.txt",`${first} \n${second}`)
        console.log("file written")
    }catch(error){
        console.log(error)
    }
};
start()
