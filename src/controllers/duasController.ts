import { Request, Response } from "express";
import { db } from "../db/database";

// Interfaces for typing
export interface Category {
  id: number;
  name: string;
  image?: string;
  sortOrder?: number;
}

export interface Subcategory {
  id: number;
  categoryId: number;
  name: string;
  sortOrder?: number;
}

export interface Dua {
  id: number;
  subcategoryId: number;
  title: string;
  content?: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
  reference?: string;
  audio?: string;
  sortOrder?: number;
}

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories: Category[] = await db.all(
      "SELECT * FROM categories ORDER BY sortOrder ASC, id ASC"
    );
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Get subcategories by categoryId
export const getSubcategoriesByCategory = async (
  req: Request<{ categoryId: string }>,
  res: Response
) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  if (isNaN(categoryId))
    return res.status(400).json({ error: "Invalid category ID" });

  try {
    const subcategories: Subcategory[] = await db.all(
      "SELECT * FROM subcategories WHERE categoryId = ? ORDER BY sortOrder ASC, id ASC",
      [categoryId]
    );
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

// Get duas by subcategoryId
export const getDuasBySubcategory = async (
  req: Request<{ subcategoryId: string }>,
  res: Response
) => {
  const subcategoryId = parseInt(req.params.subcategoryId, 10);
  if (isNaN(subcategoryId))
    return res.status(400).json({ error: "Invalid subcategory ID" });

  try {
    const duas: Dua[] = await db.all(
      "SELECT * FROM duas WHERE subcategoryId = ? ORDER BY sortOrder ASC, id ASC",
      [subcategoryId]
    );
    res.json(duas);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch duas" });
  }
};

// Get single dua by ID
export const getSingleDua = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const dua: Dua | undefined = await db.get(
      "SELECT * FROM duas WHERE id = ?",
      [id]
    );
    if (!dua) return res.status(404).json({ error: "Dua not found" });
    res.json(dua);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dua" });
  }
};
