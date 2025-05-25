import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import IngredientsTable from "../../components/IngredientsTable/IngredientsTable";
import IngredientsFormModal from "../../components/IngredientsFormModal/IngredientsFormModal";
import {
  getIngredients,
  createIngredient,
  updateIngredient
} from "../../services/ingremanaService";
import "../../assets/ingremana.css";

const IngredientsManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const fetchIngredients = async () => {
    try {
      const data = await getIngredients();
      setIngredients(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách nguyên liệu:", error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleAddIngredient = () => {
    setSelectedIngredient(null);
    setShowFormModal(true);
  };

  const handleEditIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setShowFormModal(true);
  };

//   const handleDeleteIngredient = async (id) => {
//     try {
//       await deleteIngredient(id);
//       fetchIngredients();
//     } catch (error) {
//       console.error("Lỗi khi xoá nguyên liệu:", error);
//     }
//   };

  const handleSaveIngredient = async (formData) => {
    try {
      if (selectedIngredient) {
        await updateIngredient(selectedIngredient.id, formData);
      } else {
        await createIngredient(formData);
      }
      setShowFormModal(false);
      fetchIngredients();
    } catch (error) {
      console.error("Lỗi khi lưu nguyên liệu:", error);
    }
  };

  return (
    <div className="admin-page">
      <input type="checkbox" id="navbar-toggle" style={{ display: "none" }} />
      <label htmlFor="navbar-toggle" className="body-label"></label>
      <Navbar />
      <div className="main-content">
        <Header />
        <section className="ingredients">
          <h2>Danh sách nguyên liệu</h2>
          <button id="addIngredientBtn" onClick={handleAddIngredient}>
            Thêm nguyên liệu
          </button>
        </section>
        <IngredientsTable
          ingredients={ingredients}
          onEdit={handleEditIngredient}
        //   onDelete={handleDeleteIngredient}
        />
      </div>

      <IngredientsFormModal
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        ingredient={selectedIngredient}
        onSave={handleSaveIngredient}
      />
    </div>
  );
};

export default IngredientsManagement;
