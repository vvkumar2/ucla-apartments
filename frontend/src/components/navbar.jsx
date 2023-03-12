import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as MenuIcon } from '../assets/menu-icon.svg';
import ProfileIcon from '../assets/profile-icon.svg';
import useUserContext from '../context/user.context';
import { debounce } from '../utils/helpers';
import {useRef} from "react"


/**
 * @param color_scheme either "LIGHT" or "DARK" to indicate if the text should be white or black. Default is "DARK"
 * @param homepage either true or false to indicate if the navbar should include "View Listings"
*/
const Navbar = ({ color_scheme, homepage=false }) => {
  const catMenuLarge = useRef(null)
  const catMenuSmall = useRef(null)

  const closeOpenMenus = (e) => {
    if(catMenuLarge.current && showDropdownLarge && !catMenuLarge.current.contains(e.target)){
      setShowDropdownLarge(false)
    }
    if(catMenuSmall.current && showDropdownSmall && !catMenuSmall.current.contains(e.target)){
      setShowDropdownSmall(false)
    }
  }
  document.addEventListener('mousedown',closeOpenMenus)

  const { loggedIn, logout } = useUserContext();
  const [scrollPosition, setScrollPosition] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showDropdownLarge, setShowDropdownLarge] = useState(false);
  const [showDropdownSmall, setShowDropdownSmall] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);


  const navigate = useNavigate();
  const handleWebsiteNameClick = () => navigate('/');
  const handleGetStartedClick = () => navigate('/ucla-listings');

  const handleProfileClick = () => navigate('/profile');
  const handleLoginClick = () => navigate('/login');

  async function handleLogoutClick() {
    logout();
    navigate('/');
    window.location.reload(false);
  }
  const handleDropdownClickLarge = () => setShowDropdownLarge(!showDropdownLarge);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
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

  useEffect(() => {
    return window.addEventListener('resize', () => setScreenSize(window.innerWidth));
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-10 flex w-full items-center justify-between px-site-standard py-3 transition-all duration-300 ${
        scrollPosition > 30 ? `bg-white bg-opacity-70 backdrop-blur-md` : ''
      } ${visible ? '' : 'top-[-70px]'}`}
    >
      <h1
        className={`text-xl ${
          color_scheme === 'LIGHT' && scrollPosition <= 30 ? 'text-white' : 'text-gray-800'
        } cursor-pointer font-bold`}
        onClick={handleWebsiteNameClick}
      >
        Company Name
      </h1>
      <div className={`flex gap-5 invisible sm:visible`}>
        { !homepage && 
        <button
          className={`h-9 ${
            color_scheme === 'LIGHT' && scrollPosition <= 30 ? 'text-white' : 'text-gray-800'
          } font-bold`}
          onClick={handleGetStartedClick}
        >
          View Listings
        </button>
        }
        <button onClick={handleDropdownClickLarge} className="flex h-9 items-center justify-center">
          <img className="h-full" src={ProfileIcon} alt="Profile Icon" />
        </button>
        {showDropdownLarge && loggedIn && (
          <div ref={catMenuLarge} className="absolute sm:right-[3rem] md:right-[8rem] lg:right-[12rem] top-[60px] flex flex-col rounded-xl bg-white text-sm shadow-standard">
            <button
              onClick={handleProfileClick}
              className="rounded-xl px-6 py-3 hover:bg-slate-100"
            >
              Profile
            </button>
            <button
              onClick={handleLogoutClick}
              className="rounded-xl px-6 py-3 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        )}
        {showDropdownLarge && !loggedIn && (
          <div ref={catMenuLarge} className="absolute right-[12rem] top-[60px] flex flex-col rounded-xl bg-white text-sm shadow-standard">
            <button
              onClick={handleLoginClick}
              className="rounded-xl px-6 py-3 hover:bg-slate-100"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <div className="relative flex flex-col sm:hidden">
        <MenuIcon
          className={`h-5 w-auto ${
            color_scheme === 'LIGHT' && scrollPosition < 30 ? 'invert' : ''
          }`}
          onClick={() => setShowDropdownSmall(!showDropdownSmall)}
        />
        {showDropdownSmall && loggedIn && (
        <div ref={catMenuSmall} className="absolute right-0 top-8 flex flex-col rounded-xl bg-white text-sm shadow-standard">
          <button
            onClick={handleGetStartedClick}
            className="rounded-xl px-6 py-3 hover:bg-slate-100"
          >
            Listings
          </button>
          <button
            onClick={handleProfileClick}
            className="rounded-xl px-6 py-3 hover:bg-slate-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogoutClick}
            className="rounded-xl px-6 py-3 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
        )}
        {showDropdownSmall && !loggedIn && (
          <div ref={catMenuSmall} className="absolute right-[12rem] top-[60px] flex flex-col rounded-xl bg-white text-sm shadow-standard">
            <button
              onClick={handleLoginClick}
              className="rounded-xl px-6 py-3 hover:bg-slate-100"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
