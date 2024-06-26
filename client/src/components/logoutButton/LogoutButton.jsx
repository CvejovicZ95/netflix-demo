import React from "react";
import { useLogout } from "../../hooks/useLogout";
import "./LogoutButton.css";

export const Logout = () => {
  const { logoutHandler } = useLogout();
  return (
    <div className="logout-div">
      <button onClick={logoutHandler} className="logout-button">
        Logout
      </button>
    </div>
  );
};
