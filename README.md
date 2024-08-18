# Book Inventory app

An inventory app with the ability to search over 50,000 books. Books can further be filtered based on authors, genres, languages and awards

[Demo](https://book-inventory-nuxt.vercel.app/)

## Stack

- Nuxt3
- NuxtUI
- Supabase with DrizzleORM

## Setup

1. Create a Postgresql database
2. Rename `env.sample` file to `.env` and update the `NUXT_DATABASE_URL` value
3. In your terminal, Run `npm install` to install dependency
4. Run `npm run db:generate` followed by `npm run db:push` to create the books table
5. Download this CSV [file](https://drive.google.com/file/d/11O_cLm5PU7Jfp7rHJ1ZAOLzobfp90oFA/view?usp=drive_link) and move it to the scripts folder afterwards
6. Run `npm run seed` to populate the books table
7. Run `npm run dev` to start app in dev mode
