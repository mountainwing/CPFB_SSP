import { CodeCommunityHeader } from "../components/headers/RepoHeader";
import { CommunityFeed } from "../components/CommunityFeed";

export default function CommunityRepoPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <CodeCommunityHeader />
      <main className="container mx-auto px-4 py-6">
        <CommunityFeed />
      </main>
    </div>
  )
}
