import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer';
import FormInput from '../components/form-input';
import Navbar from '../components/navbar';
import useUserContext from '../context/user.context';
import LikedItems from './liked-items';
import {useRef} from "react"

// Profile page component that displays user information
const Profile = () => {
  const catMenu = useRef(null)

  const closeOpenMenus = (e) => {
    if(catMenu.current && showDropdown && !catMenu.current.contains(e.target)){
      setShowDropdown(false)
    }
  }
  document.addEventListener('mousedown',closeOpenMenus)

  const {
    firstName,
    lastName,
    email,
    memberSince,
    loggedIn,
    sendUpdateEmailLink,
    sendResetPasswordLink,
  } = useUserContext();

  const [changingEmail, setChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  function emailChangeHandler(event) {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setNewEmail(searchFieldString);
  }

  // Function that handles the reset email button
  async function onClickResetEmail() {
    if (newEmail === '') {
      toast.error('Please enter a valid email address.');
    } else {
      const resp = await sendUpdateEmailLink(newEmail);

      if (resp !== 'Success') {
        toast.error(resp);
      } else {
        toast.success(
          'Please check the new email address for a link to confirm the change. Please wait up to 5 minutes.',
        );
      }
    }
  }

  // Function that handles the reset password button
  async function onClickResetPassword() {
    setChangingEmail(false);
    if (email === '') {
      toast.error(
        'There was an error initiating password change. Please reload page and try again.',
      );
    } else {
      const resp = sendResetPasswordLink(email);

      if (resp !== 'Success') {
        toast.error(resp);
      } else {
        toast.success(
          'Please check your email for a link to reset your password. Please wait up to 5 minutes.!',
        );
      }
    }
  }

  // On page load, scroll to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="my-24 w-full px-site-standard py-4">
        <div className="mt-profile flex flex-col gap-4 rounded-xl bg-white py-4 px-6 shadow-standard">
          <div className="flex flex-row">
            <h1 className="my-auto text-2xl">
              {firstName} {lastName}
            </h1>
            {/* Make settings button */}
            <div
              className="my-auto ml-auto text-xl hover:cursor-pointer"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <FontAwesomeIcon icon={faCog} />
              {showDropdown && (
                <div ref={catMenu} className="absolute right-16 md:right-[9rem] lg:right-[13rem] top-[160px] flex flex-col rounded-xl bg-white text-sm shadow-standard">
                  <div
                    className="px-4 py-2 hover:bg-slate-100"
                    onClick={() => setChangingEmail(!changingEmail)}
                  >
                    Change Email
                  </div>
                  <div className="px-4 py-2 hover:bg-slate-100" onClick={onClickResetPassword}>
                    Change Password
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-md flex flex-col text-slate-500 lg:flex-row">
            <h2 className="my-auto">{email}</h2>
            {memberSince && <h2 className="my-auto lg:ml-auto">Member since: {memberSince}</h2>}
          </div>
        </div>
        {changingEmail && (
          <div className="items-centerbox fixed top-0 left-0 z-10 flex h-screen w-screen flex-col justify-center gap-4 bg-slate-300 bg-opacity-50">
            <div className="mx-site-standard-mobile flex flex-col gap-6 rounded-xl bg-white px-6 py-4 shadow-standard sm:mx-auto sm:px-10 sm:py-6">
              <div className="flex flex-row">
                <h2 className="text-center text-xl font-bold sm:text-2xl">Email Change</h2>
                <div
                  className="ml-auto text-xl hover:cursor-pointer"
                  onClick={() => {
                    setChangingEmail(!changingEmail);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>

              <div className="flex flex-row gap-2 pb-2 sm:gap-4">
                <FormInput type="email" placeholder="New Email" onChange={emailChangeHandler} />
                <button
                  className="h-[50px] rounded-md bg-blue-700 px-2 font-bold text-white hover:bg-blue-800 sm:px-8"
                  onClick={onClickResetEmail}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        <LikedItems />
      </div>

      <ToastContainer hideProgressBar={true} />
      <Footer />
    </div>
  );
};

export default Profile;
