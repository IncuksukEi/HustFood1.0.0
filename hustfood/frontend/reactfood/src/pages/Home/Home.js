import React from 'react';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import './Home.css';
import "../../styles/base.css";
import BillBoard from '../../components/Billboard/BillBoard';
import Category from '../../components/Category/Category';

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
