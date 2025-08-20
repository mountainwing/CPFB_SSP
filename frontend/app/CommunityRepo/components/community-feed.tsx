import { CodePost } from "./code-post"

const posts = [
  {
    id: 1,
    author: {
      name: "Hoa Wing Beh",
      username: "@hoa_wing_beh_from.TP@cpf.litemail.gov.sg",
      avatar:  "/generic-person-avatar.png",
    },
    title: "post 1 test",
    description: "post 1 test",
    code: `post 1 test`,
    language: "test",
    tags: ["post 1 test"],
    stats: {
      views: "test",
      likes: "test",
      comments: "test",
    },
    timeAgo: "test",
  },
  {
    id: 2,
    author: {
      name: "Justin Choo",
      username: "@Justin_CHOO_from.INTERN@cpf.litemail.gov.sg",
      avatar: "/generic-person-avatar.png",
    },
    title: "test 2",
    description: "test 2",
    code: `test 2`,
    language: "test",
    tags: ["test"],
    stats: {
      views: "test",
      likes: "test",
      comments: "test",
    },
    timeAgo: "test",
  },
]

export function CommunityFeed() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Community Feed</h2>
        <p className="text-gray-400">Discover amazing code snippets shared by the CPFB community!</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <CodePost key={post.id} post={post} /> 
        ))}
      </div>
    </div>
  )
}
