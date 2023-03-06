import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterPopup from "../components/register-popup.jsx";
import Navbar from "../components/navbar";
import FormInput from "../components/form-input";
import Footer from "../components/footer";

import useUserContext from "../context/user.context";
import { Navigate } from "react-router-dom";

// This is the Login page component that renders the login form and allows user to login to their account.
const Login = () => {
  const { login, loggedIn, sendResetPasswordLink } = useUserContext();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);

  function changeEmail(event) {
    setEmail(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    const resp = await login(email, password);

    if (resp !== "Success") {
      toast.error(resp);
    }
  }

  async function handleForgotPasswordClick() {
    if (email === "") {
      toast.error("To reset your password, first enter your email address.");
    } else {
      const resp = await sendResetPasswordLink(email);

      resp === "Success"
        ? toast.success(
            "If there is an account associated with this email, a password reset link has been sent to your email. Please wait up to 5 minutes."
          )
        : toast.error(resp);
    }
  }

  if (loggedIn) {
    return <Navigate to={{ pathname: "/profile" }} />;
  }

  function createAccountPopUp() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen flex justify-center items-center min-h-[100vh]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center bg-white rounded-xl p-10 shadow-standard gap-6 w-[550px]"
        >
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="w-full flex flex-col items-center gap-3">
            <FormInput
              placeholder="Email"
              value={email}
              onChange={changeEmail}
            />
            <FormInput
              placeholder="Password"
              value={password}
              onChange={changePassword}
              password
            />
          </div>
          <div className="flex justify-end w-full">
            <span
              className="text-blue-700 cursor-pointer"
              onClick={handleForgotPasswordClick}
            >
              Forgot password?
            </span>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 rounded-md text-white font-bold"
              type="submit"
            >
              Login
            </button>
            <span
              className="text-md text-gray-400 pointer hover:underline cursor-pointer text-center"
              onClick={createAccountPopUp}
            >
              Create a new account
            </span>
          </div>
        </form>
        {isOpen && <RegisterPopup handleClose={createAccountPopUp} />}
        <ToastContainer hideProgressBar={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
