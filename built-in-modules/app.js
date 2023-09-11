// const fs = require("fs");

// fs.readFile("./contents/first.txt",function(error,data){
//     if(error){
//         return
//     }else{
//         const result = data.toString()
//         console.log(result);

//         fs.readFile("./contents/second.txt",(error,data)=>{
//             if(error){
//                 return
//             }else{
//                 const result2 = data.toString()
//                 console.log(result2)
//                 const mergedText = `${result}\n${result2}`;
//                 fs.writeFile("./contents/textsMerged3.txt",mergedText,function(){
//                     console.log("file written")
//                 })
//             }


//         })
//     }
// });

//ANOTHER WAY TO DO THIS:
const fs = require("fs");
const util = require("util");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const get = async ()=>{
    try{
        const first =await readFilePromise('./contents/first.txt',"utf-8");
        const second =await  readFilePromise("./contents/second.txt","utf-8");
        console.log(first, second);

        const text = `${first} \n${second}`

        await writeFilePromise("./contents/textsMerged3.txt",text)
    }
    catch(error){
        console.log(error)
    }
};

get()