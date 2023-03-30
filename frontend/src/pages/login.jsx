import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../assets/loading-spinner';
import Footer from '../components/footer';
import FormInput from '../components/form-input';
import Navbar from '../components/navbar';
import RegisterPopup from '../components/register-popup.jsx';
import useUserContext from '../context/user.context';

// This is the Login page component that renders the login form and allows user to login to their account.
const Login = () => {
  const { login, loggedIn, sendResetPasswordLink } = useUserContext();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  function changeEmail(event) {
    setEmail(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoginLoading(true);
    const resp = await login(email, password);
    setLoginLoading(false);

    if (resp !== 'Success') {
      toast.error(resp);
    }
  }

  async function handleForgotPasswordClick() {
    if (email === '') {
      toast.error('To reset your password, first enter your email address.');
    } else {
      const resp = await sendResetPasswordLink(email);

      resp === 'Success'
        ? toast.success(
            'If there is an account associated with this email, a password reset link has been sent to your email. Please wait up to 5 minutes.',
          )
        : toast.error(resp);
    }
  }

  if (loggedIn) {
    return <Navigate to={{ pathname: '/profile' }} />;
  }

  function createAccountPopUp() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar />
      <div className="flex h-screen min-h-[100vh] items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="flex w-[450px] flex-col items-center gap-6 rounded-xl bg-white p-10 shadow-standard"
        >
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="flex w-full flex-col items-center gap-3">
            <FormInput placeholder="Email" value={email} onChange={changeEmail} />
            <FormInput placeholder="Password" value={password} onChange={changePassword} password />
          </div>
          <div className="flex w-full justify-end">
            <span className="cursor-pointer text-blue-700" onClick={handleForgotPasswordClick}>
              Forgot password?
            </span>
          </div>
          <div className="flex w-full flex-col gap-3">
            <button
              className="flex h-[50px] w-full items-center justify-center gap-2 rounded-md bg-blue-700 font-bold text-white hover:bg-blue-800"
              type="submit"
            >
              Login
              {loginLoading && <LoadingSpinner color="WHITE" size="SMALL" />}
            </button>
            <span
              className="text-md pointer cursor-pointer text-center text-gray-400 hover:underline"
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
