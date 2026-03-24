interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  title: string
  columns: Column[]
  data: any[]
  maxRows?: number
}

export default function DataTable({ title, columns, data, maxRows = 10 }: DataTableProps) {
  const displayData = data.slice(0, maxRows)

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5">
      <h3 className="text-sm font-medium text-white mb-4">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[#1e1e2e]">
              {columns.map((col) => (
                <th key={col.key} className="pb-3 text-xs text-gray-500 font-normal uppercase">
                  {col.label}
                </th>
              ))}
              <th className="pb-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, i) => (
              <tr key={i} className="border-b border-[#1e1e2e] last:border-0">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 text-sm">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td className="py-3">
                  {row.url || row.permalink || row.webVideoUrl ? (
                    <a 
                      href={row.url || row.permalink || row.webVideoUrl} 
                      target="_blank"
                      className="text-gray-500 hover:text-white"
                    >
                      ↗
                    </a>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
