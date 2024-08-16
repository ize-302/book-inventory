CREATE TABLE IF NOT EXISTS "books" (
	"id" text PRIMARY KEY NOT NULL,
	"isbn" text DEFAULT '',
	"title" text DEFAULT '',
	"genres" text DEFAULT '',
	"author" text DEFAULT '',
	"publisher" text DEFAULT '',
	"image" text DEFAULT '',
	"description" text DEFAULT '',
	"rating" text DEFAULT '',
	"language" text DEFAULT '',
	"pages" text DEFAULT '',
	"likedPercent" text DEFAULT '',
	"createdAt" text DEFAULT (CURRENT_TIMESTAMP)
);
