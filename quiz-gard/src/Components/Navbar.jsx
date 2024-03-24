import React from "react";
import logo from '/logo.png';
const Navbar = () => {
  return (
    <header className="h-16 shadow-sm">
      <nav className='flex'>
        <a href="/">
          <img src={logo} alt="logo"/>
          {/* Nav Items */}
          <div>
              <ul>
              <li><a href="">How it's works ?</a></li>
              <li><a href="">Fetures</a></li>
              <li><a href="">About Us</a></li>
              </ul>
              <button className="font-medium px-5 py-1 border border-primary rounded">Log In</button>
          </div>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
