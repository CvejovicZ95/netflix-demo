import React from "react";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Help } from "./components/Help/Help";
import { Movies } from "./components/Movies/Movies";
import { Upload } from "./components/Upload/Upload";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

      <Route
        path="login"
        element={authUser ? <Navigate to={"/movies"} /> : <Login />}
      />

      <Route path="register" element={<Register />} />

      <Route path="help" element={<Help />} />

      <Route
        path="movies"
        element={authUser ? <Movies /> : <Navigate to={"/login"} />}
      />

      <Route
        path="upload"
        element={authUser ? <Upload /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}

export { App };
