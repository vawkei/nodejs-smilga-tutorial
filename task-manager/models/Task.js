const mongoose = require ("mongoose");

// const taskSchema = new mongoose.Schema({
//     name:String,
//     completed:Boolean
// });

//or if you want to check for validation:

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide a message"],
        trim:true, // trim auto corrects the value for us when we submit.
        maxlength:[20,"cannot be more than 20 characters"]
    },
    completed:{
        type:Boolean
    }
})
//what the schema does is give our data structure. Name and completed property being set to string and boolean.

module.exports = mongoose.model("Task",taskSchema)