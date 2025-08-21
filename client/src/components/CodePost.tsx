import { Eye, Heart, MessageCircle, Share, Copy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Post {
  id: number
  author: {
    name: string
    username: string
    avatar: string
  }
  title: string
  description: string
  code: string
  language: string
  tags: string[]
  stats: {
    // string for now, change to number if needed
    views: string
    likes: string
    comments: string
  }
  timeAgo: string
}

interface CodePostProps {
  post: Post
}

export function CodePost({ post }: CodePostProps) {
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      CSS: "bg-blue-500",
      Python: "bg-yellow-500",
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-600",
      React: "bg-cyan-500",
    }
    return colors[language] || "bg-gray-500"
  }

  return (
    <Card className="bg-gray-800 border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{post.author.name}</span>
              <span className="text-gray-400 text-sm">{post.author.username}</span>
            </div>
            <div className="text-gray-400 text-sm">{post.timeAgo}</div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium text-white ${getLanguageColor(post.language)}`}>
          {post.language}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
        <p className="text-gray-400 mb-4">{post.description}</p>

        {/* Code Block */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 relative">
          <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-gray-400 hover:text-white">
            <Copy className="w-4 h-4" />
          </Button>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{post.code}</code>
          </pre>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-purple-400 text-sm hover:text-purple-300 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-6 text-gray-400">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{post.stats.views}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 p-0">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-sm">{post.stats.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">{post.stats.comments}</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
