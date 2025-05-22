import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard/get_products_revenue")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi khi tải doanh thu sản phẩm:", err));
  }, []);

  return (
    <div className="jobs">
      <h2>
        Doanh thu sản phẩm
      </h2>
      <div className="table-wrapper">
        <table width="100%">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx}>
                <td>{product.name}</td>
                <td>{parseFloat(product.total_price*1000).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
