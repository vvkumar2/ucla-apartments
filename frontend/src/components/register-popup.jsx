import { useState } from 'react';

import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom';
import useUserContext from '../context/user.context';

import FormInput from './form-input';

const RegisterPopup = ({ handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loggedIn, createAccount } = useUserContext();

  // function to handle the registration of a new user
  const Register = async (event) => {
    event.preventDefault();

    if (firstName === '' || lastName === '') {
      toast.error('Please enter first and last name');
    } else if (email === '') {
      toast.error('Please enter an email address');
    } else if (password !== confirmPassword) {
      toast.error('Password fields do not match');
    } else {
      const resp = await createAccount(email, password, firstName, lastName);

      if (resp !== 'Success') {
        toast.error(resp);
      }
    }
  };

  // function to handle the login of an existing user
  if (loggedIn) {
    return <Navigate to={{ pathname: '/profile' }} />;
  }

  function changeFirstName(event) {
    setFirstName(event.target.value);
  }

  function changeLastName(event) {
    setLastName(event.target.value);
  }

  function changeEmail(event) {
    setEmail(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  function changeConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-slate-300 bg-opacity-50">
      <form
        onSubmit={Register}
        className="relative flex max-h-[800px] min-h-[500px] w-[550px] flex-col gap-8 rounded-xl bg-white p-10 shadow-standard"
      >
        <div className="absolute top-4 right-5 cursor-pointer" onClick={handleClose}>
          <FontAwesomeIcon icon={faX} />
        </div>
        <h1 className="text-2xl font-bold">Create an account</h1>
        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex w-full flex-nowrap gap-3">
            <FormInput
              placeholder="First Name"
              value={firstName}
              onChange={changeFirstName}
              width="50%"
            />
            <FormInput
              placeholder="Last Name"
              value={lastName}
              onChange={changeLastName}
              width="50%"
            />
          </div>
          <FormInput placeholder="Email" value={email} onChange={changeEmail} />
          <FormInput placeholder="Password" value={password} onChange={changePassword} password />
          <FormInput
            placeholder="Confirm Password"
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
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPopup;
