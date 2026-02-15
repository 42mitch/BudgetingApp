"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Pencil, Check, X } from "lucide-react"

interface BudgetCategory {
  id: string
  name: string
  spent: number
  budget: number
  color: string
}

const initialCategories: BudgetCategory[] = [
  { id: "1", name: "Food & Drink", spent: 342, budget: 400, color: "bg-primary" },
  { id: "2", name: "Shopping", spent: 310, budget: 300, color: "bg-chart-2" },
  { id: "3", name: "Education", spent: 189, budget: 200, color: "bg-chart-3" },
  { id: "4", name: "Transport", spent: 120, budget: 150, color: "bg-chart-4" },
  { id: "5", name: "Subscriptions", spent: 45, budget: 50, color: "bg-chart-5" },
  { id: "6", name: "Entertainment", spent: 95, budget: 100, color: "bg-primary" },
  { id: "7", name: "Health", spent: 30, budget: 75, color: "bg-chart-2" },
  { id: "8", name: "Utilities", spent: 60, budget: 80, color: "bg-chart-3" },
]

export function BudgetView() {
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const startEdit = (cat: BudgetCategory) => {
    setEditingId(cat.id)
    setEditValue(cat.budget.toString())
  }

  const saveEdit = (id: string) => {
    const newBudget = parseFloat(editValue)
    if (!isNaN(newBudget) && newBudget > 0) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, budget: newBudget } : c))
      )
    }
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0)
  const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-bold text-foreground">${totalBudget.toFixed(0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold text-foreground">${totalSpent.toFixed(0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className={`text-2xl font-bold ${totalBudget - totalSpent >= 0 ? "text-[hsl(152,60%,42%)]" : "text-destructive"}`}>
              ${(totalBudget - totalSpent).toFixed(0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Budget Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            {categories.map((cat) => {
              const percentage = Math.min((cat.spent / cat.budget) * 100, 100)
              const isOverBudget = cat.spent > cat.budget
              const isEditing = editingId === cat.id

              return (
                <div key={cat.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{cat.name}</span>
                      {isOverBudget && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                          <AlertTriangle className="h-3 w-3" />
                          Over budget
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">${cat.spent} /</span>
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-7 w-20 text-sm"
                            type="number"
                            min="1"
                            aria-label={`Budget for ${cat.name}`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(cat.id)
                              if (e.key === "Escape") cancelEdit()
                            }}
                          />
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => saveEdit(cat.id)} aria-label="Save">
                            <Check className="h-4 w-4 text-[hsl(152,60%,42%)]" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={cancelEdit} aria-label="Cancel">
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">
                            ${cat.spent} / ${cat.budget}
                          </span>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEdit(cat)} aria-label={`Edit budget for ${cat.name}`}>
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all ${isOverBudget ? "bg-destructive" : cat.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
