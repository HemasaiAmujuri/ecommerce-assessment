import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsPage.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.title}(s) to cart!`);
  };

  return (
    <div className="product-details-page">
      <div className="image-container">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : ""}
          alt={product.title}
        />
      </div>

      <div className="details">
        <h1>{product.title}</h1>
        <p className="price"><strong>Price:</strong> ${product.price}</p>
        <p className="category"><strong>Category:</strong> {product.category}</p>
        <p className="description"><strong>Description:</strong> {product.description}</p>

        <div className="purchase">
          <label>
            Quantity:
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </label>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
