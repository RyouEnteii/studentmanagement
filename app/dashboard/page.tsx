"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const statsCards = [
  { label: "tong sinh vien", value: "200" },
  { label: "so mon hoc", value: "8" },
  { label: "so lop hoc", value: "20" },
]

const monthlyData = [
  { month: "T1", students: 30 },
  { month: "T2", students: 45 },
  { month: "T3", students: 35 },
  { month: "T4", students: 50 },
  { month: "T5", students: 40 },
  { month: "T6", students: 60 },
  { month: "T7", students: 55 },
  { month: "T8", students: 70 },
  { month: "T9", students: 65 },
  { month: "T10", students: 80 },
  { month: "T11", students: 75 },
  { month: "T12", students: 85 },
]

const facultyData = [
  { name: "CNTT", value: 35, color: "#f9a8d4" },
  { name: "Kinh te", value: 25, color: "#fbbf24" },
  { name: "Dien tu", value: 20, color: "#2dd4bf" },
  { name: "Co khi", value: 12, color: "#3b82f6" },
  { name: "Xay dung", value: 8, color: "#8b5cf6" },
]

const recentStudents = [
  { id: 1, name: "Nguyen Van A", class: "CNTT01" },
  { id: 2, name: "Tran Thi B", class: "KTPM02" },
  { id: 3, name: "Le Van C", class: "DTVT03" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.label} className="bg-card shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <Card className="lg:col-span-2 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Thong ke so sinh vien theo thang
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-primary">
              Phan bo theo Khoa
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={facultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {facultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">
            Sinh vien moi
          </CardTitle>
          <p className="text-sm text-muted-foreground">Danh sach sinh vien vua dang ky</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.class}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
