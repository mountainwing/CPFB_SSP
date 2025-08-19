import { Header } from "./components/header"
import { CommunityFeed } from "./components/community-feed"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <CommunityFeed />
      </main>
    </div>
  )
}
