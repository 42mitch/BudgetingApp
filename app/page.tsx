"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { MobileNav } from "@/components/mobile-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardView } from "@/components/views/dashboard-view"
import { BudgetView } from "@/components/views/budget-view"
import { GoalsView } from "@/components/views/goals-view"
import { AnalyticsView } from "@/components/views/analytics-view"
import { AICoachView } from "@/components/views/ai-coach-view"

const views: Record<string, React.ComponentType> = {
  dashboard: DashboardView,
  budget: BudgetView,
  goals: GoalsView,
  analytics: AnalyticsView,
  "ai-coach": AICoachView,
}

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard")

  const ActiveView = views[activePage] || DashboardView

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader activePage={activePage} />
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-8 md:pb-8">
          <ActiveView />
        </main>
      </div>
      <MobileNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  )
}
