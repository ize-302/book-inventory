CREATE TABLE IF NOT EXISTS "books" (
	"id" text PRIMARY KEY NOT NULL,
	"isbn" text,
	"title" text,
	"author" text,
	"year" text,
	"publisher" text,
	"image" text,
	"description" text,
	"rating" text,
	"createdAt" text DEFAULT (CURRENT_TIMESTAMP)
);
