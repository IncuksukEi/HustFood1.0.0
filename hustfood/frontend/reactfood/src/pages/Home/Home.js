import React from 'react';
import './Home.css';
import "../../styles/base.css";
import Header from '../../components/Header/Header'; 
import BillBoard from '../../components/Billboard/BillBoard';
import Category from '../../components/Category/Category';
import Footer from '../../components/Footer/Footer';

function Home() {
  return (
  <><Header />
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
          <BillBoard />
          <Category />
        </div>
      </div>
    </div>
    <Footer /></>
  );
}

export default Home;
