import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './pages/Analytics/Analytics';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderManagement from './pages/OrdersMana/OrdersManagement';
import ProductManagement from './pages/ProdMana/ProductManagement';
import Login from "./pages/Login/Login";
import IngredientsManagement from './pages/IngreMana/IngredientManagement';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />                     { /*created*/ } 
        <Route path="/analytics" element={<Analytics />} />    
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/ordersmana" element={<OrderManagement />} />  
        <Route path="/prodmana" element={<ProductManagement />} />
        <Route path='/inventory' element={<IngredientsManagement />}/>   
      </Routes>
    </Router>
  );
}

export default App;
