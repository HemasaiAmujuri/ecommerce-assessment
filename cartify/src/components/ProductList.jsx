import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const search = queryParams.get('search');

    let url = 'https://dummyjson.com/products?limit=100';
    if (category) url = `https://dummyjson.com/products/category/${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const items = data.products || data;
        let filtered = items;

        if (search) {
          filtered = items.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProducts(filtered);
        setCurrentPage(1);
      })
      .catch(err => console.error(err));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);


  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <h2 style={{ textAlign: 'center', marginTop: '2rem', color: '#ff5e00' }}>
          No products found.
        </h2>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image-container">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                    />
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                </Link>
                <button className="add-btn">Add to Cart</button>
              </div>
            ))}
          </div>


          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
