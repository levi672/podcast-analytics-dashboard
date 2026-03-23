'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'Visão Geral', path: '/', icon: '📊' },
  { name: 'Spotify', path: '/spotify', icon: '🎧', color: 'text-spotify' },
  { name: 'YouTube', path: '/youtube', icon: '▶️', color: 'text-youtube' },
  { name: 'Instagram', path: '/instagram', icon: '📸', color: 'text-instagram' },
  { name: 'TikTok', path: '/tiktok', icon: '🎵' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-dark-card border-r border-dark-border p-6">
      <div className="mb-8">
        <p className="text-xs text-dark-muted uppercase tracking-wider">Podcast Analytics</p>
        <h1 className="text-lg font-bold mt-1">No corre<br/>com o Jota</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-dark-border text-white'
                  : 'text-dark-muted hover:text-white hover:bg-dark-border/50'
              }`}
            >
              <span>{item.icon}</span>
              <span className={item.color}>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
