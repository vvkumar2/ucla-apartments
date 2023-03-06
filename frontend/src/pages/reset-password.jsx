import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";
import useUserContext from "../context/user.context";

import FormInput from "../components/form-input";

const ResetPassword = () => {
  const { resetPassword } = useUserContext();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  function changeConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  async function ResetHandler(event) {
    event.preventDefault();

    if (confirmPassword !== password) {
      toast.error("Passwords do not match!");
    } else {
      const resp = await resetPassword(password);

      if (resp === "Success") {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error(resp);
      }
    }
  }

  return (
    <div className="reset-section">
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={ResetHandler}
          className="flex flex-col items-center bg-white rounded-xl p-10 shadow-standard gap-6 w-[550px]"
        >
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <div className="w-full flex flex-col items-center gap-3">
            <FormInput
              placeholder="New Password"
              value={password}
              onChange={changePassword}
              password
            />
            <FormInput
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
              password
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              className="w-full h-[50px] bg-blue-700 hover:bg-blue-800 rounded-md text-white font-bold"
              type="submit"
            >
              Reset
            </button>
            <h1 className="text-md text-gray-400 pointer hover:underline cursor-pointer text-center">
              <Link to="/login">Back to Login Page</Link>
            </h1>
          </div>
        </form>
      </div>
      <ToastContainer hideProgressBar={true} />
      <Footer />
    </div>
  );
};

export default ResetPassword;
