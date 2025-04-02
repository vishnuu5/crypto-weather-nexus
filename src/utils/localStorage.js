// Load favorites from localStorage
export const loadFavorites = (key) => {
    if (typeof window === "undefined") return null
  
    try {
      const serializedData = localStorage.getItem(key)
      if (serializedData === null) return null
      return JSON.parse(serializedData)
    } catch (error) {
      console.error("Error loading from localStorage:", error)
      return null
    }
  }
  
  // Save favorites to localStorage
  export const saveFavorites = (key, data) => {
    if (typeof window === "undefined") return
  
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }
  
  