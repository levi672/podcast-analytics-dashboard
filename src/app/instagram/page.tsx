'use client'

import { useData } from '@/hooks/useData'
import StatCard from '@/components/StatCard'
import Loading from '@/components/Loading'

interface InstagramData {
  period: { start: string; end: string }
  summary: {
    followers: number
    posts_count: number
    engagement_total: number
  }
  profile: {
    username: string
    name: string
  }
  posts: Array<{
    id: string
    caption: string
    media_type: string
    like_count: number
    comments_count: number
    timestamp: string
    permalink: string
  }>
}

export default function InstagramPage() {
  const { data, loading, error } = useData<InstagramData>('instagram.json')

  if (loading) return <Loading />
  if (error) return <div className="text-red-500">Erro: {error}</div>
  if (!data) return null

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📸</span>
        <div>
          <h1 className="text-2xl font-bold text-instagram">Instagram</h1>
          <p className="text-dark-muted text-sm">
            @{data.profile?.username || 'meujota'} • {data.period.start} - {data.period.end}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Seguidores"
          value={data.summary.followers}
          color="text-instagram"
        />
        <StatCard
          title="Posts"
          value={data.summary.posts_count}
        />
        <StatCard
          title="Engajamento Total"
          value={data.summary.engagement_total || 0}
        />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Posts Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.posts?.slice(0, 10).map((post) => (
            <div key={post.id} className="border border-dark-border rounded-lg p-4">
              <p className="text-sm mb-2 line-clamp-2">
                {post.caption?.slice(0, 100) || 'Sem legenda'}...
              </p>
              <div className="flex items-center gap-4 text-sm text-dark-muted">
                <span>❤️ {post.like_count?.toLocaleString('pt-BR')}</span>
                <span>💬 {post.comments_count}</span>
                <span>{new Date(post.timestamp).toLocaleDateString('pt-BR')}</span>
              </div>
              <a 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-instagram text-sm mt-2 inline-block hover:underline"
              >
                Ver post →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
