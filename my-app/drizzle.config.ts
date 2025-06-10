import "dotenv/config";
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/db/schema",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url:"postgres://ryan:12345@localhost:5432/superb-todo",
        // host: process.env.DB_HOST!,
        // port: parseInt(process.env.DB_PORT_NO!),
        // user: process.env.DB_USERNAME!,
        // password: process.env.DB_PASSWORD!,
        // database: process.env.DB_NAME!,
        // ssl: "require",
    },
    migrations: {
        table: 'my-migrations-table', // `__drizzle_migrations` by default
        schema: 'public', // used in PostgreSQL only, `drizzle` by default
    },
    verbose: true, // Enables detailed logging during Drizzle Kit operations.
    strict: true, // Enforces stricter schema validation during migration generation.
});