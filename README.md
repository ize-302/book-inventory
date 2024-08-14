# Book Inventory app

## Setup

1. Create a Postgresql database
2. Rename `env.sample` file to `.env` and update the `NUXT_DATABASE_URL` value
3. In your terminal, Run `npm install` to install dependency
4. Run `npm run db:generate` followed by `npm run db:push` to create the books table
5. Run `npm run seed` to populate the books table
6. Run `npm run dev` to start app in dev mode
