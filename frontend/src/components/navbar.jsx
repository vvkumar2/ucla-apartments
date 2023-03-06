import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserContext from "../context/user.context";
import { debounce } from "../utils/helpers";
import { createClient } from "@supabase/supabase-js";
import { slide as Menu } from "react-burger-menu";

import ProfileIcon from "../assets/profile-icon.svg";
import { ReactComponent as MenuIcon } from "../assets/menu-icon.svg";

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
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    var styles = {
        bmBurgerButton: {
            position: "fixed",
            width: "23px",
            height: "18px",
            right: "36px",
            top: "18px",
        },
        bmBurgerBars: {
            background: scrollPosition > 30 ? "#000000" : "#FFFFFF",
        },
        screensizbmBurgerBarsHover: {
            background: "#a90000",
        },
        bmCrossButton: {
            height: "24px",
            width: "24px",
        },
        bmCross: {
            background: "#000000",
        },
        bmMenuWrap: {
            position: "fixed",
            top: "0",
            right: "0",
            height: "100%",
        },
        bmMenu: {
            background: "#FFFFFF",
            padding: "2.5em 0.5em 0 0",
            fontSize: "1.15em",
        },
        bmMorphShape: {
            fill: "#373a47",
        },
        bmItemList: {
            color: "#b8b7ad",
            padding: "0.4em",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "fit-content",
            margin: "0 auto",
        },
        bmItem: {
            display: "inline-block",
            color: "#000000",
            fontSize: "1.2rem",
            fontWeight: "600",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
                background: "#000000",
                color: "#FFFFFF",
            },
        },
        bmOverlay: {
            background: "rgba(0, 0, 0, 0.3)",
        },
    };

    const navigate = useNavigate();
    const handleWebsiteNameClick = () => navigate("/");
    const handleGetStartedClick = () => navigate("/ucla-listings");

    const handleProfileClick = () => navigate("/profile");
    const handleLoginClick = () => navigate("/login");
    async function handleLogoutClick() {
        logout();
        await supabase.auth.signOut();
        navigate("/");
        window.location.reload(false);
    }
    const handleDropdownClick = () => setShowDropdown(!showDropdown);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        console.log(currentScrollPos < 10);
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 150);
        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    useEffect(() => {
        window.onscroll = () => {
            setScrollPosition(window.pageYOffset);
        };
    }, []);

    useEffect(() => {
        return window.addEventListener("resize", () => setScreenSize(window.innerWidth));
    }, []);

    return (
        <div
            className={`fixed z-10 w-full top-0 left-0 px-site-standard py-3 flex justify-between items-center duration-300 transition-all ${
                scrollPosition > 30 ? `bg-opacity-70 backdrop-blur-md bg-white` : ""
            } ${visible ? "" : "top-[-70px]"}`}
        >
            <div className="relative flex flex-col sm:hidden">
                <MenuIcon
                    className={`h-5 w-auto ${color_scheme === "LIGHT" && scrollPosition < 30 ? "invert" : ""}`}
                    onClick={() => setShowDropdown(!showDropdown)}
                />
                <div
                    className={`absolute top-10 left-0 z-10 border shadow-standard bg-white w-[150px] px-5 py-2 flex rounded-lg flex-col items-center gap-4 ${
                        showDropdown ? "" : "hidden"
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
            {screenSize > 500 ? (
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
                    {showDropdown && loggedIn && (
                        <div className="absolute right-[12rem] top-[60px] flex flex-col bg-white shadow-standard text-sm rounded-xl">
                            <button onClick={handleProfileClick} className="px-6 py-3 hover:bg-slate-100 rounded-xl">
                                Profile
                            </button>
                            <button onClick={handleLogoutClick} className="px-6 py-3 hover:bg-slate-100 rounded-xl">
                                Logout
                            </button>
                        </div>
                    )}
                    {showDropdown && !loggedIn && (
                        <div className="absolute right-[12rem] top-[60px] flex flex-col bg-white shadow-standard text-sm rounded-xl">
                            <button onClick={handleLoginClick} className="px-6 py-3 hover:bg-slate-100 rounded-xl">
                                Login
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Menu right styles={styles} width={230}>
                    <button onClick={handleGetStartedClick}>Listings</button>
                    <button onClick={handleProfileClick}>Profile</button>
                    {loggedIn && <button onClick={handleLogoutClick}>Logout</button>}
                </Menu>
            )}
        </div>
    );
};

export default Navbar;
