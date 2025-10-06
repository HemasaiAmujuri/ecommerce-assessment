import LoginPage  from '../src/pages/LoginPage'
import LayoutPage from '../src/pages/Layout'
// import Mycart from '../src/pages/myCart'
// import ShippinDetails from '../src/pages/shippingDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<LayoutPage />} />
        {/* <Route path="/cart" element={<Mycart />} />
        <Route path='/shippingDetails' element={<ShippinDetails />} /> */}
      </Routes>
    </Router>
  )
}


export default App;