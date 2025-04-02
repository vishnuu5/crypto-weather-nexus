"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function WeatherChart({ data }) {
  const [view, setView] = useState("temperature") // temperature, humidity, pressure

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  const chartData = data.map((item) => ({
    time: formatDate(item.dt),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
    pressure: item.main.pressure,
  }))

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setView("temperature")}
          className={`px-4 py-2 rounded-md ${view === "temperature" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          Temperature
        </button>
        <button
          onClick={() => setView("humidity")}
          className={`px-4 py-2 rounded-md ${view === "humidity" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          Humidity
        </button>
        <button
          onClick={() => setView("pressure")}
          className={`px-4 py-2 rounded-md ${view === "pressure" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          Pressure
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {view === "temperature" && (
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f59e0b"
                name="Temperature (°C)"
                activeDot={{ r: 8 }}
              />
            )}
            {view === "humidity" && (
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" activeDot={{ r: 8 }} />
            )}
            {view === "pressure" && (
              <Line type="monotone" dataKey="pressure" stroke="#10b981" name="Pressure (hPa)" activeDot={{ r: 8 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

