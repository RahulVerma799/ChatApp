import { useAuthContext } from "../context/AuthContext"
import toast  from "react-hot-toast";
import { useState } from "react";

const HandleError=({username,email,password,confrimPassword,gender})=>{
    if( !username ||!email || !password || !confrimPassword|| !gender)
    {
        toast.error("please fill all the details")
     return true;
    }
    if(password !==confrimPassword){
        toast.error("passsword not matched");
        return true;
    }
    return false;
}

const useSignup = () => {

    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext();

    const signup=async({username,email,password,confrimPassword,gender})=>{
        const checkerror=HandleError ({
            username,
            email,
            password,
            confrimPassword,
            gender,

        })
        if(checkerror){
            return
        }

        try{
                setLoading(true)

                const response= await fetch("https://chatapp-my8l.onrender.com/api/signup",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        username,email,password,confrimPassword,gender
                    }),
                })

                const data=await response.json()
                if(data.error){
                    throw new Error(data.error)
                }

                //console.log(data)
                localStorage.setItem("user",JSON.stringify(data))
                setAuthUser(data)

        }catch(error){
            console.log(error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return ({
        loading,signup
    })
  
}

export default useSignup 