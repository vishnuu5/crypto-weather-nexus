import { store } from "@/redux/store"
import { addNotification } from "@/redux/slices/notificationSlice"
import { updateCryptoPrice } from "@/redux/slices/cryptoSlice"
import { CRYPTO_IDS } from "@/utils/constants"

export const initializeWebSocket = () => {
  // For demo purposes, we'll simulate WebSocket messages
  // In a real app, you would connect to a real WebSocket server

  // Simulate crypto price updates
  const cryptoPriceInterval = setInterval(() => {
    CRYPTO_IDS.forEach((id) => {
      const cryptos = store.getState().crypto.cryptos
      const crypto = cryptos.find((c) => c.id === id)

      if (crypto) {
        const currentPrice = crypto.current_price
        const randomChange = (Math.random() - 0.5) * 0.02 // Random change between -1% and +1%
        const newPrice = currentPrice * (1 + randomChange)

        // Update the price
        store.dispatch(
          updateCryptoPrice({
            id,
            price: newPrice,
          }),
        )

        // If price change is significant, add a notification
        if (Math.abs(randomChange) > 0.005) {
          // More than 0.5% change
          store.dispatch(
            addNotification({
              type: "price_alert",
              message: `${crypto.name} (${crypto.symbol.toUpperCase()}) ${randomChange > 0 ? "up" : "down"} by ${Math.abs(randomChange * 100).toFixed(2)}% to ${newPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
            }),
          )
        }
      }
    })
  }, 30000) // Every 30 seconds

  // Simulate weather alerts
  const weatherAlertInterval = setInterval(() => {
    const cities = store.getState().weather.cities

    if (cities.length > 0) {
      const randomIndex = Math.floor(Math.random() * cities.length)
      const city = cities[randomIndex]

      const alertTypes = [
        "Heavy Rain Warning",
        "High Temperature Alert",
        "Strong Wind Advisory",
        "Thunderstorm Warning",
        "Air Quality Alert",
      ]

      const randomAlertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]

      store.dispatch(
        addNotification({
          type: "weather_alert",
          message: `${randomAlertType} for ${city.name}: ${getRandomAlertMessage(randomAlertType)}`,
        }),
      )
    }
  }, 120000) // Every 2 minutes

  // Helper function to generate random alert messages
  const getRandomAlertMessage = (alertType) => {
    switch (alertType) {
      case "Heavy Rain Warning":
        return "Expect heavy rainfall in the next few hours. Possible flooding in low-lying areas."
      case "High Temperature Alert":
        return "Temperatures expected to rise significantly. Stay hydrated and avoid prolonged sun exposure."
      case "Strong Wind Advisory":
        return "Strong winds expected. Secure loose objects and exercise caution when driving."
      case "Thunderstorm Warning":
        return "Thunderstorms expected in the area. Seek shelter and avoid open areas."
      case "Air Quality Alert":
        return "Poor air quality reported. Sensitive groups should limit outdoor activities."
      default:
        return "Weather conditions may change rapidly. Stay informed and prepared."
    }
  }

  // Return a cleanup function
  return () => {
    clearInterval(cryptoPriceInterval)
    clearInterval(weatherAlertInterval)
  }
}

