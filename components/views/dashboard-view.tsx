"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingDown,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Coffee,
  ShoppingBag,
  BookOpen,
  Utensils,
  Repeat,
} from "lucide-react"

const transactions = [
  { id: 1, name: "Starbucks", category: "Food & Drink", amount: -5.75, date: "Today", icon: Coffee },
  { id: 2, name: "Amazon", category: "Shopping", amount: -32.99, date: "Today", icon: ShoppingBag },
  { id: 3, name: "Campus Bookstore", category: "Education", amount: -89.0, date: "Yesterday", icon: BookOpen },
  { id: 4, name: "Chipotle", category: "Food & Drink", amount: -12.45, date: "Yesterday", icon: Utensils },
  { id: 5, name: "Spotify", category: "Subscriptions", amount: -5.99, date: "Feb 12", icon: Repeat },
]

export function DashboardView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Balance
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$2,847.50</div>
            <div className="mt-1 flex items-center gap-1 text-sm text-success">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Spending
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$1,234.00</div>
            <div className="mt-1 flex items-center gap-1 text-sm text-destructive">
              <ArrowDownRight className="h-4 w-4" />
              <span>-8.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Goal Progress
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(152,60%,42%)]/10">
              <Target className="h-5 w-5 text-[hsl(152,60%,42%)]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3 of 5</div>
            <div className="mt-3">
              <Progress value={60} className="h-2" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">60% goals on track</p>
          </CardContent>
        </Card>
      </div>

      {/* Spending by Category + Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Spending by Category */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {[
                { name: "Food & Drink", amount: 342, budget: 400, color: "bg-primary" },
                { name: "Shopping", amount: 280, budget: 300, color: "bg-chart-2" },
                { name: "Education", amount: 189, budget: 200, color: "bg-chart-3" },
                { name: "Transport", amount: 120, budget: 150, color: "bg-chart-4" },
                { name: "Subscriptions", amount: 45, budget: 50, color: "bg-chart-5" },
              ].map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{cat.name}</span>
                    <span className="text-muted-foreground">
                      ${cat.amount} / ${cat.budget}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full ${cat.color} transition-all`}
                      style={{ width: `${(cat.amount / cat.budget) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y divide-border">
              {transactions.map((tx) => {
                const Icon = tx.icon
                return (
                  <div key={tx.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground">
                        {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
