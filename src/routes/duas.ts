import express from "express";
import {
  getCategories,
  getSubcategoriesByCategory,
  getDuasBySubcategory,
  getSingleDua,
} from "../controllers/duasController";

const router = express.Router();

// Main categories
router.get("/categories", getCategories);

// Subcategories for a category
router.get("/categories/:categoryId/subcategories", getSubcategoriesByCategory);

// Duas for a subcategory
router.get("/subcategories/:subcategoryId/duas", getDuasBySubcategory);

// Single dua
router.get("/duas/:id", getSingleDua);

export default router;
