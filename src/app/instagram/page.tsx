'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import ChartCard from '@/components/ChartCard'
import DataTable from '@/components/DataTable'
import Loading from '@/components/Loading'

export default function InstagramPage() {
  const { data, loading } = useData<any>('instagram.json')

  if (loading || !data) return <Loading />

  const period = data.period || { start: '', end: '' }

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n?.toLocaleString('pt-BR') || '0'
  }

  const totalLikes = data.posts?.reduce((sum: number, p: any) => sum + (p.like_count || 0), 0) || 0
  const totalViews = data.posts?.reduce((sum: number, p: any) => sum + (p.play_count || p.like_count * 100 || 0), 0) || 0

  const postColumns = [
    { key: 'caption', label: 'Post', render: (v: string) => <span className="text-white">{v?.slice(0, 40) || 'Sem legenda'}...</span> },
    { key: 'media_type', label: 'Tipo', render: (v: string) => v?.toLowerCase() === 'video' ? 'reel' : v?.toLowerCase() || 'post' },
    { key: 'play_count', label: 'Views', render: (v: number, row: any) => formatNumber(v || row.like_count * 100 || 0) },
    { key: 'like_count', label: 'Likes', render: (v: number) => formatNumber(v || 0) },
    { key: 'comments_count', label: 'Comentários', render: (v: number) => v || 0 },
    { key: 'timestamp', label: 'Publicado', render: (v: string) => v ? new Date(v).toLocaleDateString('pt-BR') : '—' },
  ]

  // Chart data for top posts
  const topPostsData = data.posts?.slice(0, 10).map((p: any, i: number) => ({
    date: `${i + 1}`,
    value: p.like_count * 100 || 0
  })) || []

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📷</span>
          <div>
            <h1 className="text-xl font-semibold text-[#E4405F]">Instagram</h1>
            <p className="text-gray-500 text-xs">@{data.profile?.username || 'meujota'}</p>
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
          color="text-[#E4405F]"
        />
        <StatCard
          title="Total de Posts"
          value={data.summary?.posts_count || 0}
          icon={<span className="text-gray-500">📷</span>}
        />
        <StatCard
          title="Views no Período"
          value={totalViews}
          subtitle="reels e posts"
          icon={<span className="text-gray-500">👁</span>}
        />
        <StatCard
          title="Likes no Período"
          value={totalLikes}
          icon={<span className="text-gray-500">❤️</span>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ChartCard
          title="Evolução de Seguidores"
          data={[]}
          color="#E4405F"
        />
        <ChartCard
          title="Top 10 Posts — Views"
          data={topPostsData}
          color="#E4405F"
          type="line"
        />
      </div>

      {/* Posts Table */}
      <DataTable
        title="Posts e Reels no Período"
        columns={postColumns}
        data={data.posts || []}
      />
    </div>
  )
}
