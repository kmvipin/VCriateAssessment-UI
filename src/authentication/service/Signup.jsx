import { useState } from "react";
import { signupFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { validateEmail, getOTP } from "../../service/AuthService";
import validator from "validator";

const fields = signupFields;

export default function Signup({
  setOnClickMsg,
  setVerificationPage,
  setPerson
}) {
  const [registerPerson, setRegisterPerson] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) =>
    setRegisterPerson({ ...registerPerson, [e.target.name]: e.target.value });

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (!validateForm(registerPerson)) {
      console.log("Somthing Went Wrong !!");
      return;
    }
    setErrorMsg(null);
    handleSubmit(registerPerson);
  };

  const handleSubmit = (e) => {
    setPerson(registerPerson);
    setOnClickMsg("Verifying...");
    try {
      validateEmail(registerPerson.email).then(
        (data) => {
        setOnClickMsg(null);
          if (data.success) {
            setOnClickMsg("Sending OTP...");
            getOTP(registerPerson.email)
              .then((res) => {
                if (res.success) {
                  setVerificationPage(true);
                } else {
                  setErrorMsg(res.message);
                }
                setOnClickMsg(null);
              })
              .catch((error) => {
                console.error(error);
                setOnClickMsg(null);
              });
          } else {
            setErrorMsg(data.message);
          }
        }
      );
    } catch (error) {
      console.error(error);
      setOnClickMsg(null);
    }
  };

  const validateForm = (registerPerson) => {
    if (registerPerson.name.length < 3) {
      setErrorMsg("Username Contains At Least 3 Character");
      return false;
    }
    if (!validator.matches(registerPerson.name, /^[A-Za-z]+$/)) {
      setErrorMsg("All Characters Must be Alphabets");
      return;
    }
    if (!validator.isEmail(registerPerson.email)) {
      setErrorMsg("Fill Email Field Carefully !!");
      return false;
    }
    if (registerPerson.password.length < 3) {
      setErrorMsg("Password Length At Least 3");
      return false;
    }
    return true;
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSignUpClick}>
        {errorMsg && (
        <span className="text-red-700 text-sm block text-center">
          {errorMsg}
        </span>
      )}
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={registerPerson[field.name]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
        />
        ))}
      </div>
      <FormAction handleSubmit={handleSignUpClick} text="Signup" />
    </form>
  );
}
