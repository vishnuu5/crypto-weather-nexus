import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCryptos, fetchCryptoHistory } from "@/lib/api"
import { CRYPTO_IDS } from "@/utils/constants"

export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCryptos(CRYPTO_IDS)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchCryptoDetails = createAsyncThunk(
  "crypto/fetchCryptoDetails",
  async (cryptoId, { rejectWithValue }) => {
    try {
      const data = await fetchCryptoHistory(cryptoId)
      return { cryptoId, data }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptos: [],
    cryptoDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price } = action.payload
      const crypto = state.cryptos.find((c) => c.id === id)
      if (crypto) {
        const oldPrice = crypto.current_price
        crypto.current_price = price

        // Calculate new 24h change percentage if we have the old price
        if (oldPrice) {
          const priceChange = price - oldPrice
          const percentageChange = (priceChange / oldPrice) * 100
          crypto.price_change_24h = priceChange
          crypto.price_change_percentage_24h = percentageChange
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false
        state.cryptos = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.loading = false
        state.cryptoDetails[action.payload.cryptoId] = action.payload.data
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer

