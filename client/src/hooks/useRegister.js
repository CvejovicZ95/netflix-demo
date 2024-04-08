import {useAuthContext} from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const useRegister=()=>{

  const [registration,setRegistration]=useState(false)
  const {setAuthUser}=useAuthContext()
 
  const register=async({email,password,confirmPassword,phoneNumber})=>{
    const success = handleInputErrors({email,password,confirmPassword,phoneNumber})
    if(!success) return;

    try{
      const res=await fetch('http://localhost:4500/api/auth/register',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({email,password,confirmPassword,phoneNumber})
      })

      const data=await res.json()
      if(data.error){
        throw new Error(data.error)
      }

      localStorage.setItem('netflix-user',JSON.stringify(data))

      setAuthUser(data)
      setRegistration(true)
    }catch(error){
      setRegistration(false)
      toast.error(error.message)
    }
  }

  return {registration,register}
}

export {useRegister}

function handleInputErrors({email,password,confirmPassword,phoneNumber}){
  if(!email || !password || !confirmPassword || !phoneNumber){
    toast.error('Please fill in all fields')
    return false
  }
  if(password !==confirmPassword){
    toast.error('Passwords do not match')
    return false
  }
  if(password.length < 6){
    toast.error('Password must be at least 6 characters')
    return false
  }
  return true
}

