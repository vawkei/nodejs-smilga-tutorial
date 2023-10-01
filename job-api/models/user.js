const mongoose = require("mongoose");

const UserSchema =mongoose.Schema ({
    name:{
        type:String,
        trim:true,
        required:[true,"Please Provide a name"],
        maxlength:[20,"Name characters shouldn't be > 20"],
        minlength:[3,"Name characters shouldn't be < 3"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Please Provide an email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please Provide a valid email"],

        unique:true //this creates a unique index. incase we are trying to save a user with an email, but there is already an email in use,then it will give us the duplicate error message.
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Please insert a password"],
        minlength:[6,"password shouldn't be less than 6 characters"],
        // maxlength:[12,"password shouldn't be more than 12 characters"],
    }
});



module.exports = mongoose.model("user",UserSchema)