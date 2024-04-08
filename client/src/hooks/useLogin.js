import { toast } from 'react-toastify';
import { useAuthContext } from "../context/AuthContext"
import { setCookie } from './useSetCookie';
const useLogin=()=>{
  const {login} = useAuthContext()
  
  const loginHandler=async(email,password)=>{
    const success= handleInputErrors({email,password})
    if(!success) return

    try{
      const res = await fetch('http://localhost:4500/api/auth/login',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({email,password})
      })

      const data = await res.json();
      if (data.error) {
        throw new Error("Invalid email or password");
      }

      login(data)
      setCookie('token',data.token,30)
    }catch(error){
      toast.error(error.message)
    }
  }
  return {loginHandler}
}

export {useLogin}

function handleInputErrors({email,password}){
  if( !email || !password){
    toast.error('Please fill in all fields')
    return false
  }
  return true
}
