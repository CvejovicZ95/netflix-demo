import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { setCookie } from "./useSetCookie";
import "react-toastify/dist/ReactToastify.css";
import { homePageLogin } from "../api/netflixApi";

export const useHomePageLogin = () => {
  const { login } = useAuthContext();
  const [loginError, setLoginError] = useState(false);

  const loginHandler = async (email) => {
    const success = handleInputErrors({ email });
    if (!success) return;

    try {
      const data = await homePageLogin(email);

      login(data);
      setCookie("token", data.token, 30);
    } catch (error) {
      setLoginError(true);
      toast.error(error.message);
    }
  };
  return { loginHandler, loginError };
};

function handleInputErrors({ email }) {
  return !email ? (toast.error("Please fill in field"), false) : true;
}
