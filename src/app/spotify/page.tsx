'use client'

import { useState } from 'react'
import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import ChartCard from '@/components/ChartCard'
import DataTable from '@/components/DataTable'
import Loading from '@/components/Loading'

export default function SpotifyPage() {
  const { data, loading } = useData<any>('spotify.json')
  const [selectedDays, setSelectedDays] = useState(30)

  if (loading || !data) return <Loading />

  const period = data.period || { start: '', end: '' }
  
  const filterByDays = (items: any[], dateKey: string) => {
    if (!items?.length) return items
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - selectedDays)
    return items.filter(item => new Date(item[dateKey]) >= cutoff)
  }

  const filteredDaily = filterByDays(data.daily || [], 'date')

  const episodeColumns = [
    { key: 'title', label: 'Episódio', render: (v: string) => <span className="text-white">{v?.length > 40 ? v.slice(0, 40) + '...' : v}</span> },
    { key: 'streams', label: 'Streams', render: (v: number) => v?.toLocaleString('pt-BR') || '—' },
    { key: 'starts', label: 'Ouvintes', render: (v: number) => v?.toLocaleString('pt-BR') || '—' },
    { key: 'published_at', label: 'Publicado', render: (v: string) => v ? new Date(v).toLocaleDateString('pt-BR') : '—' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎧</span>
          <div>
            <h1 className="text-xl font-semibold text-[#1DB954]">Spotify</h1>
            <p className="text-gray-500 text-xs">No corre com o Jota — Podcast</p>
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
          title="Seguidores"
          value={data.summary?.followers || 0}
          icon={<span className="text-gray-500">👥</span>}
          color="text-[#1DB954]"
        />
        <StatCard
          title="Total de Episódios"
          value={data.summary?.total_episodes || data.episodes?.length || 0}
          icon={<span className="text-gray-500">🎙</span>}
        />
        <StatCard
          title="Streams no Período"
          value={data.summary?.streams_period || 0}
          subtitle="streams"
          icon={<span className="text-gray-500">🎧</span>}
          color="text-[#1DB954]"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ChartCard
          title="Streams Diários"
          data={filteredDaily.map((d: any) => ({ date: d.date, value: d.streams })) || []}
          color="#1DB954"
        />
        <ChartCard
          title="Evolução de Seguidores"
          data={[]}
          color="#1DB954"
        />
      </div>

      {/* Episodes Table */}
      <DataTable
        title="Episódios — Top por Streams"
        columns={episodeColumns}
        data={data.episodes || []}
      />
    </div>
  )
}
