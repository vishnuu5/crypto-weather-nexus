"use client"

import { useSelector } from "react-redux"
import Loading from "@/components/common/Loading"

export default function NewsSection() {
  const { news, loading, error } = useSelector((state) => state.news)

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">News Headlines</h2>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">News Headlines</h2>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>Error loading news data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">News Headlines</h2>

      {news.length > 0 ? (
        <div className="space-y-4">
          {news.slice(0, 5).map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  {item.title}
                </a>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.source} • {new Date(item.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No news available</p>
      )}
    </div>
  )
}

