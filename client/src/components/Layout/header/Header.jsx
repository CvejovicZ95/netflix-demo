import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../logo/Logo";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Link to="/login" className="signButton">
        Sign in
      </Link>
    </header>
  );
};

export { Header };
