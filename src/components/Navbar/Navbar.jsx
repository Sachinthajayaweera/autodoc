import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import RespensiveMenu from"./ResponsiveMenu";
import { Link as ScrollLink } from "react-scroll";


export const Navlinks = [
  { id: 1, name: "HOME", link: "/" },
  { id: 2, name: "SERVICES", link: "services" },
  { id: 3, name: "ABOUT", link: "about" },
  { id: 4, name: "CONTACT US", link: "contact-us" },
];

const Navbar = ({ theme, setTheme, user, setUser, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    setUser({ name: "", email: "", loggedIn: false });
    localStorage.removeItem("token"); // Ensure token is cleared on logout
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold font-serif">
          AutoDOC
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {Navlinks.map(({ id, name, link }) => (
            <ScrollLink
              key={id}
              to={link.replace("/#", "")} // "services", "about", etc.
              smooth={true}
              duration={500}
              offset={-100} // adjust this if your navbar overlaps content
              className="cursor-pointer text-lg font-medium hover:text-[#C30010] py-2 hover:border-b-2 hover:border-[#C30010] transition-colors duration-300"
            >
              {name}
            </ScrollLink>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-2xl focus:outline-none"
          >
            {theme === "dark" ? <BiSolidSun /> : <BiSolidMoon />}
          </button>

          {/* Profile or Login */}
          {user.loggedIn ? (
            <div className="relative">
              <FaUserCircle
                className="text-3xl cursor-pointer"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-md p-2 w-40">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/vehicle");
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Vehicle
                  </button>

                  <button
                    onClick={() => {
                      navigate("/appointments");
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Appointment
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#C30010] text-white px-4 py-2 rounded-md hover:bg-[#a0000d] transition-colors"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-2xl focus:outline-none"
          >
            {theme === "dark" ? <BiSolidSun /> : <BiSolidMoon />}
          </button>

          {/* Hamburger Menu */}
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {showMenu ? <HiMenuAlt1 /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      
      <RespensiveMenu
        showMenu={showMenu}
        user={user}
        setUser={setUser}
        onLogout={handleLogout}
        onCloseMenu={() => setShowMenu(false)}
      />

    </div>
  );
};

export default Navbar;
