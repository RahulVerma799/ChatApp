
const mongoose=require("mongoose");

const conversationSchema=mongoose.Schema({
    participant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ]

},
{timestamps:true}
)

module.exports=mongoose.model("Conversation",conversationSchema);
