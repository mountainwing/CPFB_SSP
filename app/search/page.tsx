import { Suspense } from "react"
import IntegrationsClient from "./components/IntegrationsClient"
import Loading from "./loading"

export default function IntegrationsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <IntegrationsClient />
    </Suspense>
  )
}
