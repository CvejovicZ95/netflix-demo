import { toast } from 'react-toastify';
import { useAuthContext } from "../context/AuthContext.jsx"
import { setCookie } from './useSetCookie.js';
import { loginUser } from '../api/netflixApi.js';

const useLogin=()=>{
  const {login} = useAuthContext()
  
  const loginHandler=async(email,password)=>{
    const success= handleInputErrors({email,password})
    if(!success) return

    try{
      const data = await loginUser(email, password);

      login(data)
      setCookie('token',data.token,30)
    }catch(error){
      toast.error(error.message)
    }
  }
  return {loginHandler}
}

export {useLogin}

function handleInputErrors({ email, password }) {
  return (!email || !password) ? (toast.error('Please fill in all fields'), false) : true;
}
