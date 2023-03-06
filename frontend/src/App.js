import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from "./pages/listings";
import Home from "./pages/homepage";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-password";
import Profile from "./pages/profile";
import ResetEmail from "./pages/reset-email";
import LikesPage from "./pages/liked-items";
import DetailedListingPage from "./pages/detailed-listing-page";

function App() {
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
