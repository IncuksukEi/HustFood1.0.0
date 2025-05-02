import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="grid__column-2">
            <nav className="category">
              <h3 className="category__heading">
                <i className="category__heading-icon fa-solid fa-list"></i>
                Danh mục
              </h3>
              <ul className="category-list">
                <li className="category-item category-item--active">
                  <a href="#" className="category-item__link">Bim Bim</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Nước ngọt</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Bánh kẹo</a>
                </li>
              </ul>
            </nav>
        </div>
    )
}

export default Sidebar;