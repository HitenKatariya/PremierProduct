import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto text-center p-6">
        <p className="text-sm">
          © 2025 Premier Products | All Rights Reserved
        </p>
        <div className="flex justify-center mt-3 space-x-4">
          <a href="#" className="hover:text-yellow-300">Instagram</a>
          <a href="#" className="hover:text-yellow-300">LinkedIn</a>
          <a href="#" className="hover:text-yellow-300">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
