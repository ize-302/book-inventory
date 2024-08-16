import { pgTable, text } from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const books = pgTable("books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  isbn: text("isbn").default(""),
  title: text("title").default(""),
  genres: text("genres").default(""),
  author: text("author").default(""),
  publisher: text("publisher").default(""),
  image: text("image").default(""),
  description: text("description").default(""),
  rating: text("rating").default(""),
  language: text("language").default(""),
  pages: text("pages").default(""),
  likedPercent: text("likedPercent").default(""),
  created: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
});
