interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  color?: string
  subtitle?: string
  trend?: React.ReactNode
}

export default function StatCard({ title, value, icon, color, subtitle, trend }: StatCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`
      return val.toLocaleString('pt-BR')
    }
    return val
  }

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-400 text-xs">{title}</p>
        {icon && <span className="text-gray-500">{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${color || 'text-white'}`}>
        {formatValue(value)}
      </p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
      {trend && <div className="absolute top-4 right-4">{trend}</div>}
    </div>
  )
}
