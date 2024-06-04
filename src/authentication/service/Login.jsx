import { useState } from "react";
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { userLogin } from "../../service/AuthService";
import { saveUser } from "../../authService/auth";

const fields = loginFields;

export default function Login({ setOnClickMsg, setIsLogin }) {
  const [loginPerson, setLoginPerson] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const handleChange = (e) => {
    setLoginPerson({ ...loginPerson, [e.target.name]: e.target.value });
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    if (loginPerson.email.length < 4) {
      setErrorMsg("UserName Or Email At Least 4 Character");
      return;
    }
    if (loginPerson.password.length < 4) {
      setErrorMsg("Password Have At Least 5 Letters");
      return;
    }
    setErrorMsg(null);
    handleSubmit(loginPerson);
  };

  const handleSubmit = (person) => {
    setOnClickMsg("Authenticating...");
    try {
      userLogin(person)
        .then((data) => {
          if (data.success) {
            saveUser(data);
            alert("Login Succesfully !!");
            setIsLogin(true);
          } else {
            setErrorMsg(data.message);
          }
          setOnClickMsg(null);
        })
        .catch((err) => {
          if (err.response.data) {
            setErrorMsg(err.response.data.message);
          } else {
            alert("Something Went Wrong");
          }
          setOnClickMsg(null);
        });
    } catch (error) {
        alert("Something Went Wrong !!");
        setOnClickMsg(null);
      console.error(error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSignInClick}>
      {errorMsg && (
        <span className="text-red-700 text-sm block text-center">
          {errorMsg}
        </span>
      )}
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginPerson[field.name]}
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

      <FormExtra />
      <FormAction handleSubmit={handleSignInClick} text="Login" />
    </form>
  );
}
