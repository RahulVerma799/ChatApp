import React from 'react'
import { BiLogOut } from "react-icons/bi"
import useLogout from '../hooks/useLogout'

const LogoutButton = () => {
  const {loading,logout}=useLogout()
  return (
    <div className='mt-auto text-xl cursor-pointer'>
        <BiLogOut onClick={logout}/>
    </div>
  )
}

export default LogoutButton