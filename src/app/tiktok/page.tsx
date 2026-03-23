'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import Loading from '@/components/Loading'

interface TikTokData {
  period: { start: string; end: string }
  summary: {
    followers: number
    views_total: number
    videos_count: number
  }
  profile: {
    username: string
    nickname: string
  }
  videos: Array<{
    id: string
    desc: string
    playCount: number
    diggCount: number
    commentCount: number
    createTime: number
    webVideoUrl: string
  }>
  error?: string
}

export default function TikTokPage() {
  const { data, loading, error } = useData<TikTokData>('tiktok.json')

  if (loading) return <Loading />
  if (error) return <div className="text-red-500">Erro: {error}</div>
  if (!data) return null

  if (data.error) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🎵</span>
          <div>
            <h1 className="text-2xl font-bold">TikTok</h1>
          </div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-600 rounded-xl p-6">
          <p className="text-yellow-500">⚠️ Erro na coleta do TikTok: {data.error}</p>
          <p className="text-dark-muted text-sm mt-2">
            Verifique o token do Apify em console.apify.com
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🎵</span>
        <div>
          <h1 className="text-2xl font-bold">TikTok</h1>
          <p className="text-dark-muted text-sm">
            @{data.profile?.username || 'meujota'} • {data.period.start} - {data.period.end}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Seguidores"
          value={data.summary?.followers || 0}
        />
        <StatCard
          title="Views Total"
          value={data.summary?.views_total || 0}
        />
        <StatCard
          title="Vídeos"
          value={data.summary?.videos_count || 0}
        />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Vídeos - Top por Views</h2>
        <div className="space-y-3">
          {data.videos?.slice(0, 10).map((video) => (
            <div key={video.id} className="flex items-center justify-between py-3 border-b border-dark-border last:border-0">
              <div className="flex-1">
                <p className="line-clamp-1">{video.desc || 'Sem descrição'}</p>
                <div className="flex items-center gap-4 text-sm text-dark-muted mt-1">
                  <span>❤️ {video.diggCount?.toLocaleString('pt-BR')}</span>
                  <span>💬 {video.commentCount}</span>
                  <span>{new Date(video.createTime * 1000).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{video.playCount?.toLocaleString('pt-BR')}</p>
                <p className="text-dark-muted text-xs">views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
