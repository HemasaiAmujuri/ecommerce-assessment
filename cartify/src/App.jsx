import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetailsPage from './components/ProductDetailsPage.jsx';
import Layout from './components/Layout.jsx';
import MyCart from './components/MyCart.jsx';
import ShippingDetails from './components/ShippingDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/shipping" element={<ShippingDetails/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
