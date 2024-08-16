import pkg from "pg";
import { books } from "../../../db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { and, desc, like, count, asc, sql } from "drizzle-orm";

const ITEMS_PER_PAGE = 30;

export default defineEventHandler(async (event) => {
  const { Client } = pkg;
  const client = new Client({
    connectionString: process.env.NUXT_DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client);

  const query = getQuery(event);

  let q = query.q ?? "";
  let languages = query.languages ?? "";
  let authors = query.authors ?? "";
  let genres = query.genres ?? "";
  let page = Math.max(1, Number(query.page) || 1);

  let whereClause = sql`TRUE`;
  if (query) {
    whereClause = sql`${books.title} ILIKE ${`%${q}%`}`;
  }

  if (authors) {
    const authorsArray = authors.toString().split(",");
    let authorsConditions = authorsArray.map(
      (author) => sql`${books.author} ILIKE ${`%${author}%`}`
    );
    whereClause = sql`${whereClause} AND (${sql.join(
      authorsConditions,
      sql` OR `
    )})`;
  }

  if (languages) {
    const languagesArray = languages.toString().split(",");
    let languagesConditions = languagesArray.map(
      (language) => sql`${books.language} ILIKE ${`%${language}%`}`
    );
    whereClause = sql`${whereClause} AND (${sql.join(
      languagesConditions,
      sql` OR `
    )})`;
  }

  if (genres) {
    const genresArray = genres.toString().split(",");
    let genresConditions = genresArray.map(
      (genre) => sql`${books.genres} ILIKE ${`%${genre}%`}`
    );
    whereClause = sql`${whereClause} AND (${sql.join(
      genresConditions,
      sql` OR `
    )})`;
  }

  let countResult = await db
    .select({ total: count() })
    .from(books)
    .where(whereClause);

  let totalItems = Number(countResult[0].total);
  let totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  let currentPage = Math.min(page, totalPages);
  let offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let result = await db
    .select()
    .from(books)
    .where(whereClause)
    .orderBy(asc(books.title))
    .offset(offset)
    .limit(ITEMS_PER_PAGE);

  return {
    items: result,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
    },
  };
});
