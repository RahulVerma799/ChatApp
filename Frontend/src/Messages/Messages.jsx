import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetConversation from '../hooks/useGetConversation'
import useGetMessages from '../hooks/useGetMessages'
import useListenMessage from '../hooks/useListenMessage'
//import useGetMessage from '../hooks/useGetMessage'

const Messages = () => {
  
  const {messages,loading}=useGetMessages()

  useListenMessage()

  const lastMessageRef=useRef()

 

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
    })
  },[messages])
  
  console.log(messages)
  
  return (
    <div className='px-4 flex-1 overflow-auto '>
     {!loading && messages.length===0 &&(
      <p className='text center'>Start conversation by sending message </p>
     )}
     {!loading && messages.length >0 && messages.map((message)=>(
      <div key={message._id} ref={lastMessageRef}>
        <Message message={message}/>
        </div>
     ))}
     
    
    </div>
  )
}

export default Messages