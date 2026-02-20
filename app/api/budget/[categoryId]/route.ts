import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

const USER_ID = 1

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await context.params
    const categoryIdNum = parseInt(categoryId, 10)
    if (!Number.isInteger(categoryIdNum) || categoryIdNum < 1) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const limitAmount = typeof body?.limit_amount === "number"
      ? body.limit_amount
      : parseFloat(body?.limit_amount)
    if (typeof limitAmount !== "number" || !Number.isFinite(limitAmount) || limitAmount <= 0) {
      return NextResponse.json(
        { error: "limit_amount must be a positive number" },
        { status: 400 }
      )
    }

    const { rows, rowCount } = await query<{
      budget_id: number
      category_id: number
      limit_amount: string
      time_period: string
    }>(
      `UPDATE budget
       SET limit_amount = $1
       WHERE category_id = $2 AND user_id = $3
       RETURNING budget_id, category_id, limit_amount, time_period`,
      [limitAmount, categoryIdNum, USER_ID]
    )

    if (rowCount === 0) {
      return NextResponse.json(
        { error: "Budget not found for this category and user" },
        { status: 404 }
      )
    }

    const row = rows[0]
    return NextResponse.json({
      budget_id: row.budget_id,
      category_id: row.category_id,
      limit_amount: parseFloat(row.limit_amount),
      time_period: row.time_period,
    })
  } catch (err) {
    console.error("PATCH /api/budget/[categoryId]:", err)
    return NextResponse.json(
      { error: "Failed to update budget" },
      { status: 500 }
    )
  }
}
