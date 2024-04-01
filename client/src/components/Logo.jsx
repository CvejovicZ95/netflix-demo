import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'

const Logo = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="logoContainer">
      {authUser ? (
        <Link to="/movies" className="logoLink">
          <img className="logoImg" src="logo.png" alt="logo" />
        </Link>
      ) : (
        <Link to="/" className="logoLink">
          <img className="logoImg" src="logo.png" alt="logo" />
        </Link>
      )}
    </div>
  );
};

export default Logo;
