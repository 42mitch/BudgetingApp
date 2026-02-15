"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Wallet,
  Target,
  BarChart3,
  Bot,
  GraduationCap,
} from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "goals", label: "Goals", icon: Target },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "ai-coach", label: "AI Coach", icon: Bot },
]

interface SidebarNavProps {
  activePage: string
  onNavigate: (page: string) => void
}

export function SidebarNav({ activePage, onNavigate }: SidebarNavProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-sidebar-accent-foreground tracking-tight">
          BudgetBuddy
        </span>
      </div>
      <nav className="flex-1 px-3 py-4" aria-label="Main navigation">
        <ul className="flex flex-col gap-1" role="list">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="rounded-lg bg-sidebar-accent px-4 py-3">
          <p className="text-xs font-medium text-sidebar-accent-foreground">
            Free Plan
          </p>
          <p className="mt-1 text-xs text-sidebar-foreground">
            Upgrade for unlimited AI coaching
          </p>
        </div>
      </div>
    </aside>
  )
}
