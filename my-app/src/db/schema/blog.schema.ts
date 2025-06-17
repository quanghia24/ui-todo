import { pgTable, uuid, varchar, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const posts = pgTable(
    "posts", 
    {
        id: uuid("id").primaryKey().unique().defaultRandom(),
        title: varchar("title").notNull(),
        description: varchar("description").notNull(),
        authId: varchar("authId").notNull(),
        createdAt: timestamp("createdAt", {withTimezone: true}).defaultNow(),
        updatedAt: timestamp("updatedAt", {withTimezone: true}).defaultNow()
    },
)

// create by admin
export const categories = pgTable(
    "categories", 
    {
        id: uuid("id").primaryKey().unique().defaultRandom(),
        name: varchar("name").notNull(),
    },
)

// junction table for posts and categories
export const postCategories = pgTable(
    "post_categoris", 
    {
        postId: uuid("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
        categoryId: uuid("categoryId").notNull().references(() => categories.id, { onDelete: "cascade" }),
        createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    },
    // Composite primary key
    (table) => ({
        pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    })
)
