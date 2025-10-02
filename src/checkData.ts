import { initDb, db } from "./db/database";

const checkData = async () => {
  await initDb();

  // Fetch categories
  const categories = await db.all(
    "SELECT * FROM categories ORDER BY sortOrder"
  );
  console.log("=== Categories ===");
  console.table(categories);

  // Fetch subcategories
  const subcategories = await db.all(
    "SELECT * FROM subcategories ORDER BY sortOrder"
  );
  console.log("=== Subcategories ===");
  console.table(subcategories);

  // Fetch duas
  const duas = await db.all("SELECT * FROM duas ORDER BY sortOrder");
  console.log("=== Duas ===");
  console.table(duas);

  await db.close();
};

checkData();
