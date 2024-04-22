import React from "react";
import { Logo } from "../logo/Logo";
import "./Help.css";

const Help = () => {
  return (
    <>
      <Logo />
      <div className="helpPage">
        <h1>Netflix Help page</h1>
        <p>If you have any problems contact us:</p>
        <h2>Netflix@gmail.com</h2>
      </div>
    </>
  );
};

export { Help };
