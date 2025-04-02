import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./slices/weatherSlice"
import cryptoReducer from "./slices/cryptoSlice"
import newsReducer from "./slices/newsSlice"
import notificationReducer from "./slices/notificationSlice"
import favoritesReducer from "./slices/favoritesSlice"
import websocketMiddleware from "./middleware/websocketMiddleware"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    notifications: notificationReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(websocketMiddleware),
})

