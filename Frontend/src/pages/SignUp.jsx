import { Link } from "react-router-dom"
import Gendercheckbox from "../component/Gendercheckbox"
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    confrimPassword:"",
    gender:"",
  });
  const {loading,signup}=useSignup()

  function handlecheckbox(gender){
    setFormData({...formData,gender})

  };

  const Handlesubmit= async(e)=>{
      e.preventDefault()

      await signup(formData)
  }

  return (
    <>
    
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className=" gap-2 items-center justify-center w-full p-6 rounded-lg shadow-md bg-gray-200">

            <h1 className="text-3xl font-semibold text-center">Signup
            <span className=" text-blue-700"> Chat application</span></h1>
            <form onSubmit={Handlesubmit}>
            <div >
                    <label className="label p-2"><span className="text-base label-base">UserName</span></label>
                    <input type="text" placeholder="Enter UswerName" className="w-full input input-primary input-bordered  h-10"
                    value={formData.username}
                    onChange={(e)=>setFormData({...formData,username:e.target.value})}
                    />
                  </div>

                  <div >
                    <label className="label p-2"><span className="text-base label-base">Email</span></label>
                    <input type="text" placeholder="Enter Email" className="w-full input input-primary input-bordered h-10"
                    value={formData.email}
                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                    />
                  </div>

                  <div >
                    <label className="label p-2"><span className="text-base label-base">Password</span></label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-primary input-bordered h-10"
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                    />
                  </div>

                  <div >
                    <label className="label p-2"><span className="text-base label-base">confrimPassword</span></label>
                    <input type="Password" placeholder="Enter confrimPassword" className="w-full input input-primary input-bordered h-10"
                    value={formData.confrimPassword}
                    onChange={(e)=>setFormData({...formData,confrimPassword:e.target.value})}
                    />
                  </div>
                  <Gendercheckbox  onCheckboxChange={handlecheckbox} selectedGender={formData.gender}/>
                  <Link to={"/Login"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{"If"} you have a acoount</Link>

                  <button className="btn btn-outline w-full btn-secondary  mt-2  font-bold ">Signup</button>
            </form>
            
        </div>
        </div>
    </>

    
  )
}

export default SignUp