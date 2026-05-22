"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Faculty {
  id: string
  name: string
  classes: number
  students: number
  status: string
}

const initialData: Faculty[] = [
  { id: "K001", name: "Cong nghe thong tin", classes: 5, students: 120, status: "Hoat dong" },
  { id: "K002", name: "Kinh te", classes: 4, students: 80, status: "Hoat dong" },
  { id: "K003", name: "Dien tu vien thong", classes: 3, students: 60, status: "Hoat dong" },
]

const columns = [
  { key: "name" as const, label: "khoa" },
  { key: "classes" as const, label: "so lop" },
  { key: "students" as const, label: "sinh vien" },
  { 
    key: "status" as const, 
    label: "trang thai",
    render: (item: Faculty) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        item.status === "Hoat dong" 
          ? "bg-green-100 text-green-700" 
          : "bg-gray-100 text-gray-700"
      }`}>
        {item.status}
      </span>
    )
  },
]

export default function FacultyPage() {
  const [data, setData] = useState(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null)
  const [formData, setFormData] = useState({ id: "", name: "" })

  const stats = [
    { label: "tong so khoa", value: data.length },
    { label: "Dang hoat dong", value: data.filter(f => f.status === "Hoat dong").length },
    { label: "Tong lop hoc", value: data.reduce((acc, f) => acc + f.classes, 0) },
    { label: "So hoc vien", value: data.reduce((acc, f) => acc + f.students, 0) },
  ]

  const handleAdd = () => {
    setEditingFaculty(null)
    setFormData({ id: "", name: "" })
    setIsDialogOpen(true)
  }

  const handleEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty)
    setFormData({ id: faculty.id, name: faculty.name })
    setIsDialogOpen(true)
  }

  const handleDelete = (faculty: Faculty) => {
    setData(data.filter(f => f.id !== faculty.id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingFaculty) {
      setData(data.map(f => f.id === editingFaculty.id ? { ...f, ...formData } : f))
    } else {
      setData([...data, { ...formData, classes: 0, students: 0, status: "Hoat dong" }])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Building2 className="w-7 h-7" />}
        title="Quan ly khoa"
        description="Quan ly danh sach cac khoa trong truong"
        addButtonLabel="Them khoa"
        onAdd={handleAdd}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {editingFaculty ? "Chinh sua khoa" : "Them khoa moi"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="id">Ma khoa:</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="rounded-full"
                disabled={!!editingFaculty}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Ten khoa:</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-full"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Huy
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Them
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
