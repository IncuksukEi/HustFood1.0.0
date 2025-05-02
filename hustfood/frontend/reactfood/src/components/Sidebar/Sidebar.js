import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="grid__column-2">
            <nav className="category">
              <h3 className="category__heading">
                <i className="category__heading-icon fa-solid fa-list"></i>
                Danh mục món ăn
              </h3>
              <ul className="category-list">
                <li className="category-item category-item--active">
                  <a href="#" className="category-item__link">Món gà rán</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Burger & Cơm</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Thức ăn nhẹ</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Tráng miệng</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Đồ uống</a>
                </li>
              </ul>
            </nav>
        </div>
    )
}

export default Sidebar;