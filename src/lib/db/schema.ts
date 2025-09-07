import { pgTable, text, timestamp, uuid, integer, boolean, json } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

// Better Auth required tables
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  image: text("image"),
  emailVerified: timestamp("email_verified"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const verificationTokens = pgTable("verification_tokens", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Leads table
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  status: text("status", { enum: ["new", "contacted", "responded", "converted"] }).notNull().default("new"),
  source: text("source"),
  value: integer("value"),
  notes: text("notes"),
  tags: json("tags").$type<string[]>().default([]),
  assignedTo: text("assigned_to"),
  campaignId: uuid("campaign_id"),
  lastContactDate: timestamp("last_contact_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status", { enum: ["draft", "active", "paused", "completed"] }).notNull().default("draft"),
  type: text("type", { enum: ["email", "social", "content", "paid", "event"] }).notNull(),
  budget: integer("budget"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  totalLeads: integer("total_leads").default(0),
  successfulLeads: integer("successful_leads").default(0),
  successRate: integer("success_rate").default(0), // percentage
  progress: integer("progress").default(0), // percentage
  metrics: json("metrics").$type<{
    impressions?: number
    clicks?: number
    conversions?: number
    cost?: number
  }>().default({}),
  createdBy: text("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Campaign leads junction table
export const campaignLeads = pgTable("campaign_leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  leadId: uuid("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["added", "contacted", "converted"] }).notNull().default("added"),
  addedAt: timestamp("added_at").defaultNow().notNull(),
})

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)

export const insertLeadSchema = createInsertSchema(leads)
export const selectLeadSchema = createSelectSchema(leads)

export const insertCampaignSchema = createInsertSchema(campaigns)
export const selectCampaignSchema = createSelectSchema(campaigns)

export const insertCampaignLeadSchema = createInsertSchema(campaignLeads)
export const selectCampaignLeadSchema = createSelectSchema(campaignLeads)

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert

export type Campaign = typeof campaigns.$inferSelect
export type NewCampaign = typeof campaigns.$inferInsert

export type CampaignLead = typeof campaignLeads.$inferSelect
export type NewCampaignLead = typeof campaignLeads.$inferInsert
