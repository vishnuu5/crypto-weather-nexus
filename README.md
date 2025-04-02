# CryptoWeather Nexus
A modern, multi-page dashboard combining weather data, cryptocurrency information, and real-time notifications via WebSocket.

# CryptoWeather Nexus Dashboard

# Features

## Multi-Page Architecture

Dashboard with Weather, Cryptocurrency, and News sections
Detailed city weather pages with historical data
Detailed cryptocurrency pages with price history.

## Real-Time Data

Live cryptocurrency price updates
Weather alerts and notifications
Real-time price change indicators.

## User Preferences

Favorite cities and cryptocurrencies
Persistent storage of user preferences.

## Responsive Design

Mobile-first approach
Adapts seamlessly from mobile to desktop.

# Tech Stack
Frontend Framework: Next.js 14 with App Router
State Management: Redux with Redux Toolkit
Styling: Tailwind CSS
Charts: Recharts
Notifications: React-Toastify
API Integration: Axios
Real-Time Updates: Simulated WebSocket.

## APIs Used
Weather Data: OpenWeatherMap API
Cryptocurrency Data: CoinGecko API
News Headlines: NewsData.io.

# Installation and Setup

## Prerequisites
Node.js 18.18.0 or later
```bash
npm or yarn
```
## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/vishnuu5/crypto-weather-nexus.git
cd crypto-weather-nexus
```
2. Install dependencies:

```bash
npm install
```
3. Create a `.env.local` file in the root directory with your API keys:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key
```

4. Start the development server;

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.



## License

This project is licensed under the MIT License - see the LICENSE file for details.

