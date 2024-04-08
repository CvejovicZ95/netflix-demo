import { toast } from 'react-toastify';
import { useAuthContext } from "../context/AuthContext"

const useLogin=()=>{
  const {setAuthUser} = useAuthContext()
  
  const login=async(email,password)=>{
    const success= handleInputErrors({email,password})
    if(!success) return

    try{
      const res = await fetch('http://localhost:4500/api/auth/login',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({email,password})
      })

      const data=await res.json()
      if(data.error){
        if (data.error === "Invalid email or password") {
          throw new Error("Wrong email or password");
        }else{
          throw new Error(data.error)
        }
      }

      localStorage.setItem('netflix-user',JSON.stringify(data))
      setAuthUser(data)
    }catch(error){
      toast.error(error.message)
    }
  }
  return {login}
}

export {useLogin}

function handleInputErrors({email,password}){
  if( !email || !password){
    toast.error('Please fill in all fields')
    return false
  }
  return true
}