import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profile-icon.svg";
import useUserContext from "../context/user.context";
import { debounce } from "../utils/helpers";
import { createClient } from "@supabase/supabase-js";

// Creating a client for the supabase database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 */
const Navbar = ({ color_scheme }) => {
    const { loggedIn, logout } = useUserContext();
    const [scrollPosition, setScrollPosition] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const handleWebsiteNameClick = () => navigate("/");
    const handleGetStartedClick = () => navigate("/ucla-listings");
    
    const handleProfileClick = () => navigate("/profile");
    const handleLoginClick = () => navigate("/login");
    async function handleLogoutClick () {
        logout();
        await supabase.auth.signOut();
        navigate("/");
        window.location.reload(false);

    };
    const handleDropdownClick = () => setShowDropdown(!showDropdown);


    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        console.log(currentScrollPos < 10);
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 150);
        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [prevScrollPos, visible, handleScroll]);


    useEffect(() => {
        window.onscroll = () => {
            setScrollPosition(window.pageYOffset);
        };
    }, []);


    return (
        <div
            className={`fixed z-10 w-full top-0 left-0 px-site-standard-mobile sm:px-site-standard py-4 flex justify-between items-center ${
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
                <button onClick={handleDropdownClick} className="h-9 flex justify-center items-center">
                    <img className="h-full" src={ProfileIcon} alt="Profile Icon" />
                </button>
                {showDropdown && loggedIn &&
                    <div className="absolute right-[12rem] top-[60px] flex flex-col bg-white shadow-standard text-sm rounded-xl">
                        <button onClick={handleProfileClick} className="px-6 py-3 hover:bg-slate-100 rounded-xl">Profile</button>
                        <button onClick={handleLogoutClick} className="px-6 py-3 hover:bg-slate-100 rounded-xl">Logout</button>
                    </div>
                }
                {showDropdown && !loggedIn &&
                    <div className="absolute right-[12rem] top-[60px] flex flex-col bg-white shadow-standard text-sm rounded-xl">
                        <button onClick={handleLoginClick} className="px-6 py-3 hover:bg-slate-100 rounded-xl">Login</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
