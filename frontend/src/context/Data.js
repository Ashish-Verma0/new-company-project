import React, { createContext, useEffect, useState } from "react";

export const Store = createContext({
  getUserData: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

const Data = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    }
  });

  const getUserData = (data) => {
    console.log(data);
    setUserData({ ...userData, data });
  };
  return (
    <Store.Provider value={{ getUserData, isLogin, setIsLogin }}>
      {props.children}
    </Store.Provider>
  );
};

export default Data;
