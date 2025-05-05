import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSearch from './pages/HomeSearch/HomeSearch';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Pay from './pages/Pay/Pay';
import Notification from './pages/Notification/Notification';
import Help from './pages/Help/Help';
import Management from './pages/Management/Management';
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
        <Route path="/notifications" element={<Notification />}/>
        <Route path="/help" element={<Help />} />                  { /*created*/ }
        <Route path="/management" element={<Management />} />
        <Route path="/product" element={<Product />} />            { /*created*/ }
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/payorder" element={<PayOrder />} />
        <Route path="/work" element={<Work />} />
        <Route path="/general" element={<General />} />
      </Routes>
    </Router>
  );
}

export default App;
