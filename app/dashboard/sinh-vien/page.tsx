"use client"

import { useState } from "react"
import { Users } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Student {
  id: string
  name: string
  class: string
  email: string
  gender: string
  phone: string
  status: string
}

const initialData: Student[] = [
  { id: "SV001", name: "Nguyen Van A", class: "CNTT01", email: "nva@email.com", gender: "Nam", phone: "0901234567", status: "Dang hoc" },
  { id: "SV002", name: "Tran Thi B", class: "KTPM02", email: "ttb@email.com", gender: "Nu", phone: "0912345678", status: "Dang hoc" },
  { id: "SV003", name: "Le Van C", class: "DTVT03", email: "lvc@email.com", gender: "Nam", phone: "0923456789", status: "Bao luu" },
  { id: "SV004", name: "Pham Thi D", class: "CNTT01", email: "ptd@email.com", gender: "Nu", phone: "0934567890", status: "Dang hoc" },
]

const columns = [
  { key: "name" as const, label: "sinh vien" },
  { key: "class" as const, label: "lop" },
  { key: "email" as const, label: "Lien he" },
  { key: "gender" as const, label: "gioi tinh" },
  { key: "id" as const, label: "mssv" },
  { 
    key: "status" as const, 
    label: "Trang thai",
    render: (item: Student) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        item.status === "Dang hoc" 
          ? "bg-green-100 text-green-700" 
          : item.status === "Bao luu"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}>
        {item.status}
      </span>
    )
  },
]

export default function StudentPage() {
  const [data, setData] = useState(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    class: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
  })

  const stats = [
    { label: "tong so sinh vien", value: data.length },
    { label: "Dang hoc", value: data.filter(s => s.status === "Dang hoc").length },
    { label: "Bao luu", value: data.filter(s => s.status === "Bao luu").length },
    { label: "nghi hoc", value: data.filter(s => s.status === "Nghi hoc").length },
  ]

  const handleAdd = () => {
    setEditingStudent(null)
    setFormData({ id: "", name: "", class: "", email: "", gender: "", phone: "", password: "" })
    setIsDialogOpen(true)
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      id: student.id,
      name: student.name,
      class: student.class,
      email: student.email,
      gender: student.gender,
      phone: student.phone,
      password: "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (student: Student) => {
    setData(data.filter(s => s.id !== student.id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingStudent) {
      setData(data.map(s => s.id === editingStudent.id ? { ...s, ...formData, status: s.status } : s))
    } else {
      setData([...data, { ...formData, status: "Dang hoc" }])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Users className="w-7 h-7" />}
        title="Quan ly sinh vien"
        description="Quan ly danh sach cac khoa trong truong"
        addButtonLabel="them sinh vien"
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
              {editingStudent ? "Chinh sua sinh vien" : "Them sinh vien"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Ma sinh vien</Label>
              <Input
                id="studentId"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="rounded-full"
                disabled={!!editingStudent}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentClass">lop:</Label>
              <Input
                id="studentClass"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Gmail:</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gioi tinh</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Chon gioi tinh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nu">Nu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">sdt</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
