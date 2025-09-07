"use server"

import { db } from "@/lib/db"
import { leads, users } from "@/lib/db/schema"
import { eq, desc, ilike, and, count } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth-server"
import { revalidatePath } from "next/cache"

export async function getLeads(page: number = 1, limit: number = 20, search?: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const offset = (page - 1) * limit

  let whereConditions = []
  if (search) {
    whereConditions.push(
      ilike(leads.name, `%${search}%`)
    )
  }

  const [leadsData, totalCount] = await Promise.all([
    db
      .select({
        id: leads.id,
        name: leads.name,
        email: leads.email,
        phone: leads.phone,
        company: leads.company,
        status: leads.status,
        source: leads.source,
        value: leads.value,
        notes: leads.notes,
        tags: leads.tags,
        assignedTo: leads.assignedTo,
        createdAt: leads.createdAt,
        updatedAt: leads.updatedAt,
        assignedUser: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(leads)
      .leftJoin(users, eq(leads.assignedTo, users.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(leads.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(leads)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
  ])

  return {
    leads: leadsData,
    totalCount: totalCount[0].count,
    totalPages: Math.ceil(totalCount[0].count / limit),
    currentPage: page,
  }
}

export async function getLeadById(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const lead = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      company: leads.company,
      status: leads.status,
      source: leads.source,
      value: leads.value,
      notes: leads.notes,
      tags: leads.tags,
      assignedTo: leads.assignedTo,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
      assignedUser: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(leads)
    .leftJoin(users, eq(leads.assignedTo, users.id))
    .where(eq(leads.id, id))
    .limit(1)

  return lead[0] || null
}

export async function createLead(data: {
  name: string
  email: string
  phone?: string
  company?: string
  status?: string
  source?: string
  value?: number
  notes?: string
  tags?: string[]
}) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const newLead = await db
    .insert(leads)
    .values({
      ...data,
      assignedTo: user.id,
    })
    .returning()

  revalidatePath("/dashboard/leads")
  return newLead[0]
}

export async function updateLead(id: string, data: Partial<{
  name: string
  email: string
  phone: string
  company: string
  status: string
  source: string
  value: number
  notes: string
  tags: string[]
}>) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const updatedLead = await db
    .update(leads)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id))
    .returning()

  revalidatePath("/dashboard/leads")
  return updatedLead[0]
}

export async function deleteLead(id: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  await db.delete(leads).where(eq(leads.id, id))
  revalidatePath("/dashboard/leads")
}
