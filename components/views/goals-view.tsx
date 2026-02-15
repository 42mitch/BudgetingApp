"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Goal {
  id: string
  name: string
  current: number
  target: number
  icon: string
  color: string
}

const goals: Goal[] = [
  { id: "1", name: "Emergency Fund", current: 750, target: 1000, icon: "shield", color: "hsl(217, 91%, 60%)" },
  { id: "2", name: "Spring Break Trip", current: 320, target: 800, icon: "plane", color: "hsl(168, 64%, 43%)" },
  { id: "3", name: "New Laptop", current: 900, target: 1200, icon: "laptop", color: "hsl(262, 52%, 55%)" },
  { id: "4", name: "Textbooks Fund", current: 200, target: 400, icon: "book", color: "hsl(38, 92%, 50%)" },
  { id: "5", name: "Summer Housing", current: 1500, target: 3000, icon: "home", color: "hsl(0, 72%, 51%)" },
]

function ProgressRing({
  percentage,
  color,
  size = 100,
  strokeWidth = 8,
}: {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="shrink-0" aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--secondary))"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-500"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground text-base font-bold"
      >
        {percentage}%
      </text>
    </svg>
  )
}

export function GoalsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Track your savings progress and hit your financial targets.
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Goal</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100)
          return (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">{goal.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col items-center gap-4 pt-2">
                <ProgressRing percentage={percentage} color={goal.color} />
                <div className="w-full text-center">
                  <p className="text-lg font-bold text-foreground">
                    ${goal.current.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      of ${goal.target.toLocaleString()}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ${(goal.target - goal.current).toLocaleString()} remaining
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
