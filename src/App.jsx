import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import FileInfo from "./components/FileInfo";
import Authentication from "./authentication/Authentication";
import { isLogin } from "./authService/auth";

const App = () => {
  const [isUserLogin, setIsUserLogin] = useState(isLogin());
  const [switchPage, setSwitchPage] = useState(false);
  return (
    <div>
      {!switchPage ? (
        <Home setSwitchPage={setSwitchPage} />
      ) : isUserLogin ? (
        <FileInfo />
      ) : (
        <Authentication setIsLogin={setIsUserLogin}/>
      )}
    </div>
  );
};

export default App;
