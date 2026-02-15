"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  budget: "Budget",
  goals: "Goals",
  analytics: "Analytics",
  "ai-coach": "AI Coach",
}

interface DashboardHeaderProps {
  activePage: string
}

export function DashboardHeader({ activePage }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:px-8 md:py-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">
          {pageTitles[activePage] || "Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground hidden md:block">
          Welcome back, Alex
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
