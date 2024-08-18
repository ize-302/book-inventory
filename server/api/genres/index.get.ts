import { books } from "~/db/schema";
import { db } from "~/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let q = query.q ?? "";

  let whereClause = sql`TRUE`;
  if (query) {
    whereClause = sql`${books.genres} ILIKE ${`%${q}%`}`;
  }

  let result = await db
    .select({ genres: books.genres })
    .from(books)
    .where(whereClause)
    .groupBy(books.genres)
    .orderBy(books.genres)
    .limit(100);
  let parsedResult = result.map(
    (item: { genres: string | null }) =>
      item.genres && JSON.parse(item.genres.replace(/'/g, '"'))
  );

  let giantArray: string[] = [];
  (parsedResult || []).map((items) => {
    (items || []).map((item: string) => {
      if (!giantArray.includes(item)) {
        giantArray.push(item);
      }
    });
  });

  return giantArray.filter((item) =>
    item.toLowerCase().includes(q.toString().toLowerCase())
  );
});
