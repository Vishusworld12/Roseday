import React, { useEffect } from "react";

const Header = () => {
  return (
    <header className="w-full py-2 bg-slate-950">
      <nav className="w-full lg:w-[80%] mx-auto flex items-center justify-between">

        <a Link to="/" className="text-3xl font-bold text-white">
          Love Days
        </a>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <a Link to="/"  href="#" className="text-gray-200 hover:text-gray-400 text-xl transition-all duration-300 border-b border-b-transparent hover:border-b-orange-400">
              Home
            </a>
          </li>

          <li>
            <a Link to="/" href="#" className="text-gray-200 hover:text-gray-400 text-xl transition-all duration-300 border-b border-b-transparent hover:border-b-orange-400">
              About
            </a>
          </li>

          <li>
            <a Link to="/" href="#" className="text-gray-200 hover:text-gray-400 text-xl transition-all duration-300 border-b border-b-transparent hover:border-b-orange-400">
              services
            </a>
          </li>

          <li>
            <a Link to="/" href="#" className="text-gray-200 hover:text-gray-400 text-xl transition-all duration-300 border-b border-b-transparent hover:border-b-orange-400">
              Contact
            </a>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default Header;

