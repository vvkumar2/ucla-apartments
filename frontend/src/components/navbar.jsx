import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profile-icon.svg";
import useUserContext from "../context/user.context";

/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 */
const Navbar = ({ color_scheme }) => {
    const [scrollPosition, setScrollPosition] = useState(false);

    const { loggedIn } = useUserContext();
    const navigate = useNavigate();

    const handleWebsiteNameClick = () => navigate("/");
    const handleGetStartedClick = () => navigate("/ucla-listings");
    const handleLoginClick = () => navigate("/login");
    const handleProfileClick = () => navigate("/profile");

    useEffect(() => {
        window.onscroll = () => {
            setScrollPosition(window.pageYOffset);
        };
    }, []);

    return (
        <div
            className={`fixed z-10 w-full top-0 left-0 px-site-standard py-4 flex justify-between items-center ${
                scrollPosition > 30 ? ` bg-opacity-70 backdrop-blur-md bg-white` : ""
            }`}
        >
            <h1
                className={`text-xl ${color_scheme === "LIGHT" && scrollPosition <= 30 ? "text-white" : "text-gray-800"} font-bold cursor-pointer`}
                onClick={handleWebsiteNameClick}
            >
                Company Name
            </h1>
            <div className="flex gap-5">
                <button
                    className={`h-9 ${color_scheme === "LIGHT" && scrollPosition <= 30 ? "text-white" : "text-gray-800"} font-bold`}
                    onClick={handleGetStartedClick}
                >
                    View Listings
                </button>
                {true ? (
                    <button onClick={handleProfileClick} className="h-9 flex justify-center items-center">
                        <img className=" h-full text-red-500" src={ProfileIcon} alt="Profile Icon" />
                    </button>
                ) : (
                    <button className="w-20 h-9 bg-blue-700 hover:bg-blue-800 text-white rounded-md font-bold" onClick={handleLoginClick}>
                        Log In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
