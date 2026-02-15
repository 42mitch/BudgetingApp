"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const suggestions = [
  "How can I save more this month?",
  "Am I on track with my goals?",
  "Where am I overspending?",
  "Tips for a student budget",
]

const aiResponses: Record<string, string> = {
  "How can I save more this month?":
    "Based on your spending data, here are 3 quick wins:\n\n1. **Meal prep on Sundays** - Your food spending is $342 this month. Prepping meals could cut that by 30%, saving you around $100.\n\n2. **Review subscriptions** - You have $45 in subscriptions. Consider sharing streaming accounts with roommates.\n\n3. **Use your campus resources** - Free gym, library events, and student discounts can replace paid entertainment.",
  "Am I on track with my goals?":
    "Let me check your goals progress:\n\n- **Emergency Fund**: 75% complete ($750/$1,000) - On track!\n- **Spring Break Trip**: 40% ($320/$800) - Needs attention. Try saving $120/week to hit your target.\n- **New Laptop**: 75% ($900/$1,200) - Almost there! Just $300 to go.\n\nOverall, 3 out of 5 goals are on track. Focus on your Spring Break Trip fund this month.",
  "Where am I overspending?":
    "Looking at your budget vs. actual spending:\n\n- **Shopping**: $310 spent of $300 budget - Over by $10!\n- **Food & Drink**: $342 of $400 - 85.5% used with half the month left.\n\nThe biggest concern is your Shopping category. Try implementing a 24-hour rule before any non-essential purchase over $20.",
  "Tips for a student budget":
    "Here are my top budgeting tips for students:\n\n1. **50/30/20 Rule** - 50% needs, 30% wants, 20% savings\n2. **Track every purchase** - Small purchases add up fast\n3. **Use student discounts** - Always ask! Many places offer 10-20% off\n4. **Cook in batches** - Save time and money\n5. **Sell old textbooks** - Recover some education costs\n\nYou're already doing great by tracking your spending here!",
}

export function AICoachView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey Alex! I'm your AI budget coach. I can help you understand your spending patterns, find ways to save, and stay on track with your financial goals. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response =
        aiResponses[text.trim()] ||
        "That's a great question! Based on your current financial data, I'd recommend reviewing your spending categories and identifying areas where you can cut back. Would you like me to analyze a specific category?"

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)]">
      {/* Suggestion chips */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Chat area */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <CardContent className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI coach a question..."
              className="flex-1"
              aria-label="Chat message"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
