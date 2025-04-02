"use client"

import { useSelector, useDispatch } from "react-redux"
import { markAsRead, clearAll } from "@/redux/slices/notificationSlice"

export default function Notification({ onClose }) {
  const notifications = useSelector((state) => state.notifications.items)
  const dispatch = useDispatch()

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id))
  }

  const handleClearAll = () => {
    dispatch(clearAll())
    if (onClose) onClose()
  }

  return (
    <div className="p-4 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={handleClearAll} className="text-xs text-blue-600 hover:text-blue-800">
          Clear All
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-3 rounded-md ${notification.read ? "bg-gray-100" : "bg-blue-50 border-l-4 border-blue-500"}`}
            >
              <div className="flex justify-between">
                <span
                  className={`text-xs ${notification.type === "price_alert" ? "text-green-600" : "text-orange-600"}`}
                >
                  {notification.type === "price_alert" ? "Price Alert" : "Weather Alert"}
                </span>
                <span className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm mt-1">{notification.message}</p>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

