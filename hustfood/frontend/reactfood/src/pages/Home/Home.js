import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css';

function Home() {
  return (
    <div className="app">
      <Header />
      <main>
        <h1>Welcome to HustFood</h1>
        {/* Thêm nội dung chính ở đây */}
      </main>
      <Footer />
    </div>
  );
}

export default Home;