import React, { useState } from "react";

const Navbar = ({ user, isLoggedIn, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-red-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Premier Products</h1>
        
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li className="hover:text-yellow-300 cursor-pointer">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-300 cursor-pointer relative group">
              Product
              <ul className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg p-2">
                <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                  Brass Cable Glands
                </li>
                <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                  Brass Electrical Components
                </li>
                <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                  Brass Screws
                </li>
              </ul>
            </li>
            <li className="hover:text-yellow-300 cursor-pointer">Quality</li>
            <li className="hover:text-yellow-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-yellow-300 cursor-pointer">Resources</li>
          </ul>
          
          {/* User Profile Section */}
          {isLoggedIn && user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-red-800 hover:bg-red-900 px-3 py-2 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm">
                  Hello, {user.name || user.email.split('@')[0]}
                </span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
