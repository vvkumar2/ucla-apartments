import React from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    function handleStartSearchingClick() {
        navigate("/ucla-listings");
    }

    return (
        <div className="relative flex flex-col">
            <Navbar color_scheme={"LIGHT"} />
            <div className="flex flex-col min-h-screen justify-center items-center px-32 py-8 bg-homepage-apartments-background bg-black bg-opacity-60 bg-blend-darken bg-cover">
                <div className="flex flex-col justify-center items-center gap-7 max-w-3xl">
                    <h1 className="text-5xl text-white font-bold">Find your next home.</h1>
                    <span className="text-xl text-gray-300">
                        A tool for college students to find living spaces near their campus, contact property managers, and track the status of their
                        contracts and applications.
                    </span>
                    <button className="px-5 py-3 text-white rounded-md bg-blue-500 font-bold" onClick={handleStartSearchingClick}>
                        Start Searching
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
