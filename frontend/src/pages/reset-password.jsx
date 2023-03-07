import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import useUserContext from '../context/user.context';

import FormInput from '../components/form-input';

const ResetPassword = () => {
  const { resetPassword } = useUserContext();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  function changeConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  async function ResetHandler(event) {
    event.preventDefault();

    if (confirmPassword !== password) {
      toast.error('Passwords do not match!');
    } else {
      const resp = await resetPassword(password);

      if (resp === 'Success') {
        toast.success('Password reset successful!');
        navigate('/login');
      } else {
        toast.error(resp);
      }
    }
  }

  return (
    <div className="reset-section">
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={ResetHandler}
          className="flex w-[550px] flex-col items-center gap-6 rounded-xl bg-white p-10 shadow-standard"
        >
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <div className="flex w-full flex-col items-center gap-3">
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
          <div className="flex w-full flex-col gap-3">
            <button
              className="h-[50px] w-full rounded-md bg-blue-700 font-bold text-white hover:bg-blue-800"
              type="submit"
            >
              Reset
            </button>
            <h1 className="text-md pointer cursor-pointer text-center text-gray-400 hover:underline">
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
