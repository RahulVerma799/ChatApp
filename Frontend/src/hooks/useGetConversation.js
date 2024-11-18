import { useEffect, useState } from "react"
import toast from "react-hot-toast";


const useGetConversation = () => {
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([])
    const BASE_URL = 'https://chatapp-334f.onrender.com';

    useEffect(()=>{
        const getConversation=async()=>{
            try{
                setLoading(true)

                const response = await fetch(`${BASE_URL}/api/usercon`, {
                    method: 'GET',
                    credentials: 'include', // This ensures the cookie (JWT token) is sent with the request
                });

               


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