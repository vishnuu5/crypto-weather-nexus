import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchWeatherForCities, fetchCityHistory } from "@/lib/api"
import { CITIES } from "@/utils/constants"

export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchWeatherForCities(CITIES)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchCityWeatherHistory = createAsyncThunk(
  "weather/fetchCityWeatherHistory",
  async (cityId, { rejectWithValue }) => {
    try {
      const data = await fetchCityHistory(cityId)
      return { cityId, data }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    cityHistory: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false
        state.cities = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCityWeatherHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCityWeatherHistory.fulfilled, (state, action) => {
        state.loading = false
        state.cityHistory[action.payload.cityId] = action.payload.data
      })
      .addCase(fetchCityWeatherHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default weatherSlice.reducer

