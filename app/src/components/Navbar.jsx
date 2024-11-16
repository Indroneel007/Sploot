import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar({ username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
      {/* Left: Sploot */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-blue-200">
          Sploot
        </Link>
      </div>

      {/* Right: Profile Icon and Username */}
      <div className="flex items-center space-x-4 relative">
      { user && <>

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">P</span>
          </div>
          <span className="hidden sm:block text-lg">{user.username}</span>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 top-7 mt-2 bg-white text-black rounded-md shadow-lg w-32">
            <div className="px-4 py-2 text-sm font-semibold">{user.username}</div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
        </>
      }
      </div>
    </nav>
  );
}

export default Navbar;
