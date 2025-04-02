import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      }

      state.items.unshift(notification)

      // Keep only the latest 20 notifications
      if (state.items.length > 20) {
        state.items = state.items.slice(0, 20)
      }

      // Show toast notification
      toast(notification.message, {
        type: notification.type === "price_alert" ? "success" : "warning",
      })
    },
    markAsRead: (state, action) => {
      const notification = state.items.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    clearAll: (state) => {
      state.items = []
    },
  },
})

export const { addNotification, markAsRead, clearAll } = notificationSlice.actions
export default notificationSlice.reducer

