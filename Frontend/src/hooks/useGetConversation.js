import { useEffect, useState } from "react"
import toast from "react-hot-toast";


const useGetConversation = () => {
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([])

    useEffect(()=>{
        const getConversation=async()=>{
            try{
                setLoading(true)

                const response=await fetch("/api/usercon")

                const data=await response.json();

               
                if(data.error){
                    throw new Error(data.error)
                }
               


                setConversations(data);

            }catch(error){
                console.log(error);
                toast.error(error.message);

            }finally{
                setLoading(false)
            }
        }

        getConversation()},[])

  return (
   {loading,conversations}
  )
}

export default useGetConversation