import { FaSearch } from "react-icons/fa";
import useConversation from "../zustand/useConversation";
import useGetConversation from "../hooks/useGetConversation";
import { useState } from "react";

const Searchinput = () => {

  const [search,setSearch]=useState("")
  const {setSelectedConversation}=useConversation()
  const {conversations}=useGetConversation()

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(!search){
      return
    }

   const conversation = conversations.find((conversation)=>
      conversation.username.toLowerCase().includes(search.toLowerCase())

    )

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }
    else{
      toast.error("No User with this username")
    }

  }


  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search.... 
        " className="input input-bordered rounded-full"
        onChange={(e)=>setSearch(e.target.value)}
        />

        <button type="submit" className="btn btn-circle bg-sky-700 text-black">{<FaSearch/> }</button>

    </form>
  )
}

export default Searchinput