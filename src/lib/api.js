import axios from "axios"

// Weather API
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "your_openweather_api_key"
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5"

// Crypto API
const CRYPTO_API_BASE_URL = "https://api.coingecko.com/api/v3"

// News API
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY || "your_newsdata_api_key"
const NEWS_API_BASE_URL = "https://newsdata.io/api/1/news"

// Weather API functions
export const fetchWeatherForCities = async (cityIds) => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE_URL}/group`, {
      params: {
        id: cityIds.join(","),
        units: "metric",
        appid: WEATHER_API_KEY,
      },
    })
    return response.data.list
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

export const fetchCityHistory = async (cityId) => {
  try {
    // For demo purposes, we'll simulate historical data
    // In a real app, you would use a proper API endpoint
    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast`, {
      params: {
        id: cityId,
        units: "metric",
        appid: WEATHER_API_KEY,
      },
    })
    return response.data.list
  } catch (error) {
    console.error("Error fetching city history:", error)
    throw error
  }
}

// Crypto API functions
export const fetchCryptos = async (cryptoIds) => {
  try {
    const response = await axios.get(`${CRYPTO_API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        ids: cryptoIds.join(","),
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching crypto data:", error)
    throw error
  }
}

export const fetchCryptoHistory = async (cryptoId) => {
  try {
    // Fetch price history
    const priceResponse = await axios.get(`${CRYPTO_API_BASE_URL}/coins/${cryptoId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: 365,
        interval: "daily",
      },
    })

    // Fetch additional details
    const detailsResponse = await axios.get(`${CRYPTO_API_BASE_URL}/coins/${cryptoId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
      },
    })

    return {
      prices: priceResponse.data.prices,
      description: detailsResponse.data.description,
    }
  } catch (error) {
    console.error("Error fetching crypto history:", error)
    throw error
  }
}

// News API functions
export const fetchNews = async () => {
  try {
    const response = await axios.get(NEWS_API_BASE_URL, {
      params: {
        apikey: NEWS_API_KEY,
        q: "cryptocurrency OR bitcoin OR ethereum",
        language: "en",
        category: "business",
      },
    })
    return response.data.results || []
  } catch (error) {
    console.error("Error fetching news data:", error)
    throw error
  }
}

