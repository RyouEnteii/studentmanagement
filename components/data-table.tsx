"use client"

import { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  onFilter?: () => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchPlaceholder = "Tim kiem",
  onSearch,
  onFilter,
  onEdit,
  onDelete,
  currentPage = 1,
  totalPages = 2,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <Card className="bg-muted/50 shadow-sm">
      <CardContent className="p-5">
        {/* Search and Filter */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 h-11 rounded-lg bg-card border-border"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={onFilter}
            className="h-11 px-4 gap-2 border-border bg-card"
          >
            <Filter className="w-4 h-4" />
            Loc
          </Button>
        </div>

        {/* Table Header */}
        <div className="grid gap-4 py-3 px-4 bg-muted rounded-t-lg border-b border-border" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr) auto` }}>
          {columns.map((col) => (
            <div key={String(col.key)} className="text-sm font-medium text-foreground">
              {col.label}
            </div>
          ))}
          <div className="w-24" />
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 py-4 px-4 items-center bg-card hover:bg-muted/30 transition-colors"
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr) auto` }}
            >
              {columns.map((col) => (
                <div key={String(col.key)} className="text-sm text-foreground">
                  {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                </div>
              ))}
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center hover:bg-cyan-200 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(item)}
                    className="w-9 h-9 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4 text-sm text-muted-foreground">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1 hover:text-foreground disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>{currentPage} , {totalPages}</span>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1 hover:text-foreground disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
