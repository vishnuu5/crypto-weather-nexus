"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Notification from "./Notification"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = useSelector((state) => state.notifications.items)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            CryptoWeather Nexus
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-blue-300">
              Dashboard
            </Link>
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center hover:text-blue-300">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-md shadow-lg z-10">
                  <Notification onClose={() => setIsOpen(false)} />
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block hover:text-blue-300">
              Dashboard
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="block hover:text-blue-300">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

