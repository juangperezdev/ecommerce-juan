// src/CardList.jsx
import React from 'react';

const CardList = () => {
  // Array de datos simulados para las tarjetas
  const cardsData = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 text-center">
      {cardsData.map((card) => (
        <div key={card.id} className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-gray-600 pb-10 ">{card.description}</p>
          <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Agregar al Pedido</button>
        </div>
      ))}
    </div>
  );
};

export default CardList;
