import { useAuthContext } from "../context/AuthContext.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser } from "../api/netflixApi.js";

const useLogout=()=>{
  const {logout}=useAuthContext()

  const logoutHandler=async()=>{
    try{  
      await logoutUser();
      logout();
    }catch(error){
      toast.error(error.message)
  }
}
  return {logoutHandler}
}

export {useLogout}