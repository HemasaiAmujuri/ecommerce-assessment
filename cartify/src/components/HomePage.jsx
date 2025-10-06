import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage">
      <ProductList />
    </div>
  );
}