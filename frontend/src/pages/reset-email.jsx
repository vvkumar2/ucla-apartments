import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import useUserContext from '../context/user.context';

const ResetEmail = () => {
  const { updateEmail } = useUserContext();
  // Get the emails from the url parameters and split them
  const queryParameters = new URLSearchParams(window.location.search);
  const emails = queryParameters.get('emails').split('?');
  const oldEmail = emails[0];
  const newEmail = emails[1];

  // Update the user's email in the database to the new email
  useEffect(() => {
    async function resetEmail() {
      const resp = await updateEmail(newEmail, oldEmail);

      if (resp !== 'Success') {
        toast.error(resp);
      } else {
        toast.success('Email successfully updated!');
      }
    }

    resetEmail();
  }, [newEmail, oldEmail, updateEmail]);

  return (
    <div>
      <Navbar />
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-bold">New Email Confirmed</h1>
        <h1
          className="text-md pointer cursor-pointer text-center text-gray-400 hover:underline"
          onClick={() => {
            return <Navigate to={{ pathname: '/login' }} />;
          }}
        >
          Back to Login Page
        </h1>
      </div>
      <ToastContainer hideProgressBar={true} />
      <Footer />
    </div>
  );
};

export default ResetEmail;
