import { pgTable, varchar, boolean, timestamp, uuid } from "drizzle-orm/pg-core";


export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().unique().defaultRandom(), 
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    status: boolean().default(false).notNull(),
    urgent: boolean().default(false).notNull(),
    important: boolean().default(false).notNull(),
    auth0_sub: varchar().unique().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow()
});
