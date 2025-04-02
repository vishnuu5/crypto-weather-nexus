// This middleware handles WebSocket connections and messages
const websocketMiddleware = (store) => (next) => (action) => {
    // Pass the action to the next middleware or reducer
    return next(action)
  }
  
  export default websocketMiddleware
  
  