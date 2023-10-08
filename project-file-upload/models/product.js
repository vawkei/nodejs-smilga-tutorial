const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please provide name"],
        maxlength:[20,"Name shouldn't be > 10"]
    },
    price:{
        type:Number,
        trim:true,
        required:[true,"Please provide a number"]
    },
    image:{
        type:String,
        required:[true,"Please provide a link"]
    }
});

module.exports = mongoose.model("product",ProductSchema)