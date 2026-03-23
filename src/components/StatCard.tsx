interface StatCardProps {
  title: string
  value: string | number
  icon?: string
  color?: string
  subtitle?: string
}

export default function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-dark-muted text-sm">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className={`text-3xl font-bold ${color || 'text-white'}`}>
        {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
      </p>
      {subtitle && <p className="text-dark-muted text-xs mt-1">{subtitle}</p>}
    </div>
  )
}
