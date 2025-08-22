import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export default function CodeInputPopup() {
  const [code, setCode] = useState("")

  const handleSubmit = () => {
    console.log("User submitted code:", code)
    // Do something with the code (save to DB, run API, etc.)
  }

  return (
    <div className="flex items-center justify-center">
      <Dialog>
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
            <Button variant="secondary">Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
