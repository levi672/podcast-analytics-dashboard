'use client'

import { useState, useEffect } from 'react'

export function useData<T>(filename: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/${filename}?v=${Date.now()}`)
        if (!response.ok) {
          throw new Error('Erro ao carregar dados')
        }
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filename])

  return { data, loading, error }
}
