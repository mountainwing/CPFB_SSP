export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar skeleton */}
      {/* <aside className="w-48 bg-white shadow-md flex flex-col h-screen">
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="space-y-1 p-4 pt-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </aside> */}

      {/* Main content skeleton */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
          <div className="relative">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border p-4 space-y-2">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 md:p-6 border-t">
          <div className="flex justify-center items-center space-x-2">
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
