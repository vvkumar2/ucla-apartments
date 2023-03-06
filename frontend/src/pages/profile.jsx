import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useUserContext from "../context/user.context";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../components/form-input";
import Footer from "../components/footer";
import LikesPage from "./liked-items";

// Creating a client for the supabase database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Profile page component that displays user information
const Profile = () => {
    const [firstName, setFirstName] = useState(useUserContext().firstName);
    const [lastName, setLastName] = useState(useUserContext().lastName);
    const [email] = useState(useUserContext().email);
    const [dateRegistered, setDateRegistered] = useState("");
    const [changingEmail, setChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const { login, loggedIn, logout } = useUserContext();
    const [showDropdown, setShowDropdown] = useState(false);

    function emailChangeHandler(event) {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setNewEmail(searchFieldString);
    }

    // Function that handles the reset email button
    async function onClickResetEmail() {
        if (newEmail === "") {
            toast.error("There was an error initiating email change: reload page and try again.");
        } else {
            const { error } = await supabase.auth.updateUser(
                { email: String(newEmail) },
                {
                    redirectTo: "http://localhost:3000/reset-email",
                }
            );
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Confirmation sent to new email address! Make sure to check your spam folder!");
            }
        }
    }

    // Function that handles the reset password button
    async function onClickResetPassword() {
        setChangingEmail(false);
        if (email === "") {
            toast.error("There was an error initiating password change: reload page and try again.");
        } else {
            const { error } = await supabase.auth.resetPasswordForEmail(String(email), { redirectTo: "http://localhost:3000/reset-password" });
            if (error) {
                console.log(error);
                toast.error(error.message);
            } else {
                toast.success("Confirmation sent to email address! Make sure to check your spam folder!");
            }
        }
    }

    // On page load, scroll to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // On page load, fetch the user's name and other info from the database and set the state
    useEffect(() => {
        async function fetchName() {
            if ((firstName === "" || lastName === "" || dateRegistered === "") && loggedIn) {
                const { data, error } = await supabase.from("users").select("first_name, last_name, time_registered").eq("email", email);

                if (error) {
                    setFirstName("");
                    setLastName("");
                } else {
                    console.log(data);
                    setFirstName(data[0].first_name);
                    setLastName(data[0].last_name);

                    const time_registered = data[0].time_registered.split("-");
                    const year_registered = time_registered[0];
                    const month_registered_number = time_registered[1];

                    const date = new Date();
                    date.setMonth(month_registered_number - 1);
                    const month_registered_name = date.toLocaleString("en-US", { month: "long" });

                    setDateRegistered(month_registered_name + " " + year_registered);
                    login(email, firstName, lastName);
                }
            }
        }
        fetchName();
    }, [dateRegistered, email, firstName, lastName, loggedIn, login]);

    // If the user is not logged in, redirect to the login page
    if (!loggedIn) {
        return <Navigate to={{ pathname: "/login" }} />;
    }

    return (
        <div className="">
            <Navbar />
            <div className="w-full px-site-standard py-4 my-24">
                <div className="flex flex-col bg-white shadow-standard gap-4 py-4 px-6 rounded-xl mt-profile">
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
                                <div className="absolute flex flex-col bg-white shadow-standard text-sm rounded-xl right-16 sm:right-52 top-[160px]">
                                    <div className="px-4 py-2 hover:bg-slate-100" onClick={() => setChangingEmail(!changingEmail)}>
                                        Change Email
                                    </div>
                                    <div className="px-4 py-2 hover:bg-slate-100" onClick={onClickResetPassword}>
                                        Change Password
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col text-md text-slate-500">
                        <h2 className="my-auto">{email}</h2>
                        {dateRegistered !== "" && <h2 className="my-auto lg:ml-auto">Member since: {dateRegistered}</h2>}
                    </div>
                </div>
                {changingEmail && (
                    <div className="fixed bg-slate-300 bg-opacity-50 w-screen h-screen top-0 left-0 flex flex-col gap-4 justify-center items-centerbox z-10">
                        <div className="mx-site-standard-mobile sm:mx-auto rounded-xl bg-white shadow-standard px-6 sm:px-10 py-4 sm:py-6 flex flex-col gap-6">
                            <div className="flex flex-row">
                                <h2 className="text-center text-xl sm:text-2xl font-bold">Email Change</h2>
                                <div
                                    className="ml-auto text-xl hover:cursor-pointer"
                                    onClick={() => {
                                        setChangingEmail(!changingEmail);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                            </div>

                            <div className="flex flex-row gap-2 sm:gap-4 pb-2">
                                <FormInput type="email" placeholder="New Email" onChange={emailChangeHandler} />
                                {/* <input className="h-min w-min rounded-xl border-none shadow-standard" type="email" placeholder="Enter New Email" onChange={emailChangeHandler} /> */}
                                <button
                                    className="px-2 sm:px-8 h-[50px] bg-blue-700 hover:bg-blue-800 rounded-md text-white font-bold"
                                    onClick={onClickResetEmail}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <LikesPage />
            </div>

            <ToastContainer hideProgressBar={true} />
            <Footer />
        </div>
    );
};

export default Profile;
