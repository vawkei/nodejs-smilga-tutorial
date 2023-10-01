
const mongoose =require("mongoose");

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        trim:true,
        required:[true,"Please provide a company name"],
        maxlength:[20,"Company name shouldn't be > 20 characters"],
    },
    position:{
        type:String,
        trim:true,
        required:[true,"Please provide a position"],
        maxlength:[20,"Position name shouldn't be > 20 characters"]
    },
    status:{
        type:String,
        enum:["interview","declined","pending"],
        default:"pending"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"user",
        required:[true,"Please provide user"]
    },
},{timestamps:true});

module.exports = mongoose.model("jobs",jobSchema)