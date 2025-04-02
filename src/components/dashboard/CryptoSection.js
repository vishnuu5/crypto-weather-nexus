"use client"

import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { toggleFavoriteCrypto } from "@/redux/slices/favoritesSlice"
import Loading from "@/components/common/Loading"
import { formatCurrency, formatPercentage } from "@/utils/formatters"

export default function CryptoSection() {
  const { cryptos, loading, error } = useSelector((state) => state.crypto)
  const { favoriteCryptos } = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  const handleToggleFavorite = (cryptoId) => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Cryptocurrency</h2>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Cryptocurrency</h2>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>Error loading cryptocurrency data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Cryptocurrency</h2>

      {cryptos.length > 0 ? (
        <div className="space-y-4">
          {cryptos.map((crypto) => (
            <div key={crypto.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <Link href={`/crypto/${crypto.id}`} className="text-lg font-medium hover:text-blue-600">
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </Link>
                <button onClick={() => handleToggleFavorite(crypto.id)} className="text-gray-400 hover:text-yellow-500">
                  {favoriteCryptos.includes(crypto.id) ? (
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

              <div className="mt-2">
                <div className="text-2xl font-bold">{formatCurrency(crypto.current_price)}</div>
                <div
                  className={`text-sm ${crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatPercentage(crypto.price_change_percentage_24h)} (24h)
                </div>
                <p className="text-sm text-gray-500 mt-1">Market Cap: {formatCurrency(crypto.market_cap)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No cryptocurrency data available</p>
      )}
    </div>
  )
}

