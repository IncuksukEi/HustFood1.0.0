import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Sidebar.css";


const categories = [
  { id: 0, name: 'Ưu đãi', query: 'uu-dai' },
  { id: 1, name: 'Món Mới', query: 'mon-moi' },
  { id: 2, name: 'Combo 1 Người', query: 'combo-1-nguoi' },
  { id: 3, name: 'Combo Nhóm', query: 'combo-nhom' },
  { id: 4, name: 'Gà Rán - Gà Quay', query: 'ga-ran' },
  { id: 5, name: 'Burger - Cơm - Mì Ý', query: 'burger' },
  { id: 6, name: 'Thức Ăn Nhẹ', query: 'thuc-an-nhe' },
  { id: 7, name: 'Thức Uống & Tráng Miệng', query: 'do-uong' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const handleCategoryClick = (category) => {
    setSearchParams({ q: category.query });
    navigate(`/search?q=${category.query}`);
  }


    return (
      <div className="grid__column-2">
        <nav className="category">
          <h3 className="category__heading">
          <i className="category__heading-icon fa-solid fa-list"></i>
          Danh mục món ăn
          </h3>
          <ul className="category-list">
          {categories.map((category) => (
            <li 
            key={category.id} 
            className={`category-item ${category.query === query ? 'category-item--active' : ''}`}
            >
            <span className="category-item__name" onClick={() => handleCategoryClick(category)}>{category.name}</span>
            </li>
          ))}
          </ul>
        </nav>
      </div>
    )
}

export default Sidebar;