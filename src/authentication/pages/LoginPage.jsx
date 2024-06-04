import React from "react";
import Header from "../service/Header";
import Login from "../service/Login";

const LoginPage = ({ setIsLoginPage, setOnClickMsg, setIsLogin }) => {
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
        setIsLoginPage={setIsLoginPage}
      />
      <Login setOnClickMsg={setOnClickMsg} setIsLogin={setIsLogin} />
    </>
  );
};

export default LoginPage;
