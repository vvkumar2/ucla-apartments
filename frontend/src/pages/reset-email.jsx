import React, { useEffect } from "react";
import useUserContext from "../context/user.context";
import Navbar from "../components/navbar";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";

const ResetEmail = () => {
    const { updateEmail } = useUserContext();
    // Get the emails from the url parameters and split them
    const queryParameters = new URLSearchParams(window.location.search);
    const emails = queryParameters.get("emails").split("?");
    const oldEmail = emails[0];
    const newEmail = emails[1];

    // Update the user's email in the database to the new email
    useEffect(() => {
        async function resetEmail() {
            const resp = await updateEmail(newEmail, oldEmail);

            if (resp !== "Success") {
                toast.error(resp);
            } else {
                toast.success("Email successfully updated!");
            }
        }

        resetEmail();
    }, [newEmail, oldEmail, updateEmail]);

    return (
        <div>
            <Navbar />
            <div className="h-screen flex flex-col gap-8 justify-center items-center">
                <h1 className="text-2xl font-bold">New Email Confirmed</h1>
                <h1
                    className="text-md text-gray-400 pointer hover:underline cursor-pointer text-center"
                    onClick={() => {
                        return <Navigate to={{ pathname: "/login" }} />;
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
