// src/CardList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardList = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://source.unsplash.com/collection/1424340/400x300?sig=' + Date.now());
        const images = Array.from({ length: 12 }, (_, index) => ({
          id: index + 1,
          title: `Card ${index + 1}`,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          imageUrl: response.request.responseURL, // Obtener la URL de la imagen aleatoria
        }));
        setCardsData(images);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cardsData.map((card) => (
        <div key={card.id} className="bg-white p-4 rounded shadow-md">
          <img src={card.imageUrl} alt={`Image for ${card.title}`} className="w-full h-32 object-cover mb-2 rounded" />
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-gray-600 pb-10">{card.description}</p>
          <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Agregar al Pedido</button>
      
        </div>
      ))}
    </div>
  );
};

export default CardList;
