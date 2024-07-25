import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: uuid("user_id").primaryKey().unique().notNull(),
  first_name: varchar("first_name").notNull(),
  last_name: varchar("last_name").notNull(),
  phone: varchar("phone", { length: 256 }),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  role: varchar("role").$type<"user" | "admin">().default("user"),
  image: varchar("image"),
  has_accepted: boolean("has_accepted").default(false).notNull(),
  is_verified: boolean("is_verified").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;

export const categories = pgTable("categories", {
  category_id: uuid("category_id").primaryKey().unique().notNull(),
  title: varchar("title").notNull().unique(),
  description: varchar("description").notNull(),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export type Category = typeof categories.$inferSelect;

export const images = pgTable("images", {
  image_id: uuid("image_id").primaryKey().unique().notNull(),
  field_id: uuid("field_id").notNull(),
  image_url: varchar("image_url").notNull().unique(),
  image_name: varchar("image_name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export type Image = typeof images.$inferSelect;

export const events = pgTable("events", {
  event_id: uuid("event_id").primaryKey().unique().notNull(),
  title: varchar("title").notNull().unique(),
  description: varchar("description").notNull(),
  location: varchar("location").notNull(),
  date: timestamp("date").notNull(),
  normal_price: varchar("normal_price").notNull(),
  normal_ticket_amount: varchar("normal_ticket_amount").notNull(),
  vip_price: varchar("vip_price").notNull(),
  vip_ticket_amount: varchar("vip_ticket_amount").notNull().default("0"),
  user_id: uuid("user_id")
    .references(() => users.user_id)
    .notNull(),
  category_id: uuid("category_id")
    .references(() => categories.category_id)
    .notNull(),
  status: varchar("status")
    .$type<"active" | "archived">()
    .default("archived")
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export type Event = typeof events.$inferSelect;
