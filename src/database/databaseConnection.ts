import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

const CONNECTION_STRING = process.env.NEXT_PUBLIC_DATABASE_URI ?? "";

export const client = new Pool({
  connectionString: CONNECTION_STRING,
});
export const database = drizzle(client, { schema });
