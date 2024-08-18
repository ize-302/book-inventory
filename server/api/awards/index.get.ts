import { books } from "~/db/schema";
import { db } from "~/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let q = query.q ?? "";

  let whereClause = sql`TRUE`;
  if (query) {
    whereClause = sql`${books.awards} ILIKE ${`%${q}%`}`;
  }

  let result = await db
    .select({ awards: books.awards })
    .from(books)
    .where(whereClause)
    .groupBy(books.awards)
    .orderBy(books.awards)
    .limit(500);

  let trimmedAwardsArray: string[] = [];

  await result
    .map((item) => item.awards?.split(","))
    .map((items) => {
      items &&
        items.map((item: string) => {
          if (!trimmedAwardsArray.includes(item.trim())) {
            trimmedAwardsArray.push(item.trim());
          }
        });
    });

  let cleanedupAwards: string[] = [];

  trimmedAwardsArray.map((item) => {
    item = item.replace(/\s*\(.*?\)\s*/g, ""); // trim out words with parenthesis
    item = item.replace(/\s*\(.*?\s*/g, ""); // trim out words with only starting parenthesis
    item = item.replace(/\s*\.*?\)\s*/g, ""); // trim out words with only closing parenthesis
    item = item.replace(/\]/g, "");
    item = item.replace(/\']/g, "");
    item = item.replace(/\['/g, "");
    item = item.replace(/\["/g, "");
    item = item.replace(/\"/g, "");
    item = item.replace(/\'/g, "");
    if (!cleanedupAwards.includes(item)) {
      cleanedupAwards.push(item);
    }
  });

  const symbolRegex = /^[^a-zA-Z0-9]/;

  return cleanedupAwards
    .filter((item) => !symbolRegex.test(item))
    .filter((item) => item)
    .sort((a, b) => a.localeCompare(b))
    .filter((item) => item.toLowerCase().includes(q.toString().toLowerCase()));
});
