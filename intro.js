// const amount = 12;
// if(amount <10){
//     console.log("small number")
// }else{
//     console.log("biggie")
// };
// console.log("Hello world");

//Modules:
const names = require("./intro-modules/introNames");
 // out: john Wick
const {hello,greet} = require("./intro-modules/introUtils") 
    // out: [Function: hello]
console.log(names) 
    //out:{ john: 'john', MrWick: 'Wick' }
console.log(hello) 
    // out: [Function: hello]

hello("voke");
hello(names.john);
hello(names.MrWick)

greet("Good Morning","voke");
greet( "Good Afternoon",names.john);
greet( "Good Evening",names.MrWick);