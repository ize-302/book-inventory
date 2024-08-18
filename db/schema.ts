import { pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const books = pgTable("books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  isbn: text("isbn").unique(),
  title: text("title"),
  genres: text("genres"),
  author: text("author"),
  publisher: text("publisher"),
  image: text("image"),
  description: text("description"),
  rating: text("rating"),
  language: text("language"),
  pages: text("pages"),
  likedPercent: text("likedPercent"),
  awards: text("awards"),
  created: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
});
