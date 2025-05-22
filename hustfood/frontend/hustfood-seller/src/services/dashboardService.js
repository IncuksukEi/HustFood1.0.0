// dashboardService.js

const API_BASE = "http://localhost:5000/api"; // địa chỉ backend API

// 1. Export dữ liệu
// export const exportData = async () => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/financial-stats/export`, {
//       method: 'GET'
//     });

//     if (!response.ok) throw new Error("Failed to export financial stats");

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'financial-stats.csv';
//     link.click();
//   } catch (error) {
//     console.error("Export error:", error);
//   }
// };



// // 2. Lấy tất cả sản phẩm
// export const getAllProducts = async () => {
//   try {
//     const response = await fetch(`${API_BASE}/products`);
//     if (!response.ok) throw new Error("Failed to fetch products");
//     return await response.json();
//   } catch (error) {
//     console.error("Fetch products error:", error);
//     return [];
//   }
// };

// // 3. Lấy chi tiết một sản phẩm theo ID
// export const getProductById = async (id) => {
//   try {
//     const response = await fetch(`${API_BASE}/products/${id}`);
//     if (!response.ok) throw new Error("Failed to fetch product");
//     return await response.json();
//   } catch (error) {
//     console.error("Fetch product by ID error:", error);
//     return null;
//   }
// };
