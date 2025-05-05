document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal_overlay");
  const addButton = document.querySelector(".products button");
  const form = document.querySelector(".product_form");
  const updateBtn = form.querySelector(".update");
  const addBtn = form.querySelector(".add");
  let editingRow = null;

  // Mở modal
  addButton.addEventListener("click", () => {
    form.reset();
    editingRow = null;
    updateBtn.style.display = "none";
    addBtn.style.display = "inline-block";
    modal.classList.add("active");
  });

  // Đóng modal khi click overlay
  modalOverlay.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Thêm sản phẩm
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;

    const tbody = document.querySelector("tbody");
    const newRow = createRow(data);
    tbody.appendChild(newRow);
    modal.classList.remove("active");
  });

  // Cập nhật sản phẩm
  updateBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!editingRow) return;

    const data = getFormData();
    if (!data) return;

    const cells = editingRow.querySelectorAll("td");
    cells[0].innerHTML = `<div>${data.name}</div>`;
    cells[1].innerHTML = `<div>${data.price}đ</div>`;
    cells[2].innerHTML = `<div>${data.extraCosts}đ</div>`;
    cells[3].innerHTML = `<div>${data.profit}đ</div>`;
    cells[4].innerHTML = `<div>${data.type}</div>`;
    cells[5].innerHTML = `<div>${data.description}</div>`;

    modal.classList.remove("active");
  });

  // Xử lý nút Chỉnh sửa & Xóa
  document.querySelector("tbody").addEventListener("click", function (e) {
    const btn = e.target;
    const row = btn.closest("tr");

    if (btn.classList.contains("edit")) {
      editingRow = row;
      const cells = row.querySelectorAll("td");
      form.name.value = cells[0].innerText.trim();
      form.price.value = parseInt(cells[1].innerText);
      form.extraCosts.value = parseInt(cells[2].innerText);
      // form.profit.value = parseInt(cells[3].innerText);
      form.type.value = cells[4].innerText.trim();
      form.description.value = cells[5].innerText.trim();

      updateBtn.style.display = "inline-block";
      addBtn.style.display = "none";
      modal.classList.add("active");
    }

    if (btn.classList.contains("delete")) {
      if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        row.remove();
      }
    }
  });

  // Lấy dữ liệu từ form
  function getFormData() {
    const name = form.name.value.trim();
    const price = form.price.value.trim();
    const extraCosts = form.extraCosts.value.trim();
    const profit = price - extraCosts;
    // form.profit.value.trim();
    const type = form.type.value;
    const description = form.description.value.trim();

    if (!name || !price || !type) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return null;
    }

    return {
      name,
      price,
      extraCosts: extraCosts || "0",
      profit: profit || "0",
      type,
      description,
    };
  }

  // Tạo hàng mới trong bảng
  function createRow(data) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><div>${data.name}</div></td>
        <td><div>${data.price}đ</div></td>
        <td><div>${data.extraCosts}đ</div></td>
        <td><div>${data.profit}đ</div></td>
        <td><div>${data.type}</div></td>
        <td><div>${data.description}</div></td>
        <td>
          <div class="product_actions">
            <button class="edit">Chỉnh sửa</button>
            <button class="delete">Xóa</button>
          </div>
        </td>
      `;
    return tr;
  }
});
