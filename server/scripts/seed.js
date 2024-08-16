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

await client.connect();
export const db = drizzle(client);

async function populateDb() {
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

  // fetch all existing books
  const existingBooks = await db.select({ isbn: books?.isbn }).from(books)
  const existingBooksIsbn = existingBooks.map(book => book.isbn)

  const insertIntoDatabase = async (book, index) => {
    if (existingBooksIsbn.includes(book.isbn)) {
      console.error(`skipped book ${index + 1}. Already exists`)
    } else if (!book.isbn) {
      console.error(`Skipped book at index ${index} due to missing ISBN`);
    } else {
      const response = await db.insert(books).values({
        isbn: book?.isbn,
        title: book?.title,
        author: book?.author,
        genres: book.genres,
        publisher: book?.publisher,
        image: book?.image,
        description: book?.description,
        rating: book?.rating,
        language: book?.language,
        pages: book?.pages,
        likedPercent: book?.likedPercent
      }).returning();

      if (response) {
        console.log(`Inserted book ${index + 1}`);
      }
    }
  }

  const res = await Promise.all(
    bookData.map((book, index) => insertIntoDatabase(book, index))
  );
  console.log(`Seeded ${res.length} books`);

  await client.end()
}

populateDb();



