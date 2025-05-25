import React, { useState, useEffect } from "react";
import { getProductSales } from "../../services/dashboardService";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductSales = async () => {
      try {
        const res = await getProductSales();
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi tải doanh thu sản phẩm:", err);
      }
    };

    fetchProductSales();
  }, []);

  return (
    <div className="jobs">
      <h2>Doanh thu sản phẩm</h2>
      <div className="table-wrapper">
        <table width="100%">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng đã bán</th>
              <th>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx}>
                <td>{product.name}</td>
                <td>{product.quantitySold}</td>
                <td>
                  {parseFloat(product.revenue).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
