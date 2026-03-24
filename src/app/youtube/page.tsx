'use client'

import { useState } from 'react'
import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import ChartCard from '@/components/ChartCard'
import DataTable from '@/components/DataTable'
import Loading from '@/components/Loading'

export default function YouTubePage() {
  const { data, loading } = useData<any>('youtube.json')
  const [selectedDays, setSelectedDays] = useState(30)

  if (loading || !data) return <Loading />

  const period = data.period || { start: '', end: '' }

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n?.toLocaleString('pt-BR') || '0'
  }

  const filterByDays = (items: any[], dateKey: string) => {
    if (!items?.length) return items
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - selectedDays)
    return items.filter(item => new Date(item[dateKey]) >= cutoff)
  }

  const filteredVideos = filterByDays(data.videos || [], 'published_at')

  const videosWithUrl = (data.videos || [])
    .map((v: any) => ({ ...v, url: `https://youtube.com/watch?v=${v.id}` }))
    .sort((a: any, b: any) => b.views - a.views)

  const filteredVideosWithUrl = filterByDays(videosWithUrl, 'published_at')

  const videoColumns = [
    { key: 'title', label: 'Vídeo', render: (v: string) => <span className="text-white">{v?.length > 40 ? v.slice(0, 40) + '...' : v}</span> },
    { key: 'views', label: 'Views', render: (v: number) => formatNumber(v) },
    { key: 'likes', label: 'Likes', render: (v: number) => formatNumber(v) },
    { key: 'comments', label: 'Comentários', render: (v: number) => v || 0 },
    { key: 'published_at', label: 'Publicado', render: (v: string) => v ? new Date(v).toLocaleDateString('pt-BR') : '—' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">▶️</span>
          <div>
            <h1 className="text-xl font-semibold text-[#FF0000]">YouTube</h1>
            <p className="text-gray-500 text-xs">@meujota</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">📅 {period.start} – {period.end}</span>
          <div className="flex gap-1 ml-4">
            {[7, 30, 90].map(days => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`px-3 py-1 rounded ${selectedDays === days ? 'bg-purple-600 text-white' : 'bg-[#1a1a24] text-gray-400 hover:bg-[#2a2a34]'}`}
              >
                {days} dias
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Inscritos"
          value={data.summary?.subscribers || 0}
          icon={<span className="text-gray-500">👥</span>}
          color="text-[#FF0000]"
        />
        <StatCard
          title="Views Total"
          value={formatNumber(data.summary?.views_total || 0)}
          icon={<span className="text-gray-500">👁</span>}
        />
        <StatCard
          title="Total de Vídeos"
          value={data.summary?.total_videos || 0}
          icon={<span className="text-gray-500">🎬</span>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <ChartCard
          title="Views por Vídeo"
          data={filteredVideos.slice(0, 10).map((v: any) => ({ date: v.published_at?.slice(0, 10), value: v.views })) || []}
          color="#FF0000"
        />
      </div>

      {/* Videos Table */}
      <DataTable
        title="Vídeos — Top por Views"
        columns={videoColumns}
        data={filteredVideosWithUrl}
      />
    </div>
  )
}
