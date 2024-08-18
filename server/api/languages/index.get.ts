import { books } from "~/db/schema";
import { db } from "~/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let q = query.q ?? "";

  let whereClause = sql`TRUE`;
  if (query) {
    whereClause = sql`${books.language} ILIKE ${`%${q}%`}`;
  }

  let result = await db
    .select({ language: books.language })
    .from(books)
    .where(whereClause)
    .groupBy(books.language)
    .orderBy(books.language)
    .limit(100);
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
