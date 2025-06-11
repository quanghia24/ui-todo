// Database schema definitions

import { relations } from "drizzle-orm";
import { varchar, pgTable, uuid, uniqueIndex } from "drizzle-orm/pg-core"
// import { createSelectSchema, createInsertSchema } from "drizzle-zod"

import { tasks } from "./task.schema";

export const users = pgTable(
    "users", 
    {
        id: uuid().primaryKey().unique().defaultRandom(),
        name: varchar().notNull(),
        email: varchar().unique().notNull(),
        password: varchar().notNull(),
    },
);

export const usersRelation = relations(users, ({ many }) => ({
    tasks: many(tasks),
}));

// export const UserSelectSchema = createSelectSchema(users)
// export const UserInsertSchema = createInsertSchema(users).pick({
//     name: true,
//     email: true,
//     password: true,
// }); 

// export const UpdateUserSchema = createInsertSchema(users).partial().pick({
//     name: true,
//     email: true,
//     password: true,
// });