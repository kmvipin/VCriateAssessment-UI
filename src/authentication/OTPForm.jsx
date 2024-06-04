import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";

const OTPForm = ({ handleVerify }) => {
  const [OTP, setOTP] = useState("");
  return (
    <div className="flex flex-col justify-center gap-4 max-w-md">
      <h3 className="self-center text-black font-bold">Verify Your Email</h3>
      <span className="self-center">Enter OTP sent to your Email</span>
      <MuiOtpInput
        length={5}
        value={OTP}
        onChange={(val) => {
          setOTP(val);
        }}
        onComplete={(val) => {
          handleVerify(val);
        }}
      />
    </div>
  );
};

export default OTPForm;
