import { createSlice } from "@reduxjs/toolkit"
import { loadFavorites, saveFavorites } from "@/utils/localStorage"

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteCities: loadFavorites("favoriteCities") || [],
    favoriteCryptos: loadFavorites("favoriteCryptos") || [],
  },
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const cityId = action.payload
      const index = state.favoriteCities.indexOf(cityId)

      if (index === -1) {
        state.favoriteCities.push(cityId)
      } else {
        state.favoriteCities.splice(index, 1)
      }

      saveFavorites("favoriteCities", state.favoriteCities)
    },
    toggleFavoriteCrypto: (state, action) => {
      const cryptoId = action.payload
      const index = state.favoriteCryptos.indexOf(cryptoId)

      if (index === -1) {
        state.favoriteCryptos.push(cryptoId)
      } else {
        state.favoriteCryptos.splice(index, 1)
      }

      saveFavorites("favoriteCryptos", state.favoriteCryptos)
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto } = favoritesSlice.actions
export default favoritesSlice.reducer

