"use client"

import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import PriceChart from "./PriceChart"
import { formatCurrency, formatPercentage, formatNumber } from "@/utils/formatters"

export default function CryptoDetail({ crypto, details }) {
  const router = useRouter()
  const { favoriteCryptos } = useSelector((state) => state.favorites)
  const isFavorite = favoriteCryptos.includes(crypto.id)

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
            <h1 className="text-3xl font-bold">{crypto.name}</h1>
            <p className="text-gray-500">{crypto.symbol.toUpperCase()}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="text-4xl font-bold">{formatCurrency(crypto.current_price)}</div>
            <div className={`text-sm ${crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatPercentage(crypto.price_change_percentage_24h)} (24h)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Market Cap</p>
            <p className="text-xl font-semibold">{formatCurrency(crypto.market_cap)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Volume (24h)</p>
            <p className="text-xl font-semibold">{formatCurrency(crypto.total_volume)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">Circulating Supply</p>
            <p className="text-xl font-semibold">
              {formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-500 text-sm">All-Time High</p>
            <p className="text-xl font-semibold">{formatCurrency(crypto.ath)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Price History</h2>
        {details.prices ? (
          <PriceChart data={details.prices} />
        ) : (
          <p className="text-gray-500">No price history available</p>
        )}
      </div>

      {details.description && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">About {crypto.name}</h2>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: details.description.en }} />
        </div>
      )}
    </div>
  )
}

