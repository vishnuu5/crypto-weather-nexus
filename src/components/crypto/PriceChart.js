"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function PriceChart({ data }) {
  const [timeRange, setTimeRange] = useState("7d") // 24h, 7d, 30d, 1y

  // Filter data based on selected time range
  const getFilteredData = () => {
    const now = Date.now()
    let timeFilter

    switch (timeRange) {
      case "24h":
        timeFilter = now - 24 * 60 * 60 * 1000
        break
      case "7d":
        timeFilter = now - 7 * 24 * 60 * 60 * 1000
        break
      case "30d":
        timeFilter = now - 30 * 24 * 60 * 60 * 1000
        break
      case "1y":
        timeFilter = now - 365 * 24 * 60 * 60 * 1000
        break
      default:
        timeFilter = now - 7 * 24 * 60 * 60 * 1000
    }

    return data.filter((item) => item[0] >= timeFilter)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    if (timeRange === "24h") {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    } else if (timeRange === "7d") {
      return date.toLocaleDateString(undefined, { weekday: "short" })
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
  }

  const chartData = getFilteredData().map((item) => ({
    date: formatDate(item[0]),
    price: item[1],
  }))

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setTimeRange("24h")}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === "24h" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          24h
        </button>
        <button
          onClick={() => setTimeRange("7d")}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === "7d" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          7d
        </button>
        <button
          onClick={() => setTimeRange("30d")}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === "30d" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          30d
        </button>
        <button
          onClick={() => setTimeRange("1y")}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === "1y" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          1y
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Price"]} />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              name="Price (USD)"
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

