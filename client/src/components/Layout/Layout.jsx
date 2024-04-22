import React from "react";
import { Header } from "./header/Header";
import { HomePage } from "./homePage/HomePage";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Outlet />
    </div>
  );
};
