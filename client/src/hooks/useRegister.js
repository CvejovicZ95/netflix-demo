import {useAuthContext} from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { setCookie } from './useSetCookie';

const useRegister=()=>{

  const [registration,setRegistration]=useState(false)
  const {login}=useAuthContext()
 
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

      login(data)
      setCookie('token',data.token,30)
      setRegistration(true)
    }catch(error){
      setRegistration(false)
      toast.error(error.message)
    }
  }

  return {registration,register}
}

export {useRegister}

function handleInputErrors({ email, password, confirmPassword, phoneNumber }) {
  const errorMessage =
    (!email || !password || !confirmPassword || !phoneNumber) ? 'Please fill in all fields' :
    (password !== confirmPassword) ? 'Passwords do not match' :
    (password.length < 6) ? 'Password must be at least 6 characters' :
    '';

  if (errorMessage) {
    showToast(errorMessage);
    return false;
  }

  return true;
}

function showToast(message) {
  toast.error(message);
}



