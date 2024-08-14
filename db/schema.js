import { pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const books = pgTable("books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  isbn: text("isbn"),
  title: text("title"),
  author: text("author"),
  year: text("year"),
  publisher: text("publisher"),
  image: text("image"),
  description: text("description"),
  rating: text("rating"),
  created: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
});
