import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserContext from "../context/user.context";

import ProfileIcon from "../assets/profile-icon.svg";
import { ReactComponent as MenuIcon } from "../assets/menu-icon.svg";

/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 */
const Navbar = ({ color_scheme }) => {
    const [scrollPosition, setScrollPosition] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

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
            className={`fixed z-10 w-full top-0 left-0  px-site-standard py-4 flex justify-between items-center ${
                scrollPosition > 30 ? ` bg-opacity-70 backdrop-blur-md bg-white` : ""
            }`}
        >
            <div className="relative flex flex-col sm:hidden">
                <MenuIcon
                    className={`h-5 w-auto ${color_scheme === "LIGHT" && scrollPosition < 30 ? "invert" : ""}`}
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                />
                <div
                    className={`absolute top-10 left-0 z-10 border shadow-standard bg-white w-[150px] px-5 py-2 flex rounded-lg flex-col items-center gap-4 ${
                        dropdownVisible ? "" : "hidden"
                    }`}
                >
                    <Link className="text-gray-500 hover:text-blue-700" to="/ucla-listings">
                        Listings
                    </Link>
                    {loggedIn ? (
                        <Link className="text-gray-500 hover:text-blue-700" to="/profile">
                            Profile
                        </Link>
                    ) : (
                        <Link className="text-gray-500 hover:text-blue-700" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
            <h1
                className={`text-xl ${color_scheme === "LIGHT" && scrollPosition <= 30 ? "text-white" : "text-gray-800"} font-bold cursor-pointer`}
                onClick={handleWebsiteNameClick}
            >
                Company Name
            </h1>
            <div className="flex gap-5">
                <button
                    className={`h-9 ${color_scheme === "LIGHT" && scrollPosition <= 30 ? "text-white" : "text-gray-800"} font-bold hidden sm:block`}
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
