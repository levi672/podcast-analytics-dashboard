'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import Loading from '@/components/Loading'

interface SpotifyData {
  period: { start: string; end: string }
  summary: {
    followers: number
    streams_total: number
    episodes_count: number
  }
  episodes: Array<{
    name: string
    streams: number
    published_at: string
  }>
  daily: Array<{
    date: string
    streams: number
  }>
}

export default function SpotifyPage() {
  const { data, loading, error } = useData<SpotifyData>('spotify.json')

  if (loading) return <Loading />
  if (error) return <div className="text-red-500">Erro: {error}</div>
  if (!data) return null

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🎧</span>
        <div>
          <h1 className="text-2xl font-bold text-spotify">Spotify</h1>
          <p className="text-dark-muted text-sm">
            {data.period.start} - {data.period.end}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Seguidores"
          value={data.summary.followers}
          color="text-spotify"
        />
        <StatCard
          title="Streams Total"
          value={data.summary.streams_total}
        />
        <StatCard
          title="Episódios"
          value={data.summary.episodes_count}
        />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Episódios</h2>
        <div className="space-y-3">
          {data.episodes?.slice(0, 10).map((ep, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
              <div>
                <p className="font-medium">{ep.name}</p>
                <p className="text-dark-muted text-sm">
                  {new Date(ep.published_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <p className="text-spotify font-semibold">
                {ep.streams?.toLocaleString('pt-BR')} streams
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
