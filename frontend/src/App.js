import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailedListingPage from './pages/detailed-listing-page';
import Home from './pages/homepage';
import LikesPage from './pages/liked-items';
import Listings from './pages/listings';
import Login from './pages/login';
import Profile from './pages/profile';
import ResetEmail from './pages/reset-email';
import ResetPassword from './pages/reset-password';

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
