import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podcast Analytics - No corre com o Jota',
  description: 'Dashboard de métricas do podcast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 ml-56">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
