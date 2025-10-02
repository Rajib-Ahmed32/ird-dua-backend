import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const dbPath = path.join(__dirname, "../../data/duas.db");

export let db: any;

export const initDb = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Main categories table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT,
      sortOrder INTEGER DEFAULT 0
    )
  `);

  // Subcategories table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS subcategories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoryId INTEGER NOT NULL,
      name TEXT NOT NULL,
      sortOrder INTEGER DEFAULT 0,
      FOREIGN KEY(categoryId) REFERENCES categories(id)
    )
  `);

  // Duas table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS duas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subcategoryId INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT, -- description (optional)
      arabic TEXT,  -- dua in Arabic
      transliteration TEXT, -- phonetic pronunciation
      translation TEXT, -- meaning in English (or other)
      reference TEXT, -- Quran/Hadith reference
      audio TEXT, -- optional audio file path
      sortOrder INTEGER DEFAULT 0,
      FOREIGN KEY(subcategoryId) REFERENCES subcategories(id)
    )
  `);

  // Faster queries
  await db.exec(
    `CREATE INDEX IF NOT EXISTS idx_subcategories_categoryId ON subcategories(categoryId)`
  );
  await db.exec(
    `CREATE INDEX IF NOT EXISTS idx_duas_subcategoryId ON duas(subcategoryId)`
  );

  console.log("SQLite database connected and all tables ensured.");
};
