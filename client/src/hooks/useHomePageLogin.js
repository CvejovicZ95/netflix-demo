import { useState } from "react";
import { toast } from 'react-toastify';
import { useAuthContext } from "../context/AuthContext"
import { setCookie } from "./useSetCookie";
import 'react-toastify/dist/ReactToastify.css';

const useHomePageLogin=()=>{
  const {login} = useAuthContext()
  const [loginError, setLoginError] = useState(false);

  const loginHandler=async(email)=>{
    const success= handleInputErrors({email})
    if(!success) return

    try{
      const res = await fetch('http://localhost:4500',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({email})
      })

      const data=await res.json()
      if(data.error){
        throw new Error(data.error)
      }

      login(data);
      setCookie('token',data.token,30)
    }catch(error){
      setLoginError(true)
      toast.error(error.message)
    }
  }
  return {loginHandler,loginError}
}

export {useHomePageLogin}

function handleInputErrors({email}){
  if(!email){
    toast.error('Please fill in all fields')
    return false
  }
  return true
}

