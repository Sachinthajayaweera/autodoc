import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Navlinks } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const ResponsiveMenu = ({ showMenu, user, onLogout, onCloseMenu }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      {/* User Info */}
      <div>
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1 className="text-lg font-semibold">
              {user.loggedIn ? user.name : "Guest"}
            </h1>
            <h2 className="text-sm text-slate-500 dark:text-slate-400">
              {user.loggedIn ? "Premium user" : "Please login"}
            </h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data, index) => (
              <li key={index}>
                {data.link.startsWith("/") ? (
                  <a
                    href={data.link}
                    onClick={onCloseMenu}
                    className="mb-5 inline-block hover:text-[#C30010] transition-colors"
                  >
                    {data.name}
                  </a>
                ) : (
                  <ScrollLink
                    to={data.link}
                    smooth={true}
                    duration={500}
                    offset={-100}
                    onClick={onCloseMenu}
                    className="mb-5 inline-block cursor-pointer hover:text-[#C30010] transition-colors"
                  >
                    {data.name}
                  </ScrollLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Buttons */}
      <div className="mt-auto space-y-3">
        {user.loggedIn ? (
          <>
            <button
              onClick={() => {
                navigate("/profile");
                onCloseMenu();
              }}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800 px-4 py-2 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => {
                navigate("/vehicle");
                onCloseMenu();
              }}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800 px-4 py-2 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Vehicle
            </button>
            <button
              onClick={() => {
                navigate("/appointments");
                onCloseMenu();
              }}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800 px-4 py-2 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Appointment
            </button>
            <button
              onClick={() => {
                onLogout();
                onCloseMenu();
              }}
              className="w-full text-center rounded-lg bg-[#C30010] px-4 py-2 text-white font-semibold hover:bg-[#a8000e] transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              onCloseMenu();
            }}
            className="w-full text-center rounded-lg bg-[#C30010] px-4 py-2 text-white font-semibold hover:bg-[#a8000e] transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
