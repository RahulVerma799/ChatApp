import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'

import { Toaster} from 'react-hot-toast'

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from './pages/Signup';
import { useAuthContext } from './context/AuthContext';




const App = () => {

  const {authUser}=useAuthContext()

  return (
   <>
   <div className=' p-4 h-screen flex items-center justify-center '>
   <Routes>
    <Route path="/"  element={authUser ?  <Home/> : <Navigate to={"/Login"}/>}/>
    <Route path="/Login" element={authUser ? <Navigate to ={"/"}/>: <Login/>}/>
    <Route path="/Signup" element= {authUser ? <Navigate to={"/"}/>: <SignUp/>}/>
   </Routes>
   
   </div>
   </>
  )
}

export default App