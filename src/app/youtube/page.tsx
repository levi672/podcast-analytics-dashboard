'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import ChartCard from '@/components/ChartCard'
import DataTable from '@/components/DataTable'
import Loading from '@/components/Loading'

export default function YouTubePage() {
  const { data, loading } = useData<any>('youtube.json')

  if (loading || !data) return <Loading />

  const period = data.period || { start: '', end: '' }

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n?.toLocaleString('pt-BR') || '0'
  }

  const videoColumns = [
    { key: 'title', label: 'Vídeo', render: (v: string) => <span className="text-white">{v?.slice(0, 40)}...</span> },
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
            <button className="px-3 py-1 rounded bg-[#1a1a24] text-gray-400">7 dias</button>
            <button className="px-3 py-1 rounded bg-purple-600 text-white">30 dias</button>
            <button className="px-3 py-1 rounded bg-[#1a1a24] text-gray-400">90 dias</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Inscritos"
          value={data.summary?.subscribers || 0}
          icon={<span className="text-gray-500">👥</span>}
          color="text-[#FF0000]"
        />
        <StatCard
          title="Views no Período"
          value={data.summary?.views_total || 0}
          icon={<span className="text-gray-500">👁</span>}
        />
        <StatCard
          title="Horas Assistidas"
          value="0h"
          icon={<span className="text-gray-500">⏱</span>}
        />
        <StatCard
          title="Novos Inscritos"
          value={0}
          subtitle="no período"
          icon={<span className="text-gray-500">👥</span>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ChartCard
          title="Views Diárias"
          data={data.daily?.map((d: any) => ({ date: d.date, value: d.views })) || []}
          color="#FF0000"
        />
        <ChartCard
          title="Watch Time (minutos/dia)"
          data={[]}
          color="#FF0000"
        />
      </div>

      {/* Videos Table */}
      <DataTable
        title="Vídeos — Top por Views"
        columns={videoColumns}
        data={data.videos || []}
      />
    </div>
  )
}
