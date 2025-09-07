"use server"

import { db } from "@/lib/db"
import { campaigns, users } from "@/lib/db/schema"
import { eq, desc, ilike, and, count } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth-server"
import { revalidatePath } from "next/cache"

export async function getCampaigns(page: number = 1, limit: number = 20, search?: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const offset = (page - 1) * limit

  let whereConditions = []
  if (search) {
    whereConditions.push(
      ilike(campaigns.name, `%${search}%`)
    )
  }

  const [campaignsData, totalCount] = await Promise.all([
    db
      .select({
        id: campaigns.id,
        name: campaigns.name,
        description: campaigns.description,
        status: campaigns.status,
        type: campaigns.type,
        budget: campaigns.budget,
        startDate: campaigns.startDate,
        endDate: campaigns.endDate,
        metrics: campaigns.metrics,
        createdBy: campaigns.createdBy,
        createdAt: campaigns.createdAt,
        updatedAt: campaigns.updatedAt,
        creator: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(campaigns)
      .leftJoin(users, eq(campaigns.createdBy, users.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(campaigns.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(campaigns)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
  ])

  return {
    campaigns: campaignsData,
    totalCount: totalCount[0].count,
    totalPages: Math.ceil(totalCount[0].count / limit),
    currentPage: page,
  }
}

export async function getCampaignById(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const campaign = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      description: campaigns.description,
      status: campaigns.status,
      type: campaigns.type,
      budget: campaigns.budget,
      startDate: campaigns.startDate,
      endDate: campaigns.endDate,
      metrics: campaigns.metrics,
      createdBy: campaigns.createdBy,
      createdAt: campaigns.createdAt,
      updatedAt: campaigns.updatedAt,
      creator: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(campaigns)
    .leftJoin(users, eq(campaigns.createdBy, users.id))
    .where(eq(campaigns.id, id))
    .limit(1)

  return campaign[0] || null
}

export async function createCampaign(data: {
  name: string
  description?: string
  status?: "draft" | "active" | "paused" | "completed"
  type: "email" | "social" | "content" | "paid" | "event"
  budget?: number
  startDate?: Date
  endDate?: Date
  metrics?: {
    impressions?: number
    clicks?: number
    conversions?: number
    cost?: number
  }
}) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const newCampaign = await db
    .insert(campaigns)
    .values({
      ...data,
      createdBy: user.id,
    })
    .returning()

  revalidatePath("/dashboard/campaigns")
  return newCampaign[0]
}

export async function updateCampaign(id: string, data: Partial<{
  name: string
  description: string
  status: string
  type: string
  budget: number
  startDate: Date
  endDate: Date
  metrics: {
    impressions?: number
    clicks?: number
    conversions?: number
    cost?: number
  }
}>) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const updatedCampaign = await db
    .update(campaigns)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(campaigns.id, id))
    .returning()

  revalidatePath("/dashboard/campaigns")
  return updatedCampaign[0]
}

export async function deleteCampaign(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  await db.delete(campaigns).where(eq(campaigns.id, id))
  revalidatePath("/dashboard/campaigns")
}
