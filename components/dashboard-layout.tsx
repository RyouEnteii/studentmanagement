"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Building2,
  Network,
  School,
  BookOpen,
  Layers,
  PenTool,
  Users,
  GraduationCap,
  Settings,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/khoa", label: "Quan ly khoa", icon: Building2 },
  { href: "/dashboard/nganh", label: "Quan ly nganh", icon: Network },
  { href: "/dashboard/lop", label: "Quan ly lop hoc", icon: School },
  { href: "/dashboard/mon-hoc", label: "Quan ly mon hoc", icon: BookOpen },
  { href: "/dashboard/hoc-phan", label: "Lop hoc phan", icon: Layers },
  { href: "/dashboard/nhap-diem", label: "Nhap diem", icon: PenTool },
  { href: "/dashboard/sinh-vien", label: "Quan ly sinh vien", icon: Users },
  { href: "/dashboard/giang-vien", label: "Quan ly giang vien", icon: GraduationCap },
  { href: "/dashboard/cai-dat", label: "Cai dat", icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-primary text-primary-foreground z-50 flex items-center justify-between px-6">
        <h1 className="text-xl font-medium ml-56">
          Xin chao, ADmin he thong !!
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 bg-primary-foreground/20 rounded-full pl-3 pr-2 py-1.5 hover:bg-primary-foreground/30 transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/30 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              My Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-56 bg-sidebar border-r border-sidebar-border pt-16 flex flex-col z-40">
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout button */}
        <div className="p-3 border-t border-sidebar-border">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-primary border border-primary/30 hover:bg-primary/5 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
