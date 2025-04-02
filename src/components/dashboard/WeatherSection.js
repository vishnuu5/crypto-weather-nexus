"use client"

import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { toggleFavoriteCity } from "@/redux/slices/favoritesSlice"
import Loading from "@/components/common/Loading"

export default function WeatherSection() {
  const { cities, loading, error } = useSelector((state) => state.weather)
  const { favoriteCities } = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  const handleToggleFavorite = (cityId) => {
    dispatch(toggleFavoriteCity(cityId))
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Weather</h2>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Weather</h2>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>Error loading weather data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>

      {cities.length > 0 ? (
        <div className="space-y-4">
          {cities.map((city) => (
            <div key={city.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <Link href={`/city/${city.id}`} className="text-lg font-medium hover:text-blue-600">
                  {city.name}
                </Link>
                <button onClick={() => handleToggleFavorite(city.id)} className="text-gray-400 hover:text-yellow-500">
                  {favoriteCities.includes(city.id) ? (
                    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mt-2 flex items-center">
                <div className="text-3xl font-bold">{Math.round(city.main.temp)}°C</div>
                <div className="ml-4">
                  <p className="capitalize">{city.weather[0].description}</p>
                  <p className="text-sm text-gray-500">
                    Humidity: {city.main.humidity}% | Wind: {Math.round(city.wind.speed * 3.6)} km/h
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No weather data available</p>
      )}
    </div>
  )
}

