import React from 'react'
import userIcon from "../assets/user.svg";
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const Convers = ({conversation,lastIndex}) => {
  const {selectedConversation,setSelectedConversation}=useConversation()

  const isSelected=selectedConversation?._id===conversation._id

  const {onlineUser}=useSocketContext()

  const isOnline= onlineUser.includes(conversation._id)

  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer 
          ${isSelected ? "bg-sky-500" : ""} `}
          onClick={()=>setSelectedConversation(conversation)}
          >
        <div className={`avatar ${isOnline ? "online":""} `}>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilepic} alt="images"/>
                </div> 

        </div>

        <div className='flex flex-col '>
            <div className='flex gap-3 justify-between'>
                <p className='text-xl font-semibold'>{conversation.username}</p>
            </div>
        </div>
    </div>

    <div className='divider my-0 py-0 h-1'></div>

    </>
  )
}

export default Convers