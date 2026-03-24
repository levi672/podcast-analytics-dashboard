'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import ChartCard from '@/components/ChartCard'
import Loading from '@/components/Loading'

export default function OverviewPage() {
  const { data: overview } = useData<any>('overview.json')
  const { data: spotify } = useData<any>('spotify.json')
  const { data: youtube } = useData<any>('youtube.json')
  const { data: instagram } = useData<any>('instagram.json')
  const { data: tiktok } = useData<any>('tiktok.json')

  if (!overview) return <Loading />

  const period = overview.period || { start: '', end: '' }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Visão Geral</h1>
          <p className="text-gray-500 text-xs mt-1">Performance do podcast em todas as plataformas</p>
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

      {/* Seguidores Section */}
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Seguidores / Ouvintes</p>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Spotify — Seguidores"
          value={overview.platforms?.spotify?.followers || 0}
          icon={<span className="text-[#1DB954]">♪</span>}
          color="text-[#1DB954]"
        />
        <StatCard
          title="YouTube — Inscritos"
          value={overview.platforms?.youtube?.subscribers || 0}
          icon={<span className="text-[#FF0000]">▶</span>}
          color="text-[#FF0000]"
        />
        <StatCard
          title="Instagram — Seguidores"
          value={overview.platforms?.instagram?.followers || 0}
          icon={<span className="text-[#E4405F]">📷</span>}
          color="text-[#E4405F]"
        />
        <StatCard
          title="TikTok — Seguidores"
          value={overview.platforms?.tiktok?.followers || 0}
          icon={<span className="text-[#00F2EA]">♪</span>}
          color="text-[#00F2EA]"
        />
      </div>

      {/* Consumo Section */}
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Consumo no Período</p>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Streams Spotify"
          value={spotify?.summary?.streams_total || 0}
          subtitle="no período"
          icon={<span className="text-gray-500">↗</span>}
        />
        <StatCard
          title="Views YouTube"
          value={youtube?.summary?.views_total || 0}
          subtitle="0h assistidas"
          icon={<span className="text-gray-500">👁</span>}
        />
        <StatCard
          title="Views Instagram"
          value={instagram?.summary?.engagement_total || 0}
          subtitle="reels e posts"
          icon={<span className="text-gray-500">↗</span>}
        />
        <StatCard
          title="Views TikTok"
          value={tiktok?.summary?.views_total || 0}
          subtitle="no período"
          icon={<span className="text-gray-500">↗</span>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title="Streams Spotify — Diário"
          data={spotify?.daily?.map((d: any) => ({ date: d.date, value: d.streams })) || []}
          color="#1DB954"
        />
        <ChartCard
          title="Views YouTube — Diário"
          data={youtube?.daily?.map((d: any) => ({ date: d.date, value: d.views })) || []}
          color="#FF0000"
        />
      </div>
    </div>
  )
}
