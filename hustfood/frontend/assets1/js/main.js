// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

//menu toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
// Product
document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addProduct();
  });

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const type = document.getElementById("productType").value;
  const quantity = document.getElementById("productQuantity").value;
  const description = document.getElementById("productDescription").value;

  if (!name || !price || !type || !quantity || !description) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    return;
  }

  const productList = document.getElementById("products_list");
  const productItem = document.createElement("div");
  productItem.classList.add("products_item");
  productItem.innerHTML = `
                <strong>${name}</strong>
                <p>Giá: ${parseInt(price).toLocaleString("vi-VN")} VND</p>
                <p>Loại: ${type}</p>
                <p>Số lượng: ${quantity}</p>
                <p>Mô tả: ${description}</p>
                <button class="products_status products_pending" onclick="updateStatus(this)">Trạng thái</button>
                <button onclick="deleteProduct(this)">Xóa</button>
            `;
  productList.appendChild(productItem);
  document.getElementById("productForm").reset();
}

function deleteProduct(button) {
  button.parentElement.remove();
}

function updateStatus(button) {
  if (button.classList.contains("products_pending")) {
    button.classList.remove("products_pending");
    button.classList.add("products_delivered");
    button.textContent = "Chờ xác nhận";
  } else if (button.classList.contains("products_delivered")) {
    button.classList.remove("products_delivered");
    button.classList.add("products_returned");
    button.textContent = "Từ chối";
  } else {
    button.classList.remove("products_returned");
    button.classList.add("products_pending");
    button.textContent = "Chấp nhận";
  }
}
// ===== Customer =====
document.addEventListener("DOMContentLoaded", function () {
  let customerEditingId = null;

  // Hiển thị modal
  function customer_showModal() {
    document.getElementById("customer_edit_modal").style.display = "flex";
  }

  // Đóng modal
  function customer_closeModal() {
    document.getElementById("customer_edit_modal").style.display = "none";
  }

  // Mở modal thêm khách hàng mới
  window.customer_openAddModal = function () {
    customerEditingId = null;
    document.getElementById("customer_edit_name").value = "";
    document.getElementById("customer_edit_email").value = "";
    document.getElementById("customer_edit_phone").value = "";
    document.getElementById("customer_edit_orders").value = 0;
    customer_showModal();
  };

  // Mở modal chỉnh sửa khách hàng
  window.customer_editCustomer = function (id) {
    let row = document.getElementById("customer_" + id);
    customerEditingId = id;

    document.getElementById("customer_edit_name").value =
      row.querySelector(".customer_name").innerText;
    document.getElementById("customer_edit_email").value =
      row.querySelector(".customer_email").innerText;
    document.getElementById("customer_edit_phone").value =
      row.querySelector(".customer_phone").innerText;
    document.getElementById("customer_edit_orders").value =
      row.querySelector(".customer_orders").innerText;

    customer_showModal();
  };

  // Lưu chỉnh sửa hoặc thêm khách hàng mới
  window.customer_saveEdit = function () {
    let name = document.getElementById("customer_edit_name").value;
    let email = document.getElementById("customer_edit_email").value;
    let phone = document.getElementById("customer_edit_phone").value;
    let orders = document.getElementById("customer_edit_orders").value;

    if (!name || !email || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (customerEditingId === null) {
      let newId = Date.now();
      let newRow = document.createElement("tr");
      newRow.id = "customer_" + newId;
      newRow.innerHTML = `
              <td>${newId}</td>
              <td class="customer_name">${name}</td>
              <td class="customer_email">${email}</td>
              <td class="customer_phone">${phone}</td>
              <td class="customer_orders">${orders}</td>
              <td>
                  <button class="customer_edit_btn" onclick="customer_editCustomer(${newId})">Sửa</button>
                  <button class="customer_delete_btn" onclick="customer_deleteCustomer(${newId})">Xóa</button>
              </td>
          `;
      document.querySelector("#customer_table tbody").appendChild(newRow);
    } else {
      let row = document.getElementById("customer_" + customerEditingId);
      row.querySelector(".customer_name").innerText = name;
      row.querySelector(".customer_email").innerText = email;
      row.querySelector(".customer_phone").innerText = phone;
      row.querySelector(".customer_orders").innerText = orders;
    }

    customer_closeModal();
  };

  // Xóa khách hàng
  window.customer_deleteCustomer = function (id) {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      document.getElementById("customer_" + id).remove();
    }
  };

  // Sự kiện đóng modal khi nhấn vào dấu X hoặc bên ngoài modal
  document
    .querySelector(".customer_close")
    .addEventListener("click", customer_closeModal);
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("customer_modal")) {
      customer_closeModal();
    }
  });
});
// ===== Order =====
document.addEventListener("DOMContentLoaded", function () {
  let orderEditingId = null;
  let orderIdCounter = 2;

  // ======= MỞ / ĐÓNG MODAL =======
  function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  // Đóng modal khi nhấn vào nền tối
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("order_modal")) {
      closeModal(event.target.id);
    }
  });

  // ======= MỞ / ĐÓNG MODAL THÊM ĐƠN HÀNG =======
  window.order_openAddModal = function () {
    openModal("order_add_modal");
  };

  window.order_closeAddModal = function () {
    closeModal("order_add_modal");
  };

  // ======= MỞ / ĐÓNG MODAL CẬP NHẬT TRẠNG THÁI =======
  window.order_updateStatus = function (id) {
    orderEditingId = id;
    openModal("order_update_modal");
  };

  window.order_closeUpdateModal = function () {
    closeModal("order_update_modal");
  };

  // ======= THÊM ĐƠN HÀNG =======
  window.order_addOrder = function () {
    let customer = document.getElementById("order_customer_name").value;
    let product = document.getElementById("order_product_name").value;
    let total = document.getElementById("order_total_price").value;

    if (!customer || !product || !total) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    let table = document.getElementById("order_table").querySelector("tbody");
    let newRow = `<tr id="order_${orderIdCounter}">
                      <td>${orderIdCounter}</td>
                      <td class="order_customer">${customer}</td>
                      <td class="order_product">${product}</td>
                      <td class="order_total">${total}₫</td>
                      <td class="order_status">Chờ xác nhận</td>
                      <td>
                          <button class="order_update_btn" onclick="order_updateStatus(${orderIdCounter})">Cập nhật</button>
                          <button class="order_return_btn" onclick="order_processReturn(${orderIdCounter})">Hoàn trả</button>
                      </td>
                  </tr>`;
    table.insertAdjacentHTML("beforeend", newRow);
    orderIdCounter++;

    order_closeAddModal();
  };

  // ======= CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG =======
  window.order_saveStatus = function () {
    if (orderEditingId === null) return;

    let newStatus = document.getElementById("order_status_select").value;
    let row = document.getElementById("order_" + orderEditingId);
    row.querySelector(".order_status").innerText = newStatus;

    order_closeUpdateModal();
  };

  // ======= XỬ LÝ HOÀN TRẢ ĐƠN HÀNG =======
  window.order_processReturn = function (id) {
    let row = document.getElementById("order_" + id);
    let status = row.querySelector(".order_status").innerText;

    if (status !== "Đã giao") {
      alert("Chỉ có thể hoàn trả đơn hàng đã giao.");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn hoàn trả đơn hàng này?")) {
      row.querySelector(".order_status").innerText = "Hoàn trả";
      alert("Đơn hàng đã được xử lý hoàn trả.");
    }
  };
});
// ===== Revenue =====
document.addEventListener("DOMContentLoaded", function () {
  let revenueData = {
    day: 5000000,
    month: 150000000,
    year: 1800000000,
  };

  let chartInstance = null;

  // Cập nhật báo cáo khi thay đổi bộ lọc
  window.revenue_updateReport = function () {
    let filter = document.getElementById("revenue_time_filter").value;
    document.getElementById("revenue_total_value").innerText =
      revenueData[filter].toLocaleString();
    revenue_renderChart(filter);
  };

  // Vẽ biểu đồ doanh thu
  function revenue_renderChart(filter) {
    let labels, data;

    if (filter === "day") {
      labels = ["Sáng", "Trưa", "Chiều", "Tối"];
      data = [1000000, 1500000, 1200000, 1300000];
    } else if (filter === "month") {
      labels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
      data = [30000000, 40000000, 35000000, 45000000];
    } else {
      labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"];
      data = [150000000, 180000000, 160000000, 200000000];
    }

    let ctx = document.getElementById("revenue_chart").getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Doanh thu",
            data: data,
            backgroundColor: "#007bff",
          },
        ],
      },
    });
  }

  // Xuất báo cáo Excel
  window.revenue_exportExcel = function () {
    let data = [
      ["Thời gian", "Doanh thu"],
      ["Hôm nay", revenueData["day"]],
      ["Tháng này", revenueData["month"]],
      ["Năm nay", revenueData["year"]],
    ];

    let csvContent =
      "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");
    let link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "revenue_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Xuất báo cáo PDF
  window.revenue_exportPDF = function () {
    let printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Báo cáo doanh thu</title></head><body>`
    );
    printWindow.document.write(`<h2>Doanh thu theo thời gian</h2>`);
    printWindow.document.write(
      `<p>Hôm nay: ${revenueData["day"].toLocaleString()}₫</p>`
    );
    printWindow.document.write(
      `<p>Tháng này: ${revenueData["month"].toLocaleString()}₫</p>`
    );
    printWindow.document.write(
      `<p>Năm nay: ${revenueData["year"].toLocaleString()}₫</p>`
    );
    printWindow.document.write(`</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  // Hiển thị dữ liệu mặc định
  revenue_updateReport();
});
// ===== Staff =====
document.addEventListener("DOMContentLoaded", function () {
  let staffEditingId = null;
  let staffIdCounter = 2; // ID nhân viên mới

  // Mở modal chỉnh sửa nhân viên
  window.staff_editStaff = function (id) {
    staffEditingId = id;
    let row = document.getElementById("staff_" + id);

    document.getElementById("staff_edit_name").value =
      row.querySelector(".staff_name").innerText;
    document.getElementById("staff_edit_email").value =
      row.querySelector(".staff_email").innerText;
    document.getElementById("staff_edit_role").value =
      row.querySelector(".staff_role").innerText;

    document.getElementById("staff_edit_modal").style.display = "flex";
  };

  // Lưu chỉnh sửa nhân viên
  window.staff_saveEdit = function () {
    if (staffEditingId === null) return;

    let row = document.getElementById("staff_" + staffEditingId);
    row.querySelector(".staff_name").innerText =
      document.getElementById("staff_edit_name").value;
    row.querySelector(".staff_email").innerText =
      document.getElementById("staff_edit_email").value;
    row.querySelector(".staff_role").innerText =
      document.getElementById("staff_edit_role").value;
    row.querySelector(".staff_log").innerText =
      "Cập nhật lúc " + new Date().toLocaleTimeString();

    staff_closeModal();
  };

  // Mở modal thêm nhân viên
  window.staff_openAddModal = function () {
    document.getElementById("staff_add_modal").style.display = "flex";
  };

  // Thêm nhân viên mới
  window.staff_addStaff = function () {
    let name = document.getElementById("staff_add_name").value;
    let email = document.getElementById("staff_add_email").value;
    let role = document.getElementById("staff_add_role").value;

    let table = document.getElementById("staff_table").querySelector("tbody");
    let newRow = `<tr id="staff_${staffIdCounter}">
                      <td>${staffIdCounter}</td>
                      <td class="staff_name">${name}</td>
                      <td class="staff_email">${email}</td>
                      <td class="staff_role">${role}</td>
                      <td class="staff_log">Thêm mới lúc ${new Date().toLocaleTimeString()}</td>
                      <td>
                          <button class="staff_edit_btn" onclick="staff_editStaff(${staffIdCounter})">Sửa</button>
                          <button class="staff_delete_btn" onclick="staff_deleteStaff(${staffIdCounter})">Xóa</button>
                      </td>
                  </tr>`;
    table.insertAdjacentHTML("beforeend", newRow);
    staffIdCounter++;

    staff_closeAddModal();
  };

  // Đóng modal
  window.staff_closeModal = function () {
    document.getElementById("staff_edit_modal").style.display = "none";
  };

  window.staff_closeAddModal = function () {
    document.getElementById("staff_add_modal").style.display = "none";
  };
});
document.addEventListener("DOMContentLoaded", function () {
  let staffEditingId = null;
  let staffIdCounter = 2; // ID nhân viên mới

  // Mở modal chỉnh sửa nhân viên
  window.staff_editStaff = function (id) {
    staffEditingId = id;
    let row = document.getElementById("staff_" + id);

    document.getElementById("staff_edit_name").value =
      row.querySelector(".staff_name").innerText;
    document.getElementById("staff_edit_email").value =
      row.querySelector(".staff_email").innerText;
    document.getElementById("staff_edit_role").value =
      row.querySelector(".staff_role").innerText;

    document.getElementById("staff_edit_modal").style.display = "flex";
  };

  // Lưu chỉnh sửa nhân viên
  window.staff_saveEdit = function () {
    if (staffEditingId === null) return;

    let row = document.getElementById("staff_" + staffEditingId);
    row.querySelector(".staff_name").innerText =
      document.getElementById("staff_edit_name").value;
    row.querySelector(".staff_email").innerText =
      document.getElementById("staff_edit_email").value;
    row.querySelector(".staff_role").innerText =
      document.getElementById("staff_edit_role").value;
    row.querySelector(".staff_log").innerText =
      "Cập nhật lúc " + new Date().toLocaleTimeString();

    staff_closeModal();
  };

  // Mở modal thêm nhân viên
  window.staff_openAddModal = function () {
    document.getElementById("staff_add_modal").style.display = "flex";
  };

  // Thêm nhân viên mới
  window.staff_addStaff = function () {
    let name = document.getElementById("staff_add_name").value;
    let email = document.getElementById("staff_add_email").value;
    let role = document.getElementById("staff_add_role").value;

    let table = document.getElementById("staff_table").querySelector("tbody");
    let newRow = `<tr id="staff_${staffIdCounter}">
                      <td>${staffIdCounter}</td>
                      <td class="staff_name">${name}</td>
                      <td class="staff_email">${email}</td>
                      <td class="staff_role">${role}</td>
                      <td class="staff_log">Thêm mới lúc ${new Date().toLocaleTimeString()}</td>
                      <td>
                          <button class="staff_edit_btn" onclick="staff_editStaff(${staffIdCounter})">Sửa</button>
                          <button class="staff_delete_btn" onclick="staff_deleteStaff(${staffIdCounter})">Xóa</button>
                      </td>
                  </tr>`;
    table.insertAdjacentHTML("beforeend", newRow);
    staffIdCounter++;

    staff_closeAddModal();
  };

  // Xóa nhân viên
  window.staff_deleteStaff = function (id) {
    let row = document.getElementById("staff_" + id);
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      row.remove();
    }
  };

  // Đóng modal
  window.staff_closeModal = function () {
    document.getElementById("staff_edit_modal").style.display = "none";
  };

  window.staff_closeAddModal = function () {
    document.getElementById("staff_add_modal").style.display = "none";
  };
});
