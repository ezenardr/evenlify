import { defineConfig } from "drizzle-kit";

if (!process.env.NEXT_PUBLIC_DATABASE_URI)
  throw new Error("Database Connection string not found");

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URI,
    // host: process.env.NEXT_PUBLIC_DATABSE_HOST,
    // password: process.env.NEXT_PUBLIC_DATABSE_PASSWORD,
    // user: process.env.NEXT_PUBLIC_DATABSE_USER,
    // port: process.env.NEXT_PUBLIC_DATABSE_PORT,
    // database: process.env.NEXT_PUBLIC_DATABSE_NAME,
  },
});
