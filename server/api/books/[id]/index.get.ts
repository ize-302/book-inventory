import { eq } from "drizzle-orm";
import { books } from "~/db/schema";
import { db } from "~/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  let [result] = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return result;
});
