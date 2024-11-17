
const Conversation= require ("../model/conversationModel");
const Message= require ("../model/messageModel");
const {getReceiverSocketId,io} =require('../socket/socket');

exports.sendMessage=async(req,res,next)=>{
    try{
        
        const {message}= req.body;

        const {id:receiveId}=req.params
        const senderId=req.user.id;

        let conversation=await Conversation.findOne({
            participant :{$all:[senderId,receiveId]},

        })

        if(!conversation){
            conversation= await Conversation.create({
                participant:[senderId,receiveId]
            })
        }

        const newMessage= await new Message({
            senderId,
            receiveId,
            message,
        });

        if(newMessage){
            conversation.message.push(newMessage._id)
        }

        await Promise.all([conversation.save(),newMessage.save()])

        //socket io functonality
        const receiverSocketId=getReceiverSocketId(receiveId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }


        res.status(201).json(newMessage)
        
        /*
        const { message } = req.body
        const { id: receiveId } = req.params
        const senderId = req.user.id
    
        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiveId] },
        })
    
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, receiveId],
          })
        }
    
        const newMessage = new Message({
          senderId,
          receiveId,
          message,
        })
    
        if (newMessage) {
          conversation.message.push(newMessage._id)
        }
    
        await Promise.all([conversation.save(), newMessage.save()])
    
        // socket io functionality
        // const receiverSocketId = getReceiverSocketId(receiveId)
    
        // if (receiverSocketId) {
        //   io.to(receiverSocketId).emit("newMessage", newMessage)
        // }
    
        res.status(201).json(newMessage)
        */
    }
    catch(error){
        next(error);
        return res.status(500).json({
            success:false,
            message:"therr is error on sending msg problem"+error,
        })
    }
}

exports.getMessage =async(req,res,next)=>{
    try{
        const {id: usertoMessage}=req.params;
        const senderId=req.user.id

        const conversation= await Conversation.findOne({
            participant:{$all:[senderId,usertoMessage]}
        }).populate("message")

        if(!conversation){
            return res.status(200).json([])
        }

        const messages=conversation.message;

        res.status(200).json(messages)


    }
    catch(error){
        next(error)
    }
}