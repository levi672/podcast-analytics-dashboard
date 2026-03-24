'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'Visão Geral', path: '/', icon: '📊' },
  { name: 'Spotify', path: '/spotify', icon: '🎧', color: '#1DB954' },
  { name: 'YouTube', path: '/youtube', icon: '▶️', color: '#FF0000' },
  { name: 'Instagram', path: '/instagram', icon: '📷', color: '#E4405F' },
  { name: 'TikTok', path: '/tiktok', icon: '♪', color: '#00F2EA' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-[#0d0d12] border-r border-[#1a1a24] flex flex-col">
      <div className="p-5 border-b border-[#1a1a24]">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Podcast Analytics</p>
        <h1 className="text-base font-semibold mt-1 text-white">No corre<br/>com o Jota</h1>
      </div>

      <nav className="flex-1 p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                isActive
                  ? 'bg-[#1a1a24]'
                  : 'hover:bg-[#14141c]'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span 
                className={`text-sm ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}
                style={isActive && item.color ? { color: item.color } : {}}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#1a1a24] text-xs text-gray-500">
        <a href="https://open.spotify.com" target="_blank" className="block hover:text-white mb-1">
          Abrir no Spotify ↗
        </a>
        <a href="https://youtube.com" target="_blank" className="block hover:text-white">
          Canal YouTube ↗
        </a>
      </div>
    </aside>
  )
}
