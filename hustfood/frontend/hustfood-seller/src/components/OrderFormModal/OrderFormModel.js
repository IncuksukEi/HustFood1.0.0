// src/components/OrderFormModal/OrderFormModal.js
import React, { useState, useEffect } from "react";
import {
  fetchUserByPhone,
  fetchProductByName,
  createOrder,
  updateOrder,
  fetchTotalPrice,
} from "../../services/ordermanaService";
import "./OrderFormModel.css";

const OrderFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedOrder,
  isEdit,
}) => {
  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    orderAddress: "",
    status: "PENDING",
    products: [],
  });
  const [productLines, setProductLines] = useState([]);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isEdit && selectedOrder) {
      setFormData({
        ...selectedOrder,
        products: selectedOrder.products.map((p) => ({
          name: p.name,
          productId: p.productId,
          quantity: p.quantity,
          price: p.price,
        })),
      });
      setProductLines(selectedOrder.products);
      updateTotal(selectedOrder.orderId);
    } else {
      setFormData({
        phone: "",
        fullName: "",
        orderAddress: "",
        status: "PENDING",
        products: [],
      });
      setProductLines([]);
      setTotalPrice(0);
    }
  }, [isEdit, selectedOrder]);

  const handlePhoneBlur = async () => {
    try {
      const response = await fetchUserByPhone(formData.phone);
      const data = response.data;
      setFormData((prev) => ({
        ...prev,
        fullName: data.fullName,
        orderAddress: data.address,
        userId: data.userId,
      }));
      setError("");
    } catch {
      setError("Số điện thoại chưa được đăng ký.");
    }
  };

  const handleAddProductLine = () => {
    setProductLines([...productLines, { name: "", quantity: 1 }]);
  };

  const handleProductChange = async (index, field, value) => {
    const newProducts = [...productLines];
    newProducts[index][field] = value;

    if (field === "name") {
      try {
        const res = await fetchProductByName(value);
        const product = res.data;
        newProducts[index].price = product.price;
        newProducts[index].productId = product.productId;
      } catch {
        newProducts[index].price = 0;
      }
    }

    setProductLines(newProducts);
    recalculateTotal(newProducts);
  };

  const handleRemoveLine = (index) => {
    const newProducts = productLines.filter((_, i) => i !== index);
    setProductLines(newProducts);
    recalculateTotal(newProducts);
  };

  const recalculateTotal = (products) => {
    const total = products.reduce(
      (sum, p) => sum + p.quantity * (p.price || 0),
      0
    );
    setTotalPrice(total);
  };

  const updateTotal = async (orderId) => {
    const res = await fetchTotalPrice(orderId);
    setTotalPrice(res.data.totalPrice);
  };

  const handleSubmit = async () => {
    const dataToSend = {
      ...formData,
      products: productLines,
    };

    if (isEdit) {
      await updateOrder(selectedOrder.orderId, dataToSend);
    } else {
      await createOrder(dataToSend);
    }

    onSubmit();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content beautiful-modal">
        <h2>{isEdit ? "Chỉnh sửa đơn hàng #" + selectedOrder?.orderId : "Thêm đơn hàng"}</h2>

        <div className="form-section">
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={formData.phone}
            disabled={isEdit}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onBlur={handlePhoneBlur}
          />
          {error && <p className="error">{error}</p>}

          <label>Tên khách hàng:</label>
          <input type="text" value={formData.fullName} disabled />

          <label>Địa chỉ:</label>
          <input type="text" value={formData.orderAddress} disabled />

          <label>Trạng thái:</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="RECEIVED">RECEIVED</option>
            <option value="SHIPPED">SHIPPED</option>
          </select>
        </div>

        <div className="products-section">
          <h3>Chi tiết đơn hàng</h3>
          {productLines.map((line, idx) => (
            <div key={idx} className="product-line">
              <input
                lang="vi"
                placeholder="Tên sản phẩm"
                value={line.name}
                onChange={(e) =>
                  handleProductChange(idx, "name", e.target.value)
                }
                disabled={isEdit}
                autoComplete="off"
                spellCheck={true}
                inputMode="text"
              />
              <div className="quantity-control">
                <button
                  onClick={() =>
                    handleProductChange(
                      idx,
                      "quantity",
                      Math.max(1, line.quantity - 1)
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={line.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      idx,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleProductChange(idx, "quantity", line.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <span>{(line.price || 0).toLocaleString("vi-VN")}₫</span>
              {!isEdit && (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveLine(idx)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          {!isEdit && (
            <button className="add-product-btn" onClick={handleAddProductLine}>
              + Thêm sản phẩm
            </button>
          )}
        </div>

        <div className="total-section">
          <h4>
            Tổng tiền:{" "}
            <span className="total-price">
              {totalPrice.toLocaleString("vi-VN")}₫
            </span>
          </h4>
        </div>

        <div className="modal-actions">
          <button className="submit-btn" onClick={handleSubmit}>
            {isEdit ? "💾 Lưu thay đổi" : "➕ Tạo đơn hàng"}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            ❌ Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFormModal;
