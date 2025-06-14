import "dotenv/config";
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/db/schema",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL! || "postgres://ryan:12345@localhost:5432/ryan",
    },
    migrations: {
        table: 'my-migrations-table', // `__drizzle_migrations` by default
        schema: 'public', // used in PostgreSQL only, `drizzle` by default
    },
    verbose: true, // Enables detailed logging during Drizzle Kit operations.
    strict: true, // Enforces stricter schema validation during migration generation.
});