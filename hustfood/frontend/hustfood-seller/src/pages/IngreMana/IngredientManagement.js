// IngredientManagement.js
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import IngredientsTable from "../../components/IngredientsTable/IngredientsTable";
import IngredientsFormModal from "../../components/IngredientsFormModal/IngredientsFormModal";
import {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../services/ingremanaService";
import "../../assets/ingremana.css";
// import { Navigate } from "react-router-dom";

const IngredientManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchIngredients = async () => {
    const response = await getAllIngredients();
    console.log("Fetched ingredients:", response);
    setIngredients(response.data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleAddIngredient = () => {
    setIsEditMode(false);
    setSelectedIngredient(null);
    setIsModalOpen(true);
  };

  const handleEditIngredient = (ingredient) => {
    setIsEditMode(true);
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const handleDeleteIngredient = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nguyên liệu này?");
    if (confirmDelete) {
      await deleteIngredient(id);
      fetchIngredients();
    }
  };

  const handleSubmit = async (ingredient) => {
    if (isEditMode) {
      await updateIngredient(ingredient.ingredientId, ingredient);
    } else {
      await createIngredient(ingredient);
    }
    setIsModalOpen(false);
    fetchIngredients();
  };

  return (
    <div className="admin-pageIM">
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
          onDelete={handleDeleteIngredient}
        />
      </div>

      <IngredientsFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        ingredient={selectedIngredient}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default IngredientManagement;
