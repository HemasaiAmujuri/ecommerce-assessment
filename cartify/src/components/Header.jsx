import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) setCategories(data);
        else setCategories([]);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategories([]);
      });
  }, []);


  const goToProducts = () => {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  return (
    <header className="header">
      <div className="header-hero">

        <div className="header-left" onClick={goToProducts}>
          <img src="src/data/logo.png" alt="logo" className="logo-img" />
          <h1 className="brand-name">Cartify</h1>
        </div>


        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <span onClick={goToProducts}>Products</span>


          <div
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="dropdown-title">Categories ▾</span>
            {showDropdown && Array.isArray(categories) && categories.length > 0 && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={goToProducts}>
                  All Products
                </div>
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="dropdown-item"
                    onClick={() => {

                      const categoryParam = cat.slug || cat;
                      navigate(`/products?category=${categoryParam}`);
                      setShowDropdown(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {cat.name || cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span onClick={scrollToFooter}>About</span>
          <span onClick={scrollToFooter}>Contact</span>
        </nav>


        <div className="header-right">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              className="header-search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </form>
          <Link to="/cart" className="cart-container">
            <img src="src/data/shopping-cart.png" alt="cartlogo" className="icon-img" />
            <span className="cart-label">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
