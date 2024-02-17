// src/Navbar.jsx
import React from 'react';
//import reactLogo from './src/assets/react.svg'
import logo from '/logo-restaurant.png'

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between w-full p20" >
          <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-18 mr-2" />
          <span className="text-white text-lg pr-4 font-semibold">Menú Online</span>
          </div>
          <ul className="flex space-x-4 text-white">
            <li>Entradas</li>
            <li>Principales</li>
            <li>Postre</li>
            <li>Bebidas</li>
          </ul>
        </div>
      </nav>
    );
  };

 

export default Navbar;
