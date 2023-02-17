import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./pages/listings";
import Home from "./pages/homepage";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-password";
import Profile from "./pages/profile/profile";
import ResetEmail from "./pages/reset-email";
import LikesPage from "./pages/liked-items/liked-items.component";
import DetailedListingPage from "./pages/detailed-listing-page";
import { createClient } from "@supabase/supabase-js";
import useUserContext from "./context/user.context";
import "./App.css";

// Creating a supabase client to connect to the database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
    // Retrieve the user context
    const { login, logout } = useUserContext();

    // Initialize the user based on the stored session
    const initUser = useCallback(async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (session) {
            await login(session.user.email, session.user.user_metadata.first_name, session.user.user_metadata.last_name);
            console.log("Session exists");
            console.log(session);
        } else {
            logout();
            console.log("No session");
        }
    }, [login, logout]);

    useEffect(() => {
        initUser();
    }, [initUser]);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="ucla-listings" element={<Listings />} />
                    <Route path="liked-items" element={<LikesPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="reset-email" element={<ResetEmail />} />
                    <Route path="apartment-listing" element={<DetailedListingPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
