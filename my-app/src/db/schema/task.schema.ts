import { pgTable, varchar, boolean, timestamp, uuid } from "drizzle-orm/pg-core";


export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().unique().defaultRandom(), 
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    status: boolean().default(false).notNull(),
    urgent: boolean().default(false).notNull(),
    important: boolean().default(false).notNull(),
    authId: varchar().notNull(),
    createdAt: timestamp({withTimezone: true}).defaultNow(),
    updatedAt: timestamp({withTimezone: true}).defaultNow()
});
