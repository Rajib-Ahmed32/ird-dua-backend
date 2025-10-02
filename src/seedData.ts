import { initDb, db } from "./db/database";
import fs from "fs";
import path from "path";

// JSON paths
const categoriesPath = path.join(__dirname, "../data/categories.json");
const subcategoriesPath = path.join(__dirname, "../data/subcategories.json");
const duasPath = path.join(__dirname, "../data/duas.json");

const seed = async () => {
  try {
    // Initialize database
    await initDb();

    // Remove old data
    await db.exec("DELETE FROM duas");
    await db.exec("DELETE FROM subcategories");
    await db.exec("DELETE FROM categories");

    console.log("Old data cleared.");

    // Read JSON files
    const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
    const subcategories = JSON.parse(
      fs.readFileSync(subcategoriesPath, "utf-8")
    );
    const duas = JSON.parse(fs.readFileSync(duasPath, "utf-8"));

    // Seed categories
    for (const c of categories) {
      await db.run(
        `INSERT INTO categories (id, name, image, sortOrder) VALUES (?, ?, ?, ?)`,
        [c.id, c.name, c.image, c.sortOrder]
      );
    }

    console.log("Categories seeded.");

    // Seed subcategories
    for (const sc of subcategories) {
      await db.run(
        `INSERT INTO subcategories (id, categoryId, name, sortOrder) VALUES (?, ?, ?, ?)`,
        [sc.id, sc.categoryId, sc.name, sc.sortOrder]
      );
    }

    console.log("Subcategories seeded.");

    // Seed duas
    for (const d of duas) {
      await db.run(
        `INSERT INTO duas (subcategoryId, title, content, arabic, transliteration, translation, reference, audio, sortOrder)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.subcategoryId,
          d.title,
          d.content,
          d.arabic,
          d.transliteration,
          d.translation,
          d.reference,
          d.audio,
          d.sortOrder,
        ]
      );
    }

    console.log(`Duas seeded (${duas.length} entries).`);

    // Close DB
    await db.close();
    console.log("Database connection closed. Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
};

seed();
