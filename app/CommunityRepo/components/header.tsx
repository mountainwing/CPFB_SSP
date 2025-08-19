import { Search, Filter, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const languages = [
  { name: "JavaScript", active: true },
  { name: "React", active: false },
  { name: "Python", active: false },
  { name: "TypeScript", active: false },
  { name: "CSS", active: false },
  { name: "Node.js", active: false },
]

export function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{"</>"}</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">CPFBCodeCommunity</h1>
              <p className="text-gray-400 text-xs">Share, learn, and grow together</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search code snippets..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Share Code
            </Button>
            <div className="flex items-center gap-2 text-white">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/generic-user-avatar.png" />
                <AvatarFallback>BH</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">Beh Hoa Wing</div>
                <div className="text-xs text-gray-400">PRO Account</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Language Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 pb-3">
          <span className="text-gray-400 text-sm mr-4">Popular:</span>
          {languages.map((lang) => (
            <Button
              key={lang.name}
              variant={lang.active ? "default" : "ghost"}
              size="sm"
              className={
                lang.active
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
