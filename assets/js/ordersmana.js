document.addEventListener("DOMContentLoaded", () => {
  const btnAddOrder = document.getElementById("addOrderBtn");
  const modal = document.getElementById("orderModal");
  const modalDetail = document.getElementById("detailModal");
  const form = document.getElementById("orderForm");
  const tbody = document.getElementById("orderTableBody");
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  let currentEditingRow = null;

  // ===== MỞ FORM THÊM ĐƠN HÀNG =====
  btnAddOrder.addEventListener("click", () => {
    form.reset();
    form.dataset.mode = "add";
    submitBtn.textContent = "Lưu";
    modal.style.display = "flex";
    currentEditingRow = null;
  });

  // ===== ĐÓNG MODAL =====
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", () => {
      modal.style.display = "none";
      modalDetail.style.display = "none";
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // ===== LƯU (THÊM / CẬP NHẬT) ĐƠN HÀNG =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const rowHTML = `
        <td><div>${data.order_id}</div></td>
        <td><div>${data.customer}</div></td>
        <td><div>${data.product}</div></td>
        <td><div>${data.total}đ</div></td>
        <td><div>${getStatusText(data.status)}</div></td>
        <td><div>${getPaymentText(data.payment)}</div></td>
        <td><div>${data.notes || ""}</div></td>
        <td>
          <button class="view">Xem thêm</button>
          <button class="edit">Chỉnh sửa</button>
          <button class="export">Xuất hóa đơn</button>
        </td>
      `;

    if (form.dataset.mode === "add") {
      const newRow = document.createElement("tr");
      newRow.innerHTML = rowHTML;
      tbody.appendChild(newRow);
    } else if (form.dataset.mode === "edit" && currentEditingRow) {
      currentEditingRow.innerHTML = rowHTML;
    }

    modal.style.display = "none";
  });

  // ===== HÀNH ĐỘNG TRÊN TỪNG DÒNG =====
  tbody.addEventListener("click", (e) => {
    const btn = e.target;
    const row = btn.closest("tr");
    const cells = row.querySelectorAll("td");

    const order = {
      order_id: cells[0].innerText,
      customer: cells[1].innerText,
      product: cells[2].innerText,
      total: cells[3].innerText,
      status: cells[4].innerText,
      payment: cells[5].innerText,
      notes: cells[6].innerText,
    };

    // ===== XEM =====
    if (btn.classList.contains("view")) {
      document.getElementById("orderDetails").innerHTML = `
          <p><strong>Mã đơn hàng:</strong> ${order.order_id}</p>
          <p><strong>Khách hàng:</strong> ${order.customer}</p>
          <p><strong>Sản phẩm:</strong> ${order.product}</p>
          <p><strong>Tổng tiền:</strong> ${order.total}</p>
          <p><strong>Trạng thái:</strong> ${order.status}</p>
          <p><strong>Thanh toán:</strong> ${order.payment}</p>
          <p><strong>Ghi chú:</strong> ${order.notes}</p>
        `;
      modalDetail.style.display = "flex";
    }

    // ===== CHỈNH SỬA =====
    if (btn.classList.contains("edit")) {
      form.dataset.mode = "edit";
      form.order_id.value = order.order_id;
      form.customer.value = order.customer;
      form.product.value = order.product;
      form.total.value = order.total.replace("đ", "").trim();
      form.status.value = getStatusValue(order.status);
      form.payment.value = getPaymentValue(order.payment);
      form.notes.value = order.notes;
      submitBtn.textContent = "Cập nhật";
      modal.style.display = "flex";
      currentEditingRow = row;
    }

    // ===== XUẤT HÓA ĐƠN =====
    if (btn.classList.contains("export")) {
      alert(
        `Xuất hóa đơn cho đơn hàng ${order.order_id}\nKhách: ${order.customer}\nSản phẩm: ${order.product}\nTổng tiền: ${order.total}`
      );
    }
  });

  // ===== ĐÓNG CHI TIẾT =====
  document.getElementById("closeDetailBtn").addEventListener("click", () => {
    modalDetail.style.display = "none";
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    const text = document.getElementById("orderDetails").innerText;
    alert(`Xuất hóa đơn:\n${text}`);
  });

  // ===== HÀM CHUYỂN ĐỔI TRẠNG THÁI / THANH TOÁN =====
  function getStatusText(value) {
    return (
      {
        pending: "Chờ xác nhận",
        delivered: "Đã giao",
        cancelled: "Đã hủy",
      }[value] || value
    );
  }

  function getPaymentText(value) {
    return (
      {
        cash: "Tiền mặt",
        card: "Thẻ",
        paypal: "PayPal",
      }[value] || value
    );
  }

  function getStatusValue(text) {
    return (
      {
        "Chờ xác nhận": "pending",
        "Đã giao": "delivered",
        "Đã hủy": "cancelled",
      }[text] || text
    );
  }

  function getPaymentValue(text) {
    return (
      {
        "Tiền mặt": "cash",
        Thẻ: "card",
        PayPal: "paypal",
      }[text] || text
    );
  }
});
