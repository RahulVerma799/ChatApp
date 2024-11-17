const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },

    receiveId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    message:{
        type:String,
        required:true,
       
    },

},
{timestamps:true}
)

module.exports=mongoose.model("Message",messageSchema);
