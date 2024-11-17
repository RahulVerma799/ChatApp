import React from 'react'
import useGetConversation from '../hooks/useGetConversation'

import Convers from './Convers'

const Conversation = () => {
  const {loading,conversations}= useGetConversation()
  console.log(conversations)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
       
       {conversations.map((conversation,index)=>(
        <Convers key={conversation._id} conversation={conversation} lastIndex={index===conversation.length-1}/>
       ))}

       {loading ? <span className='loading loading-spinner'></span>: null}
    </div>
  )
}

export default Conversation