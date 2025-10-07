import "../styles/ShippingDetails.css";

function ShippingDetails() {



  return (
    <div className="shipping-container">
      <div className="shipping-body">
        {/* Shipping Form */}
        <div className="shipping-left">
          <h2>Shipping Information</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              id="address"
              rows="5"
              placeholder="Enter your address"
            ></textarea>
          </div>

          
        </div>

        {/* Order Summary */}
        <div className="shipping-right">
          <h2>Order Summary</h2>
          <div className="summary-box">
            <p>No items in cart</p>
            {/* You can dynamically render products here like in MyCart */}
          </div>
          <button
            className="confirm-button"
            onClick={() => alert("Order Confirmed!")}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingDetails;
