import "../styles/MyCart.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function MyCart() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const totalPrice = () => {
      return products.reduce((total, product) => {
        const quantity = quantities[product.id] || 1;
        return total + product.price * quantity;
      }, 0);
    };
    setTotal(totalPrice());
  }, [products, quantities]);

  const handleIncrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  return (
    <div className="cart-page">
      {/* ✅ Fixed Header */}
      <div className="cart-header">
        <div className="cart">
          <p>Products</p>
          <p className="heading-qty">Qty</p>
          <p className="heading-price">Price</p>
        </div>
      </div>

      {/* ✅ Scrollable Cart Items */}
      <div className="cart-body">
        {products.map((product) => {
          const quantity = quantities[product.id] || 1;
          return (
            <div key={product.id} className="carts-list">
              <div className="cart-info">
                <div className="product-image">
                  <img
                    src={product.image}
                    alt="product"
                    height="150px"
                    width="150px"
                  />
                </div>
                <p className="title">{product.title}</p>
              </div>

              <div className="cart-count">
                <button
                  className="quantity"
                  onClick={() => handleDecrement(product.id)}
                >
                  -
                </button>
                <div className="quantity-value">{quantity}</div>
                <button
                  className="quantity"
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
              </div>

              <p>&#8377;{Math.round(product.price * quantity)}</p>
            </div>
          );
        })}

        {/* ✅ Scrolls Normally */}
        <p className="total">Total: &#8377;{Math.round(total)}</p>
        <div className="checkout-button">
          <button className="final-buttons">Continue Shopping</button>
          <button
            className="final-buttons"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
