import pkg from "pg";
import { books } from "../../../../db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { Client } = pkg;
  const client = new Client({
    connectionString: process.env.NUXT_DATABASE_URL,
  });

  const id = getRouterParam(event, "id");

  await client.connect();
  const db = drizzle(client);

  let [result] = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return result;
});
