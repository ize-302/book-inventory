import { books } from "~/db/schema";
import { db } from "~/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let q = query.q ?? "";

  let whereClause = sql`TRUE`;
  if (query) {
    whereClause = sql`${books.author} ILIKE ${`%${q}%`}`;
  }

  let authors = await db
    .select({ author: books.author })
    .from(books)
    .where(whereClause)
    .groupBy(books.author)
    .orderBy(books.author)
    .limit(100);

  let trimmedAuthorsArray: string[] = [];

  await authors
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
    .sort((a, b) => a.localeCompare(b))
    .filter((item) => item.toLowerCase().includes(q.toString().toLowerCase()));
});
