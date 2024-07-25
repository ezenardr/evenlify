import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, database } from "@/database/databaseConnection";

async function main() {
  await migrate(database, { migrationsFolder: "./drizzle" });
  await client.end();
  return;
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
