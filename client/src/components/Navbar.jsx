import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const location = useLocation();

  const { navigate, isOwner, setShowHotelReg, roleIntent } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 md:px-16 lg:px-24 xl:px-32 py-4 z-50 overflow-x-hidden">
      <nav
        className={`w-full flex items-center justify-between transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4 rounded-full px-6 border border-gray-400"
            : "py-0"
        }`}
      >
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src={assets.favicon}
              alt="favicon"
              className={`h-6 w-6 ${
                isScrolled ? "brightness-0" : "brightness-0 invert"
              }`}
            />
            <h1
              className={`text-2xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Bookotel
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}

          {user && (isOwner || roleIntent === "ownerCandidate") && (
            <button
              className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                isScrolled ? "text-black" : "text-white"
              } transition-all`}
              onClick={() =>
                isOwner ? navigate("/owner") : setShowHotelReg(true)
              }
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {/* <img
            src={assets.searchIcon}
            alt="search"
            className={`${
              isScrolled && "invert"
            } h-7 transition-all duration-500`}
          /> */}

          {isSignedIn ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-colors duration-300 border-2 border-[#f5f5f5] hover:bg-gray-800"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            src={assets.menuIcon}
            alt=""
            className={`${isScrolled && "invert"} h-4 cursor-pointer`}
          />
        </div>
      </nav>

      {/* Mobile Menu - Modern Design */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex md:hidden justify-end transition-all duration-300 z-[60] ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`bg-white/60 backdrop-blur-lg border-l border-white/20 w-4/5 max-w-xs h-full p-6 flex flex-col transition-all duration-500 transform shadow-lg ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <img
                src={assets.favicon}
                alt="favicon"
                className="h-6 w-6 brightness-0"
              />
              <h1 className="text-xl font-bold text-gray-800">Bookotel</h1>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <img
                src={assets.closeIcon}
                alt="close-menu"
                className="h-5 w-5"
              />
            </button>
          </div>

          <div className="flex flex-col gap-5 mt-4">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-black hover:text-gray-700 font-medium text-lg transition-colors border-b border-black pb-2"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-6">
            {user && (isOwner || roleIntent === "ownerCandidate") && (
              <button
                className="w-full border border-black px-4 py-2 rounded-full cursor-pointer transition-all hover:bg-gray-50 mb-4 text-black"
                onClick={() =>
                  isOwner ? navigate("/owner") : setShowHotelReg(true)
                }
              >
                {isOwner ? "Dashboard" : "List Your Hotel"}
              </button>
            )}

            {!user && (
              <button
                onClick={() => {
                  openSignIn();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-black text-white py-3 rounded-full transition-colors duration-300 hover:bg-gray-800"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
