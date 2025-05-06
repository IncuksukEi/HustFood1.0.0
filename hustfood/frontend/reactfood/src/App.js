import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSearch from './pages/HomeSearch/HomeSearch';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Pay from './pages/Pay/Pay';
import Help from './pages/Help/Help';
import Home from './pages/Home/Home';
import Guide from './pages/Guide/Guide';
import PayOrder from './pages/PayOrder/PayOrder' //Chinh sach thanh toan khi dat hang (thuoc Footer)
import Work from './pages/Work/Work' //Chinh sach hoat dong (thuoc Footer)
import General from './pages/General/General' //Chinh sach chung (thuoc Footer)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />                      { /*created*/ }
        <Route path="/Search" element={<HomeSearch />} />          { /*created*/ }
        <Route path="/help" element={<Help />} />                  { /*created*/ }
        <Route path="/product" element={<Product />} />            { /*created*/ }
        <Route path="/cart" element={<Cart />} />                  { /*created*/ } 
        <Route path="/profile" element={<Profile />} />
        <Route path="/pay" element={<Pay />} />                    { /*created*/ }
        <Route path="/guide" element={<Guide />} />                { /*created*/ }
        <Route path="/payorder" element={<PayOrder />} />          { /*created*/ }
        <Route path="/work" element={<Work />} />                  { /*created*/ }
        <Route path="/general" element={<General />} />            { /*created*/ }
      </Routes>
    </Router>
  );
}

export default App;
