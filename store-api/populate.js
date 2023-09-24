require("dotenv").config();
const connectDB = require('./db/connect');
const Product = require("./models/products");
const jsonProducts = require("./product.json");


const start =async ()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany();
    await Product.create(jsonProducts)

    console.log("sent to Mongo Atlas Successful")
    process.exit(0);
    //go to the terminal, make sure you are in the root directory of your project: C:\Users\voke sokoh\Documents\visual_testing\john-smilga-nodejs-tuts\store-api>, and type node populate. This automatically creates A database for us in mongo Atlas,STORE-API. and console logs sent to Mongo Atlas Successful.process.exit(0) means everything went well.And it exits the process.
  }
  catch(error){
    console.log(error)
    process.exit(1); //signifies everything didnt go well
  }
    
};

start();