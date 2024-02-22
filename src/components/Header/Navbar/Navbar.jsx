// src/Navbar.jsx
import React from 'react'
import logo from '/logo-restaurant.png'
import CartWidget from '../CartWidget/CartWidget'

const Navbar = () => {
    return (
      
        <div className='flex items-center'>
          <ul className="flex space-x-4 text-white">
            <li><a className='text-white cursor-pointer'>Entradas</a></li>
            <li><a className='text-white cursor-pointer'>Principales</a></li>
            <li><a className='text-white cursor-pointer'>Postre</a></li>
            <li><a className='text-white cursor-pointer'>Bebidas</a></li>
          </ul>
        </div>
    );
  };

 

export default Navbar;
