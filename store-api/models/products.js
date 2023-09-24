const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name:{
    trim:true,
    type:String,
    required:[true,"product name must be provided"],
    maxlength:[20,"should not exceed 40 chartacters"]
  },
  price:{
    trim:true,
    type:Number,
    required:[true,"product price must be provided"],
    maxlength:[20,"should not exceed 40 chartacters"]
},
featured:{
    type:Boolean,
    default:false
},
rating:{
    type:Number,
    default:4.5
},
createdAt:{
    type:Date,
    default:Date.now()// this gives us the present time.
},
  company:{
    type:String,
    enum:{
        values:["ikea","liddy","caressa","marcos"],
        message:"{VALUE} is not supported"
    }
    //enum:["ikea","liddy","caressa","marcos"] // enum is a data type that allows us to define a set of named constants. making it easier to work witha predefined list of values.
  },
   
});

module.exports = mongoose.model("products",productsSchema)