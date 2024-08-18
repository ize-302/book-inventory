module.exports = {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  driver: "turso",
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL,
  },
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
};