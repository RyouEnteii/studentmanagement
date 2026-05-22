import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface PageHeaderProps {
  icon: ReactNode
  title: string
  description: string
  addButtonLabel: string
  onAdd: () => void
}

export function PageHeader({ icon, title, description, addButtonLabel, onAdd }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <div className="text-primary">{icon}</div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button onClick={onAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
        <Plus className="w-4 h-4" />
        {addButtonLabel}
      </Button>
    </div>
  )
}
