import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { loadNuxt } from 'nuxt';
import { books } from '../../db/schema.js'
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';

const { Client } = pkg;

await loadNuxt({ for: 'dev' });

const client = new Client({
  connectionString: process.env.NUXT_DATABASE_URL,
});

async function runSeed() {
  await client.connect();
  const db = drizzle(client);

  const parseCSV = async (filePath) => {
    const csvFile = fs.readFileSync(path.resolve(filePath), "utf8");
    return new Promise((resolve) => {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
      });
    });
  };

  const bookData = await parseCSV("server/scripts/books.csv");

  const insertIntoDatabase = async (book, index) => {
    if (!book.isbn) {
      console.error(`Skipping book at index ${index} due to missing ISBN`);
      return Promise.resolve();
    }
    const response = await db.insert(books).values({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      year: book.year,
      publisher: book.publisher,
      image: book.coverImg,
      description: book.description,
      rating: book.rating,
    }).returning();

    if (response) {
      console.log(`Inserted book ${index + 1}`);
    }
  }

  const res = await Promise.all(
    bookData.map((book, index) => insertIntoDatabase(book, index))
  );
  console.log(`Seeded ${res.length} books`);

  await client.end()
}

runSeed();



