'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import Loading from '@/components/Loading'

interface YouTubeData {
  period: { start: string; end: string }
  summary: {
    subscribers: number
    total_videos: number
    views_total: number
  }
  videos: Array<{
    id: string
    title: string
    url: string
    views: number
    likes: number
    comments: number
    published_at: string
    thumbnail: string
  }>
}

export default function YouTubePage() {
  const { data, loading, error } = useData<YouTubeData>('youtube.json')

  if (loading) return <Loading />
  if (error) return <div className="text-red-500">Erro: {error}</div>
  if (!data) return null

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">▶️</span>
        <div>
          <h1 className="text-2xl font-bold text-youtube">YouTube</h1>
          <p className="text-dark-muted text-sm">
            {data.period.start} - {data.period.end}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Inscritos"
          value={data.summary.subscribers}
          color="text-youtube"
        />
        <StatCard
          title="Views Total"
          value={data.summary.views_total}
        />
        <StatCard
          title="Vídeos"
          value={data.summary.total_videos}
        />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Vídeos - Top por Views</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-dark-muted text-sm border-b border-dark-border">
                <th className="pb-3">Vídeo</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Likes</th>
                <th className="pb-3">Comentários</th>
                <th className="pb-3">Publicado</th>
              </tr>
            </thead>
            <tbody>
              {data.videos?.slice(0, 10).map((video) => (
                <tr key={video.id} className="border-b border-dark-border last:border-0">
                  <td className="py-3">
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-youtube transition-colors"
                    >
                      {video.title?.slice(0, 50)}...
                    </a>
                  </td>
                  <td className="py-3 font-semibold">{video.views?.toLocaleString('pt-BR')}</td>
                  <td className="py-3">{video.likes?.toLocaleString('pt-BR')}</td>
                  <td className="py-3">{video.comments}</td>
                  <td className="py-3 text-dark-muted">
                    {new Date(video.published_at).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
