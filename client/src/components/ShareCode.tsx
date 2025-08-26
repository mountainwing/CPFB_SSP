// ShareCode.tsx
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type UploadResponse = { ok: boolean; blobUrl?: string; blobName?: string; url?: string; path?: string; error?: string }

interface Props {
  onSuccess?: (info: { blobUrl: string; blobName: string }) => void
  handleServiceClick?: (serviceId: string) => void
  serviceId?: string // e.g. "CPFBCodeCommunity"
}

export default function CodeInputPopup({ onSuccess, handleServiceClick, serviceId = "CPFBCodeCommunity" }: Props) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!code.trim()) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`http://localhost:3001/api/upload/text`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "user-email": "hoa_wing_beh@techpass.gov.sg",
        },
        body: code,
      })
      const text = await res.text()
      const json = text ? JSON.parse(text) : null
      if (!res.ok || !json?.ok) throw new Error(json?.error || `HTTP ${res.status}`)

      const blobUrl = json.blobUrl ?? json.url
      const blobName = json.blobName ?? json.path

      // 🔔 success UI
      toast({ title: "Shared successfully!", description: blobName })
      onSuccess?.({ blobUrl, blobName })
      handleServiceClick?.(serviceId) // 👈 trigger your service click
      setOpen(false)
      setCode("")
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message || "Unknown error", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Share Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paste your code here</DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Type or paste your code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-40 font-mono"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!code.trim() || isSubmitting}>
              {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading…</>) : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
