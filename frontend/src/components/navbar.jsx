import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profile-icon.svg";
import useUserContext from "../context/user.context";

/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 */
const Navbar = ({ color_scheme }) => {
    const { loggedIn } = useUserContext();
    const navigate = useNavigate();

    const handleWebsiteNameClick = () => navigate("/");
    const handleGetStartedClick = () => navigate("/ucla-listings");
    const handleLoginClick = () => navigate("/login");
    const handleProfileClick = () => navigate("/profile");
    const handleLikedItemsClick = () => navigate("/liked-items");

    return (
        <div className="absolute top-8 left-32 right-32 flex justify-between items-center h-9">
            <h1 className={`text-xl ${color_scheme === "LIGHT" ? "text-white" : ""} font-bold cursor-pointer`} onClick={handleWebsiteNameClick}>
                Company Name
            </h1>
            {loggedIn ? (
                <div className="flex gap-5">
                    <button className={`h-9 ${color_scheme === "LIGHT" ? "text-white" : ""} font-bold`} onClick={handleLikedItemsClick}>
                        Liked Items
                    </button>
                    <button onClick={handleProfileClick} className="h-9 flex justify-center items-center">
                        <img className="h-full" src={ProfileIcon} alt="Profile Icon" />
                    </button>
                </div>
            ) : (
                <div className="flex gap-5">
                    <button className={`h-9 ${color_scheme === "LIGHT" ? "text-white" : ""} font-bold`} onClick={handleGetStartedClick}>
                        View Listings
                    </button>
                    <button className="w-20 h-9 bg-blue-500 text-white rounded-md font-bold" onClick={handleLoginClick}>
                        Log In
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
