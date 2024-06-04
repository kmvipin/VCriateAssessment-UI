import React from "react";
import Header from "../service/Header";
import Signup from "../service/Signup";

const SignupPage = ({
  setOnClickMsg,
  setVerificationPage,
  setPerson,
  setIsLoginPage
}) => {
  return (
    <>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
        setIsLoginPage={setIsLoginPage}
      />
      <Signup
        setOnClickMsg={setOnClickMsg}
        setVerificationPage={setVerificationPage}
        setPerson={setPerson}
      />
    </>
  );
};

export default SignupPage;
