// Format currency values
export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }
  
  // Format percentage values
  export const formatPercentage = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: "always",
    }).format(value / 100)
  }
  
  // Format large numbers
  export const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value)
  }
  
  