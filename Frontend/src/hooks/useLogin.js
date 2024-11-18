import  { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const BASE_URL = 'https://chatapp-334f.onrender.com';

const handleInputError=(email,password)=>{
    if(!email||!password){
        toast.error("please all field are rquired")
        return true;
    }
    return false;
}

const useLogin = () => {
    const [loading,setLoading]=useState(false);

    const { setAuthUser}=useAuthContext();

    const login=async(email,password)=>{
        const checkError=handleInputError(
            email,password
        )
        if(checkError){
            return 
        }

        try{
            setLoading(true);

            const response= await fetch(`${BASE_URL}/api/login`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: "include",
                body:JSON.stringify({
                    email,password
                }),
            })

            const data=await response.json()

            // if (!response.ok) {
            //     // Handle errors based on status code
            //     const errorMessage = data.message || "Login failed";
            //     throw new Error(errorMessage);
            // }

            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("user",JSON.stringify(data))
            setAuthUser(data)
            toast.success("Login successful!");
            // Indicate that login was successful

        
        }
        catch(error){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }


  return (
   {loading,login}
  )
}

export default useLogin