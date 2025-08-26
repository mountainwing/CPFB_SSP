"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Clock, X, TrendingUp, Hash } from "lucide-react"
import type { Integration } from "./integrations"

type SearchBarProps = {
  onSearch: (query: string) => void
  categories: string[]
  selectedCategories: string[]
  onSelectCategories: (categories: string[]) => void
  integrations: Integration[]
}

// Popular search terms (could be fetched from analytics)
const popularSearches = [
  "analytics",
  "email marketing",
  "payment",
  "social media",
  "productivity",
  "crm",
  "automation",
  "cloud storage",
  "communication",
  "design tools",
]

export default function SearchBar({
  onSearch,
  categories,
  selectedCategories,
  onSelectCategories,
  integrations,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Generate search suggestions based on input
  const suggestions = useMemo(() => {
    if (!searchValue.trim()) return []

    const query = searchValue.toLowerCase()
    // smart search suggestions array, contains the suggestion and type
    const integrationSuggestions: Array<{
      text: string
      type: "category" | "popular"
      match?: string
    }> = []

    // Add matching categories
    categories.forEach((category) => {
      if (category.toLowerCase().includes(query) && category !== "All") {
        integrationSuggestions.push({
          text: category,
          type: "category",
        })
      }
    })

    // Add matching popular searches
    popularSearches.forEach((term) => {
      if (term.toLowerCase().includes(query)) {
        integrationSuggestions.push({
          text: term,
          type: "popular",
        })
      }
    })

    // Remove duplicates and limit results
    const uniqueSuggestions = integrationSuggestions
      .filter(
        (suggestion, index, self) =>
          self.findIndex((s) => s.text.toLowerCase() === suggestion.text.toLowerCase()) === index,
      )
      .slice(0, 8)

    return uniqueSuggestions
  }, [searchValue, integrations, categories])

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("integrations-search-history")
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save search history to localStorage
  const saveSearchHistory = (history: string[]) => {
    localStorage.setItem("integrations-search-history", JSON.stringify(history))
  }

  // Add search term to history
  const addToHistory = (term: string) => {
    if (term.trim() && !searchHistory.includes(term.trim())) {
      const newHistory = [term.trim(), ...searchHistory].slice(0, 10) // Keep only last 10 searches
      setSearchHistory(newHistory)
      saveSearchHistory(newHistory)
    }
  }

  // Remove item from history
  const removeFromHistory = (term: string) => {
    const newHistory = searchHistory.filter((item) => item !== term)
    setSearchHistory(newHistory)
    saveSearchHistory(newHistory)
  }

  // Clear all history
  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("integrations-search-history")
  }

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    setSelectedSuggestionIndex(-1)

    if (value.trim()) {
      setShowSuggestions(true)
      setShowHistory(false)
    } else {
      setShowSuggestions(false)
      if (searchHistory.length > 0 && isFocused) {
        setShowHistory(true)
      }
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case "Enter":
          e.preventDefault()
          if (selectedSuggestionIndex >= 0) {
            handleSuggestionClick(suggestions[selectedSuggestionIndex].text)
          } else if (searchValue.trim()) {
            handleSearchSubmit()
          }
          break
        case "Escape":
          setShowSuggestions(false)
          setShowHistory(false)
          inputRef.current?.blur()
          break
      }
    } else if (e.key === "Enter" && searchValue.trim()) {
      handleSearchSubmit()
    }
  }

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      addToHistory(searchValue)
      setShowSuggestions(false)
      setShowHistory(false)
      inputRef.current?.blur()
      onSearch(searchValue) // <-- call parent search here
    }
  }

  // Handle clicking on suggestion
  const handleSuggestionClick = (term: string) => {
    setSearchValue(term)
    onSearch(term)
    addToHistory(term)
    setShowSuggestions(false)
    setShowHistory(false)
    inputRef.current?.blur()
  }

  // Handle clicking on history item
  const handleHistoryClick = (term: string) => {
    setSearchValue(term)
    onSearch(term)
    setShowHistory(false)
    inputRef.current?.blur()
  }

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true)
    if (searchValue.trim()) {
      setShowSuggestions(true)
    } else if (searchHistory.length > 0) {
      setShowHistory(true)
    }
  }

  // Handle input blur
  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding to allow clicking on suggestions/history
    setTimeout(() => {
      if (
        !suggestionsRef.current?.contains(e.relatedTarget as Node) &&
        !historyRef.current?.contains(e.relatedTarget as Node)
      ) {
        setShowSuggestions(false)
        setShowHistory(false)
        setIsFocused(false)
        setSelectedSuggestionIndex(-1)
      }
    }, 150)
  }

  // Handle category checkbox change
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      onSelectCategories(checked ? ["All"] : [])
    } else {
      let newCategories = [...selectedCategories]

      if (checked) {
        newCategories = newCategories.filter((cat) => cat !== "All")
        newCategories.push(category)
      } else {
        newCategories = newCategories.filter((cat) => cat !== category)
        if (newCategories.length === 0) {
          newCategories = ["All"]
        }
      }

      onSelectCategories(newCategories)
    }
  }

  // Clear all category filters
  const clearAllFilters = () => {
    onSelectCategories(["All"])
  }

  // Get icon for suggestion type
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "integration":
        return <Search className="w-4 h-4 text-blue-500" />
      case "category":
        return <Hash className="w-4 h-4 text-green-500" />
      case "popular":
        return <TrendingUp className="w-4 h-4 text-orange-500" />
      default:
        return <Search className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="relative mb-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search integrations..."
            className="w-full h-10 pl-10 pr-4"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-transparent"
          onClick={handleSearchSubmit}
          disabled={!searchValue.trim()}
        >
          <Search className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent relative">
              <Filter className="h-4 w-4" />
              {selectedCategories.length > 1 ||
              (selectedCategories.length === 1 && !selectedCategories.includes("All")) ? (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {selectedCategories.includes("All") ? 0 : selectedCategories.length}
                </span>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="p-0">Filter by Category</DropdownMenuLabel>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearAllFilters}>
                Clear
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <label htmlFor={`category-${category}`} className="flex-1 cursor-pointer text-sm">
                    {category}
                  </label>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-12 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          <div className="p-2">
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-2 py-2 rounded cursor-pointer transition-colors ${
                    index === selectedSuggestionIndex ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  {getSuggestionIcon(suggestion.type)}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-900 block truncate">{suggestion.text}</span>
                    {suggestion.match && <span className="text-xs text-gray-500">in {suggestion.match}</span>}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {suggestion.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && !showSuggestions && (
        <div
          ref={historyRef}
          className="absolute top-full left-0 right-12 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Recent searches
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                onClick={clearHistory}
              >
                Clear all
              </Button>
            </div>
            <div className="space-y-1">
              {searchHistory.map((term, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group hover:bg-gray-50 rounded px-2 py-1 cursor-pointer"
                  onClick={() => handleHistoryClick(term)}
                >
                  <span className="text-sm text-gray-700 flex-1">{term}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromHistory(term)
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
