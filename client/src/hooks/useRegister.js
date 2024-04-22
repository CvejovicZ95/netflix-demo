import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { setCookie } from "./useSetCookie";
import { registerUser } from "../api/netflixApi";

export const useRegister = () => {
  const [registration, setRegistration] = useState(false);
  const { login } = useAuthContext();

  const register = async ({
    email,
    password,
    confirmPassword,
    phoneNumber,
  }) => {
    const success = handleInputErrors({
      email,
      password,
      confirmPassword,
      phoneNumber,
    });
    if (!success) return;

    try {
      const data = await registerUser({
        email,
        password,
        confirmPassword,
        phoneNumber,
      });

      login(data);
      setCookie("token", data.token, 30);
      setRegistration(true);
    } catch (error) {
      setRegistration(false);
      toast.error(error.message);
    }
  };

  return { registration, register };
};

function handleInputErrors({ email, password, confirmPassword, phoneNumber }) {
  const errorMessage =
    !email || !password || !confirmPassword || !phoneNumber
      ? "Please fill in all fields"
      : password !== confirmPassword
        ? "Passwords do not match"
        : password.length < 6
          ? "Password must be at least 6 characters"
          : "";

  if (errorMessage) {
    showToast(errorMessage);
    return false;
  }

  return true;
}

function showToast(message) {
  toast.error(message);
}
