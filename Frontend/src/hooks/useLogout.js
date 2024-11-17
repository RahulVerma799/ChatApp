import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();

    const logout= async()=>{
        try{
        setLoading(true)

        const response=await fetch("https://chatapp-334f.onrender.com/api/Logout",{
            method:"GET",
            headers: {"Content-Type":"application/json"}
        })

        const data=await response.json()

        if(data.error){
            throw new Error(data.error)
        }
        localStorage.removeItem("user")
        setAuthUser(null)

    }

catch(error){
    toast.error(error.message);
}finally{
    setLoading(false);
}
    }
  return (
   {loading,logout}
  )
}

export default useLogout
