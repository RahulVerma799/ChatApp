import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";


const Login = () => {

  const {loading,login}=useLogin();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submitHandler = async(e)=>{
      e.preventDefault();
      try{
    await login(email,password);
      }
      catch(error){
        toast.error(error.message);
      }

  }

  return (
    <>
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className=" gap-2 items-center justify-center w-full p-6 rounded-lg shadow-md bg-gray-200">

            <h1 className="text-3xl font-semibold text-center">Login
            <span className=" text-blue-700"> Chat application</span></h1>
            <form  onSubmit={submitHandler}>
                  <div >
                    <label className="label p-2"><span className="text-base label-base">Email</span></label>
                    <input type="text" placeholder="Enter Email" className="w-full input input-bordered h-10"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>

                  <div >
                    <label className="label p-2"><span className="text-base label-base">Password</span></label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <Link to={"/Signup"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{"Don't"} have a acoount</Link>

                  <button className="btn btn-outline w-full btn-primary  mt-2  font-bold " disabled={loading}>
                    {loading ? (<span className="loading loading-spinner"></span>):("Login")} </button>
            </form>
            
        </div>
        </div>
    </>
    
  )
}

export default Login