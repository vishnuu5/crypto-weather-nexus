"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import WeatherSection from "@/components/dashboard/WeatherSection"
import CryptoSection from "@/components/dashboard/CryptoSection"
import NewsSection from "@/components/dashboard/NewsSection"
import { fetchWeatherData } from "@/redux/slices/weatherSlice"
import { fetchCryptoData } from "@/redux/slices/cryptoSlice"
import { fetchNewsData } from "@/redux/slices/newsSlice"
import { initializeWebSocket } from "@/lib/websocket"

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize data fetching
    dispatch(fetchWeatherData())
    dispatch(fetchCryptoData())
    dispatch(fetchNewsData())

    // Initialize WebSocket connection
    const cleanup = initializeWebSocket()

    // Set up periodic data refresh (every 60 seconds)
    const intervalId = setInterval(() => {
      dispatch(fetchWeatherData())
      dispatch(fetchCryptoData())
      dispatch(fetchNewsData())
    }, 60000)

    // Clean up on component unmount
    return () => {
      clearInterval(intervalId)
      cleanup()
    }
  }, [dispatch])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">CryptoWeather Nexus Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherSection />
        <CryptoSection />
        <NewsSection />
      </div>
    </div>
  )
}

