import { NextResponse } from "next/server"
import { query } from "@/lib/db"

const USER_ID = 1

export async function GET() {
  try {
    const { rows } = await query<{
      category_id: number
      name: string
      color: string
      limit_amount: string
      spent: string
    }>(
      `SELECT c.category_id, c.name, c.color, b.limit_amount,
         COALESCE(SUM(ABS(t.amount)), 0)::DECIMAL(10,2) AS spent
       FROM category c
       JOIN budget b ON b.category_id = c.category_id AND b.user_id = c.user_id
       LEFT JOIN transaction t ON t.category_id = c.category_id AND t.user_id = c.user_id
       WHERE c.user_id = $1
       GROUP BY c.category_id, c.name, c.color, b.limit_amount
       ORDER BY c.category_id`,
      [USER_ID]
    )

    return NextResponse.json(
      rows.map((r) => ({
        id: String(r.category_id),
        name: r.name,
        color: r.color || "bg-primary",
        budget: parseFloat(r.limit_amount),
        spent: parseFloat(r.spent),
      }))
    )
  } catch (err) {
    console.error("GET /api/budget:", err)
    return NextResponse.json(
      { error: "Failed to load budgets" },
      { status: 500 }
    )
  }
}
