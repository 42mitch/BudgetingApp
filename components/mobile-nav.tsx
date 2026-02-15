"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Wallet,
  Target,
  BarChart3,
  Bot,
} from "lucide-react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "goals", label: "Goals", icon: Target },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "ai-coach", label: "AI Coach", icon: Bot },
]

interface MobileNavProps {
  activePage: string
  onNavigate: (page: string) => void
}

export function MobileNav({ activePage, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-card" aria-label="Mobile navigation">
      <ul className="flex w-full" role="list">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id
          return (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex w-full flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
