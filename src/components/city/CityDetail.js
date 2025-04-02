"use client"

import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import WeatherChart from "./WeatherChart"

export default function CityDetail({ city, history }) {
  const router = useRouter()
  const { favoriteCities } = useSelector((state) => state.favorites)
  const isFavorite = favoriteCities.includes(city.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        {isFavorite && (
          <div className="flex items-center text-yellow-500">
            <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-sm">Favorite</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{city.name}</h1>
            <p className="text-gray-500">{city.sys.country}</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <div className="text-5xl font-bold">{Math.round(city.main.temp)}°C</div>
            <div className="ml-4">
              <p className="text-xl capitalize">{city.weather[0].description}</p>
              <p className="text-gray-500">Feels like {Math.round(city.main.feels_like)}°C</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Humidity</p>
            <p className="text-xl font-semibold">{city.main.humidity}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Wind Speed</p>
            <p className="text-xl font-semibold">{Math.round(city.wind.speed * 3.6)} km/h</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Pressure</p>
            <p className="text-xl font-semibold">{city.main.pressure} hPa</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Visibility</p>
            <p className="text-xl font-semibold">{(city.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Weather History</h2>
        {history.length > 0 ? (
          <WeatherChart data={history} />
        ) : (
          <p className="text-gray-500">No historical data available</p>
        )}
      </div>
    </div>
  )
}

