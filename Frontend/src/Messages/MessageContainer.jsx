import React, { useEffect } from 'react'

import MessageInput from './MessageInput'
import Messages from './Messages'
import useConversation from '../zustand/useConversation'
import {TiMessages} from "react-icons/ti";

const MessageContainer = () => {

  const {selectedConversation,setSelectedConversation}=useConversation()

  useEffect(()=>{
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation])


  return (
    <div className='md:min-w-[400px] flex flex-col'>
      {!selectedConversation ? (<NochatSelected/>):( <>
    <div className='bg-slate-600 px-4 py-2 mb-2'>
      <span className='label-text text-white'>To:</span>
      <span className='text-white font-bold'>{selectedConversation?.username}</span>
    </div>

    <Messages/>
    <MessageInput/>
    </>)}
   
    </div>
  )
}

const NochatSelected=()=>{

  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg ms:text-xl text-slate-800
      font-semibold flex flex-col items-center gap-2
      '><p>Welcome </p>
      
        <p>Select a chat to start message</p>

        <TiMessages className='text-3xl'/>
       </div>
    </div>
  )
}

export default MessageContainer