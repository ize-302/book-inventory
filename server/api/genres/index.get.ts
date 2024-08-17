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

  let result = await db.select({ genres: books.genres }).from(books);
  let parsedResult = result.map(
    (item: { genres: string | null }) =>
      item.genres && JSON.parse(item.genres.replace(/'/g, '"'))
  );
  let giantArray: string[] = [];
  (parsedResult || []).map((items) => {
    items.map((item: string) => {
      if (!giantArray.includes(item)) {
        giantArray.push(item);
      }
    });
  });

  return giantArray.sort((a, b) => a.localeCompare(b));
});
