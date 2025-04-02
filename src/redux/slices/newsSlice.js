import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchNews } from "@/lib/api"

export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchNews()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false
        state.news = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default newsSlice.reducer

