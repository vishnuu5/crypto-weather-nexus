"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import CityDetail from "@/components/city/CityDetail"
import Loading from "@/components/common/Loading"
import { fetchCityWeatherHistory } from "@/redux/slices/weatherSlice"

export default function CityPage() {
  const params = useParams()
  const cityId = params.id
  const dispatch = useDispatch()

  const { cities, cityHistory, loading } = useSelector((state) => state.weather)
  const city = cities.find((c) => c.id.toString() === cityId)

  useEffect(() => {
    if (cityId) {
      dispatch(fetchCityWeatherHistory(cityId))
    }
  }, [cityId, dispatch])

  if (loading || !city) {
    return <Loading />
  }

  return (
    <div>
      <CityDetail city={city} history={cityHistory[cityId] || []} />
    </div>
  )
}

