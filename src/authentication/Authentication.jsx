import React, { useState } from "react";
import LoginSignup from "./LoginSignup";
import OTPForm from "./OTPForm";
import { savePerson } from "../service/AuthService";
import Loading from "../Loading";

const Authentication = ({setIsLogin}) => {
  const [verificationPage, setVerificationPage] = useState(false);
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSaveUser = (OTP) => {
    setLoading("Verifying...");
    if (person != null) {
      try {
        savePerson(person, OTP)
          .then((res) => {
            if (res.success) {
              setVerificationPage(false);
              alert("SignUp Successfully");
            } else {
              alert("Wrong OTP");
            }
            setLoading(null);
          })
          .catch((err) => {
            alert("Something Went Wrong");
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Something went wrong");
    }
  };

  return (
      <div className="relative h-screen">
        {loading && <Loading content={loading} />}
        <div style={{filter:(loading ? "blur(0.8px)" : "none")}} className="h-full">
            <div className="w-full flex h-full">
              <div className=" p-3 w-full flex self-center justify-center h-full">
                {!verificationPage ? (
                  <LoginSignup
                    setVerificationPage={setVerificationPage}
                    setPerson={setPerson}
                    setLoading={setLoading}
                    setIsLogin={setIsLogin}
                  />
                ) : (
                  <OTPForm handleVerify={handleSaveUser} />
                )}
              </div>
            </div>
        </div>
      </div>
  );
};

export default Authentication;
