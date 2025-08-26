import { useState, useEffect, useCallback } from "react"
import SearchBar from "./SearchBar"
import TableGrid from "./TableGrid"
import Pagination from "./Pagination"
import type { Table } from "./integrations"

const ITEMS_PER_PAGE = 50 // Increased since rows take less space

export default function IntegrationsClient() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [tables, setTables] = useState<Table[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Fetch categories on mount
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/databricks/columns")
        if (response.ok) {
          const data = await response.json()
          setColumns(data)
        }
      } catch (error) {
        console.error("Failed to fetch columns:", error)
      }
    }

    fetchColumns()
  }, [])

  // Fetch tables when searchQuery
const fetchTables = useCallback(async (query: string) => {
  setIsLoading(true)
  try {
    const response = await fetch("http://localhost:8000/api/databricks/findtable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column: query.trim(), // send searchbar value as "column"
      }),
    })

    if (response.ok) {
      const data = await response.json()
      setTables(data)
      setCurrentPage(1)
    } else {
      console.error("Server error:", await response.text())
      setTables([])
    }
  } catch (error) {
    console.error("Failed to fetch tables:", error)
    setTables([])
  } finally {
    setIsLoading(false)
    setIsInitialLoading(false)
  }
}, [])

  const totalPages = Math.ceil(tables.length / ITEMS_PER_PAGE)
  const paginatedTables = tables.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Database Tables</h1>
            <div className="text-sm text-gray-500">
              {!isLoading && tables.length > 0 && (
                <span>
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(currentPage * ITEMS_PER_PAGE, tables.length)} of {tables.length} tables
                </span>
              )}
            </div>
          </div>
          <SearchBar
            onSearch={fetchTables}
            categories={columns}
            selectedCategories={selectedCategories}
            onSelectCategories={setSelectedCategories}
            integrations={[]} // Not needed for suggestions anymore
          />
        </div>
        <div className="flex-1 overflow-auto px-4 md:px-6 pb-4">
          <TableGrid tables={paginatedTables} isLoading={isInitialLoading || isLoading} />
        </div>
        {!isLoading && tables.length > 0 && (
          <div className="p-4 md:p-6 border-t bg-white">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </main>
    </div>
  )
}
