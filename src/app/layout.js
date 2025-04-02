import { Inter } from "next/font/google"
import { Providers } from "@/redux/provider"
import { ToastContainer } from "react-toastify"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CryptoWeather Nexus",
  description: "A dashboard combining weather data, cryptocurrency information, and real-time notifications",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>
          <ToastContainer position="top-right" autoClose={5000} />
        </Providers>
      </body>
    </html>
  )
}

