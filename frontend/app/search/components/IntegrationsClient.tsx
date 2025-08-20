"use client"

import { useState, useMemo } from "react"
import { categories, integrations } from "../../data/integrations"
import CategoryFilter from "./CategoryFilter"
import SearchBar from "./SearchBar"
import IntegrationGrid from "./IntegrationGrid"
import Pagination from "./Pagination"

const ITEMS_PER_PAGE = 30

export default function IntegrationsClient() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const categoryMatch = selectedCategories.includes("All") || selectedCategories.includes(integration.category)
      const searchMatch =
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && searchMatch
    })
  }, [selectedCategories, searchQuery])

  const totalPages = Math.ceil(filteredIntegrations.length / ITEMS_PER_PAGE)
  const paginatedIntegrations = filteredIntegrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  // Convert multiple categories to single category for sidebar compatibility
  const selectedCategory = selectedCategories.includes("All") ? "All" : selectedCategories[0] || "All"

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategories([category])
          setCurrentPage(1)
        }}
      /> */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 space-y-4">
          <h1 className="text-2xl font-bold">Search</h1>
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query)
              setCurrentPage(1)
            }}
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategories={(categories) => {
              setSelectedCategories(categories)
              setCurrentPage(1)
            }}
            integrations={integrations}
          />
        </div>
        <div className="flex-1 overflow-auto px-4 md:px-6">
          <IntegrationGrid integrations={paginatedIntegrations} />
        </div>
        <div className="p-4 md:p-6 border-t">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </main>
    </div>
  )
}
