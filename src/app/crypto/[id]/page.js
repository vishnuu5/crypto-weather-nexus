"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import CryptoDetail from "@/components/crypto/CryptoDetail"
import Loading from "@/components/common/Loading"
import { fetchCryptoDetails } from "@/redux/slices/cryptoSlice"

export default function CryptoPage() {
  const params = useParams()
  const cryptoId = params.id
  const dispatch = useDispatch()

  const { cryptos, cryptoDetails, loading } = useSelector((state) => state.crypto)
  const crypto = cryptos.find((c) => c.id === cryptoId)

  useEffect(() => {
    if (cryptoId) {
      dispatch(fetchCryptoDetails(cryptoId))
    }
  }, [cryptoId, dispatch])

  if (loading || !crypto) {
    return <Loading />
  }

  return (
    <div>
      <CryptoDetail crypto={crypto} details={cryptoDetails[cryptoId] || {}} />
    </div>
  )
}

