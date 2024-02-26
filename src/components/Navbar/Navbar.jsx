
import logo from '/logo-restaurant.png'
import CartWidget from '../CartWidget/CartWidget'

const Navbar = () => {
    return (
    

      <nav className="bg-gray-800 p-4 sticky top-0 z-10 grid grid-cols-3">
         <div className="flex items-center justify-between w-full p20" >
          <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-18 mr-2" />
          <span className="text-white text-lg pr-12 font-semibold">Restaurant Pepito</span>
          </div>
        </div>
        <ul className="flex space-x-4 text-white">
            <li><a className='text-white cursor-pointer'>Entradas</a></li>
            <li><a className='text-white cursor-pointer'>Principales</a></li>
            <li><a className='text-white cursor-pointer'>Postre</a></li>
            <li><a className='text-white cursor-pointer'>Bebidas</a></li>
          </ul>
        <CartWidget className="col-span-1 flex  justify-end" />
        </nav>
         

    );
  };

 

export default Navbar;
