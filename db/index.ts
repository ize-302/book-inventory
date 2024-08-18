import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import * as schema from "./schema";

const connectionString = process.env.NUXT_DATABASE_URL as string;

const client = postgres(connectionString);
export const db = drizzle(client);
