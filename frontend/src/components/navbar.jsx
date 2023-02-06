import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profile-icon.svg";
import useUserContext from "../context/user.context";

/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 * @param showBackground boolean to indicate if navbar should have a background. By default, background appears on scroll
 */
const Navbar = ({ color_scheme, showBackground = false }) => {
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
            className={`fixed z-10 w-full top-0 left-0 h-16 px-32 py-10 flex justify-between items-center ${
                scrollPosition > 30 || showBackground ? "bg-slate-300 bg-opacity-10 backdrop-blur" : ""
            }`}
        >
            <h1 className={`text-xl ${color_scheme === "LIGHT" ? "text-white" : ""} font-bold cursor-pointer`} onClick={handleWebsiteNameClick}>
                Company Name
            </h1>
            {loggedIn ? (
                <div className="flex gap-5">
                    <button className={`h-9 ${color_scheme === "LIGHT" ? "text-white" : ""} font-bold`} onClick={handleGetStartedClick}>
                        View Listings
                    </button>
                    <button onClick={handleProfileClick} className="h-9 flex justify-center items-center">
                        <img className={`h-full ${color_scheme === "LIGHT" ? "invert" : ""}`} src={ProfileIcon} alt="Profile Icon" />
                    </button>
                </div>
            ) : (
                <div className="flex gap-5">
                    <button className={`h-9 ${color_scheme === "LIGHT" ? "text-white" : ""} font-bold`} onClick={handleGetStartedClick}>
                        View Listings
                    </button>
                    <button className="w-20 h-9 bg-blue-700 hover:bg-blue-800 text-white rounded-md font-bold" onClick={handleLoginClick}>
                        Log In
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
