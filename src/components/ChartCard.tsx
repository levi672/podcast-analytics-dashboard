'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface ChartCardProps {
  title: string
  data: Array<{ date: string; value: number }>
  color?: string
  height?: number
  type?: 'line' | 'area'
}

export default function ChartCard({ title, data, color = '#1DB954', height = 150, type = 'area' }: ChartCardProps) {
  const hasData = data && data.length > 0 && data.some(d => d.value > 0)

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5">
      <h3 className="text-sm font-medium text-white mb-4">{title}</h3>
      
      {hasData ? (
        <ResponsiveContainer width="100%" height={height}>
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 10 }}
                tickFormatter={(val) => {
                  const d = new Date(val)
                  return `${d.getDate()} ${d.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}`
                }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 10 }}
                width={30}
              />
              <Tooltip
                contentStyle={{ background: '#1a1a24', border: '1px solid #2e2e3e', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: color }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fill={`url(#gradient-${color.replace('#', '')})`}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 10 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666', fontSize: 10 }}
                width={30}
              />
              <Tooltip
                contentStyle={{ background: '#1a1a24', border: '1px solid #2e2e3e', borderRadius: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[150px] text-gray-500 text-sm">
          Sem dados no período selecionado
        </div>
      )}
    </div>
  )
}
