import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import toast from "react-hot-toast";
import Logo from "../../../assets/banner/Logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut().then(() => {
      toast.success("You've Successfully Logged Out!");
    });
  };

  const links = (
    <>
      <li>
        <NavLink to={`/`} className={`text-lg font-medium merriweather`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/all-books`}
          className={`text-lg font-medium merriweather`}
        >
          All Books
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={`/dashboard`}
              className={`text-lg font-medium merriweather`}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={`/faq`} className={`text-lg font-medium merriweather`}>
          FAQ's
        </NavLink>
      </li>
      <li>
        <NavLink to={`/contact`} className={`text-lg font-medium merriweather`}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed navbar z-50 bg-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={`/`} className="flex items-center">
          <img
            src={Logo}
            className="h-8 sm:h-9 lg:h-24 w-auto object-contain"
            alt=""
          />
          <h2 className="text-4xl font-black transition-all duration-300 hover:tracking-wide">
            Book
            <span className="text-[#62ab00]">Courier</span>
          </h2>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        <div className="relative">
          <div className="flex flex-row items-center gap-3">
            {/* Dropdown btn */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
              <AiOutlineMenu />
              <div className="hidden md:block aspect-square">
                {/* Avatar */}
                <img
                  className="object-center rounded-full"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt="profile"
                  height="30"
                  width="30"
                />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
              <div className="flex flex-col cursor-pointer">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
