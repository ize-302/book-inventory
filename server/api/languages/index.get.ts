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

  let result = await db.select({ language: books.language }).from(books);
  const allLanguages: string[] = [];
  let languages = result.map((row) => row.language);
  languages.map((language: string | null) => {
    if (language && !allLanguages.includes(language.replace(",", ""))) {
      allLanguages.push(language.replace(",", ""));
    }
  });

  let trimmedLanguagesArray: string[] = [];

  allLanguages
    .map((item) => item.split(";"))
    .map((items) => {
      items &&
        items.map((item: string) => {
          if (!trimmedLanguagesArray.includes(item.trim())) {
            trimmedLanguagesArray.push(item.trim());
          }
        });
    });

  const cleanedupLanguages: string[] = [];

  trimmedLanguagesArray.map((item) => {
    item = item.replace(/\s*\(.*?\)\s*/g, ""); // trim out words with parenthesis
    if (!cleanedupLanguages.includes(item)) {
      cleanedupLanguages.push(item);
    }
  });

  return cleanedupLanguages.sort((a, b) => a.localeCompare(b));
});
