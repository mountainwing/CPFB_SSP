import { Bell, Settings, Calendar, Database, BarChart3, Search, FileText, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-700 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">SSP Data Platform</h1>
            <p className="text-sm text-slate-300">Shared dashboard | Read-only access</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-600">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-600">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Announcements Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Announcements & Updates</h2>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">Platform Enhancement Update</h3>
                  <p className="text-blue-800 mb-3">
                    We have enhanced the <span className="font-semibold">UDPload</span> app. Check out the guide{" "}
                    <a href="#" className="text-blue-600 underline hover:text-blue-700">
                      here
                    </a>
                    .
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-blue-700 mb-3">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      New visualization widgets
                    </span>
                    <span className="flex items-center gap-1">🛡️ Enhanced security</span>
                    <span className="flex items-center gap-1">🚀 Improved performance</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Please visit our{" "}
                    <a href="#" className="text-blue-600 underline hover:text-blue-700">
                      help center
                    </a>{" "}
                    for more information or contact support at{" "}
                    <a href="mailto:support@platform.gov" className="text-blue-600 underline hover:text-blue-700">
                      support@platform.gov
                    </a>{" "}
                    for assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Upcoming events</h2>
            <Button variant="link" className="text-blue-600 hover:text-blue-700">
              See all events
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        (DEI Learning) From Struggle to Strength : Suppo
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>Location: L8 Conference Rooms</p>
                    <p>Date and Time: 12 Aug 2025 3:00pm to 4:...</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Services Dashboard Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Data Services Dashboard</h2>
            <p className="text-gray-600">Access your enterprise analytics and data management tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Databricks Workspace</CardTitle>
                <CardDescription className="text-sm">
                  Unified analytics platform for big data and machine learning workloads
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Launch</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Power BI</CardTitle>
                <CardDescription className="text-sm">
                  Business analytics solution for data visualization and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Launch</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Purview Data Catalog</CardTitle>
                <CardDescription className="text-sm">
                  Data governance and cataloging service for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/search"><Button className="w-full bg-blue-600 hover:bg-blue-700">Launch</Button></Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Data Readiness</CardTitle>
                <CardDescription className="text-sm">
                  Check data quality and preparation status for analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Launch</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
