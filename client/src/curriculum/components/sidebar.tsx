"use client"

import { motion } from "framer-motion"
import { BookOpen, Video, FileQuestion, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"
import { type ContentType } from "@/App"

interface SidebarProps {
  activeContent: ContentType
  setActiveContent: (content: ContentType) => void
  courseTitle: string
}

export function Sidebar({ activeContent, setActiveContent, courseTitle }: SidebarProps) {
  const menuItems = [
    {
      id: "read",
      label: "Read Content",
      icon: BookOpen,
    },
    {
      id: "video",
      label: "Watch Video",
      icon: Video,
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: FileQuestion,
    },
    {
      id: "tutor",
      label: "AI Tutor 🤖",
      icon: MessageSquareText,
    },
  ]

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
    >
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold text-gray-100">{courseTitle}</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeContent === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  // Reset scroll position when changing content
                  document.querySelector("main")?.scrollTo(0, 0)
                  setActiveContent(item.id as ContentType)
                }}
                className={cn(
                  "relative flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-all",
                  isActive ? "text-white" : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100",
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-lg bg-gray-800"
                    transition={{ 
                      type: "spring", 
                      stiffness: 380, 
                      damping: 30,
                      layout: { duration: 0.2 } 
                    }}
                  />
                )}
                <span className="relative flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </nav>
      </div>
    </motion.aside>
  )
}

