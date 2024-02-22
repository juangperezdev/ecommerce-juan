// src/Content.jsx
import React from 'react';
import CardList from './CardList/CardList';
import TitlePage from './TitlePage/TitlePage';

const Content = () => {
    return (
      <main className="min-h-96 container mx-auto">
        <TitlePage name="Todos los productos" />
        <CardList />
      </main>
    );
  };

export default Content;
