// src/Content.jsx
import React from 'react';
import CardList from './CardList/CardList';

const Content = () => {
    return (
      <main className="min-h-96 container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Todos los productos</h1>
        <CardList />
      </main>
    );
  };

export default Content;
