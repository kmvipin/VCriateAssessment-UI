import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function LoginSignup({
  setLoading,
  setVerificationPage,
  setPerson,
  setIsLogin,
}) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative w-full">
      <div className={`max-w-md w-full space-y-8`}>
        {isLoginPage ? (
          <LoginPage
            setIsLoginPage={setIsLoginPage}
            setOnClickMsg={setLoading}
            setIsLogin={setIsLogin}
          />
        ) : (
          <SignupPage
            setIsLoginPage={setIsLoginPage}
            setOnClickMsg={setLoading}
            setVerificationPage={setVerificationPage}
            setPerson={setPerson}
          />
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
