const { profile, timeStamp } = require("console");
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    profilepic:{
        type:String,
        default:"",
    },


},
{timestamps:true}

)

module.exports=mongoose.model("user",userSchema);

