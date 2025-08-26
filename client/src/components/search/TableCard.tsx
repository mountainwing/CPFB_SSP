import { Card, CardContent } from "@/components/ui/card"
import { Database, Calendar } from "lucide-react"

type Table = {
  name: string
  description: string
  category: string
  lastUpdated: string
}

type TableCardProps = {
  table: Table
}

export default function TableCard({ table }: TableCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 group h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 transition-colors duration-300">
            <Database className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="font-semibold text-sm">{table.name}</h3>
        </div>
        <div className="flex-grow space-y-2">
          <p className="text-xs text-gray-500 line-clamp-3">{table.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="bg-gray-100 px-2 py-1 rounded">{table.category}</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(table.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
