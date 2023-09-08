//function 1:
const hello =(name)=>{
    console.log(`hello ${name}`)
};
console.log(hello)
//out: [Function: hello]

//function 2:
const greet =(greet,name)=>{
    console.log(greet,name)
};

module.exports = {hello,greet}