'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import ChartCard from '@/components/ChartCard'
import DataTable from '@/components/DataTable'
import Loading from '@/components/Loading'

export default function TikTokPage() {
  const { data, loading } = useData<any>('tiktok.json')

  if (loading || !data) return <Loading />

  const period = data.period || { start: '', end: '' }

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n?.toLocaleString('pt-BR') || '0'
  }

  const totalLikes = data.videos?.reduce((sum: number, v: any) => sum + (v.diggCount || v.likes || 0), 0) || 0
  const totalViews = data.videos?.reduce((sum: number, v: any) => sum + (v.playCount || v.views || 0), 0) || 0

  const videoColumns = [
    { key: 'desc', label: 'Vídeo', render: (v: string) => <span className="text-white">{v?.slice(0, 40) || 'Sem descrição'}...</span> },
    { key: 'playCount', label: 'Views', render: (v: number, row: any) => formatNumber(v || row.views || 0) },
    { key: 'diggCount', label: 'Likes', render: (v: number, row: any) => formatNumber(v || row.likes || 0) },
    { key: 'commentCount', label: 'Comentários', render: (v: number, row: any) => v || row.comments || 0 },
    { key: 'shareCount', label: 'Compartilhamentos', render: (v: number, row: any) => v || row.shares || 0 },
    { key: 'createTime', label: 'Publicado', render: (v: number) => v ? new Date(v * 1000).toLocaleDateString('pt-BR') : '—' },
  ]

  // Chart data for video views
  const videoViewsData = data.videos?.slice(0, 10).map((v: any) => ({
    date: v.createTime ? new Date(v.createTime * 1000).toISOString() : '',
    value: v.playCount || v.views || 0
  })).reverse() || []

  if (data.error) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🎵</span>
          <div>
            <h1 className="text-xl font-semibold text-[#00F2EA]">TikTok</h1>
            <p className="text-gray-500 text-xs">@meu.jota</p>
          </div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-xl p-6">
          <p className="text-yellow-500">⚠️ Erro na coleta do TikTok</p>
          <p className="text-gray-400 text-sm mt-2">{data.error}</p>
          <p className="text-gray-500 text-xs mt-2">Verifique o token do Apify em console.apify.com</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎵</span>
          <div>
            <h1 className="text-xl font-semibold text-[#00F2EA]">TikTok</h1>
            <p className="text-gray-500 text-xs">@{data.profile?.username || 'meu.jota'}</p>
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
          title="Seguidores"
          value={data.summary?.followers || 0}
          icon={<span className="text-gray-500">👥</span>}
          color="text-[#00F2EA]"
        />
        <StatCard
          title="Total de Likes"
          value={totalLikes}
          icon={<span className="text-gray-500">❤️</span>}
        />
        <StatCard
          title="Views no Período"
          value={totalViews}
          icon={<span className="text-gray-500">👁</span>}
        />
        <StatCard
          title="Likes no Período"
          value={totalLikes}
          icon={<span className="text-gray-500">↗</span>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ChartCard
          title="Evolução de Seguidores"
          data={[]}
          color="#00F2EA"
        />
        <ChartCard
          title="Views dos Últimos Vídeos"
          data={videoViewsData}
          color="#00F2EA"
        />
      </div>

      {/* Videos Table */}
      <DataTable
        title="Vídeos no Período"
        columns={videoColumns}
        data={data.videos || []}
      />
    </div>
  )
}
