import React, { useContext, useEffect, useState } from "react";
import Login from "./components/auth/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Home from "./components/home/Home";
import { Store } from "./context/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { isLogin } = useContext(Store);

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="*" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
