import "../styles/MyCart.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function MyCart() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]); 
  const [quantities, setQuantities] = useState({}); 
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=194");
        setProducts(response.data.products);
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const filteredProducts = response.data.products.filter(product =>
          cartItems.some(cartItem => cartItem.id === product.id)
        );

        setCartProducts(filteredProducts);

        const quantitiesFromStorage = {};
        cartItems.forEach(item => {
          quantitiesFromStorage[item.id] = Number(item.quantity) || 1;
        });
        setQuantities(quantitiesFromStorage);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalPrice = cartProducts.reduce((total, product) => {
      const quantity = quantities[product.id] || 1;
      return total + product.price * quantity;
    }, 0);

    setTotal(totalPrice);
  }, [cartProducts, quantities]);

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

  if (cartProducts.length === 0) {
    return <p>No items found in your cart.</p>;
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="cart">
          <p>Products</p>
          <p className="heading-qty">Qty</p>
          <p className="heading-price">Price</p>
        </div>
      </div>

      {/* Scrollable Cart Items */}
      <div className="cart-body">
        {cartProducts.map((product) => {
          const quantity = quantities[product.id] || 1;
          return (
            <div key={product.id} className="carts-list">
              <div className="cart-info">
                <div className="product-image">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
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

        <p className="total">Total: &#8377;{Math.round(total)}</p>

        <div className="checkout-button">
          <button className="final-buttons" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
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
