import pkg from "pg";
import { books } from "../../../db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

export default defineEventHandler(async (event) => {
  const { Client } = pkg;
  const client = new Client({
    connectionString: process.env.NUXT_DATABASE_URL,
  });
  await client.connect();
  const db = drizzle(client);

  let authors = await db
    .select({ author: books.author })
    .from(books)
    .groupBy(books.author)
    .orderBy(books.author);

  let trimmedAuthorsArray: string[] = [];

  authors
    .map((item) => item.author?.split(","))
    .map((items) => {
      items &&
        items.map((item: string) => {
          if (!trimmedAuthorsArray.includes(item.trim())) {
            trimmedAuthorsArray.push(item.trim());
          }
        });
    });

  let cleanedupAuthors: string[] = [];

  trimmedAuthorsArray.map((item) => {
    item = item.replace(/\s*\(.*?\)\s*/g, ""); // trim out words with parenthesis
    item = item.replace(/\s*\(.*?\s*/g, ""); // trim out words with only starting parenthesis
    item = item.replace(/\s*\.*?\)\s*/g, ""); // trim out words with only closing parenthesis
    if (!cleanedupAuthors.includes(item)) {
      cleanedupAuthors.push(item);
    }
  });

  const symbolRegex = /^[^a-zA-Z0-9]/;

  return cleanedupAuthors
    .filter((item) => !symbolRegex.test(item))
    .filter((item) => item)
    .sort((a, b) => a.localeCompare(b));
});
