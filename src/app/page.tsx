'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import Loading from '@/components/Loading'

interface OverviewData {
  period: { start: string; end: string }
  platforms: {
    spotify: { followers: number; streams_total: number }
    youtube: { subscribers: number; views_total: number }
    instagram: { followers: number; posts_count: number }
    tiktok: { followers: number; views_total: number }
  }
  last_updated: string
}

export default function OverviewPage() {
  const { data, loading, error } = useData<OverviewData>('overview.json')

  if (loading) return <Loading />
  if (error) return <div className="text-red-500">Erro: {error}</div>
  if (!data) return null

  const { platforms, period, last_updated } = data

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Visão Geral</h1>
          <p className="text-dark-muted text-sm mt-1">
            {period.start} - {period.end}
          </p>
        </div>
        <p className="text-dark-muted text-xs">
          Atualizado: {new Date(last_updated).toLocaleString('pt-BR')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Spotify - Seguidores"
          value={platforms.spotify?.followers || 0}
          icon="🎧"
          color="text-spotify"
        />
        <StatCard
          title="YouTube - Inscritos"
          value={platforms.youtube?.subscribers || 0}
          icon="▶️"
          color="text-youtube"
        />
        <StatCard
          title="Instagram - Seguidores"
          value={platforms.instagram?.followers || 0}
          icon="📸"
          color="text-instagram"
        />
        <StatCard
          title="TikTok - Seguidores"
          value={platforms.tiktok?.followers || 0}
          icon="🎵"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Spotify - Streams"
          value={platforms.spotify?.streams_total || 0}
          subtitle="Total no período"
        />
        <StatCard
          title="YouTube - Views"
          value={platforms.youtube?.views_total || 0}
          subtitle="Total no período"
        />
        <StatCard
          title="Instagram - Posts"
          value={platforms.instagram?.posts_count || 0}
          subtitle="Posts coletados"
        />
        <StatCard
          title="TikTok - Views"
          value={platforms.tiktok?.views_total || 0}
          subtitle="Total no período"
        />
      </div>
    </div>
  )
}
