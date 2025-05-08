import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';

// Import images
import offerImg from '../../assets/images/categories/khuyen-mai.jpg';
import newDishImg from '../../assets/images/categories/mon-moi.jpg';
import singleComboImg from '../../assets/images/categories/combo-1-nguoi.jpg';
import groupComboImg from '../../assets/images/categories/combo-nhom.jpg';
import chickenImg from '../../assets/images/categories/ga-ran.jpg';
import burgerImg from '../../assets/images/categories/burger.jpg';
import snacksImg from '../../assets/images/categories/thuc-an-nhe.jpg';
import drinksImg from '../../assets/images/categories/do-uong.jpg';

const categories = [
  { id: 0, name: 'Ưu đãi', image:offerImg, query: 'uu-dai' },
  { id: 1, name: 'Món Mới', image: newDishImg, query: 'mon-moi' },
  { id: 2, name: 'Combo 1 Người', image: singleComboImg, query: 'combo-1-nguoi' },
  { id: 3, name: 'Combo Nhóm', image: groupComboImg, query: 'combo-nhom' },
  { id: 4, name: 'Gà Rán - Gà Quay', image: chickenImg, query: 'ga-ran' },
  { id: 5, name: 'Burger - Cơm - Mì Ý', image: burgerImg, query: 'burger' },
  { id: 6, name: 'Thức Ăn Nhẹ', image: snacksImg, query: 'thuc-an-nhe' },
  { id: 7, name: 'Thức Uống & Tráng Miệng', image: drinksImg, query: 'do-uong' }
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (query) => {
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="category-container">
      <h2 className="category-title">DANH MỤC MÓN ĂN</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="category-item"
            onClick={() => handleCategoryClick(category.query)}
          >
            <div className="category-image-container">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="category-name">{category.name} ›</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
