"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumCard } from "@/components/ui/premium-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface AdminTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
  renderActions?: (row: any) => React.ReactNode;
}

export function AdminTable({
  title,
  columns,
  data,
  onSearch,
  onFilter,
  renderActions,
}: AdminTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key];
      return (
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
  );

  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <section>
      <PremiumCard className="p-6">
        {/* Encabezado con búsqueda */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-primary">{title}</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-secondary" size={18} />
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 bg-surface-elevated border border-border rounded-lg focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tabla mejorada */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border/50">
                {columns.map((col) => (
                  <th key={col.key} className="py-3 px-4 text-left">
                    <button
                      onClick={() => col.sortable && handleSort(col.key)}
                      className="flex items-center gap-2 font-heading font-semibold text-sm text-primary-secondary hover:text-primary transition-colors"
                    >
                      {col.label}
                      {col.sortable && (
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform",
                            sortKey === col.key
                              ? sortDir === "asc"
                                ? "rotate-0"
                                : "rotate-180"
                              : "opacity-50"
                          )}
                        />
                      )}
                    </button>
                  </th>
                ))}
                {renderActions && <th className="py-3 px-4 text-left font-heading font-semibold text-sm text-primary-secondary">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, idx) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-border/30 hover:bg-accent/5 transition-colors"
                    >
                      {columns.map((col) => (
                        <td key={`${row.id}-${col.key}`} className="py-3 px-4 text-sm">
                          <div className="text-primary">
                            {col.render
                              ? col.render(row[col.key], row)
                              : row[col.key]}
                          </div>
                        </td>
                      ))}
                      {renderActions && (
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            {renderActions(row)}
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (renderActions ? 1 : 0)}
                      className="py-8 px-4 text-center text-primary-secondary"
                    >
                      No hay resultados
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-primary-secondary">
              {paginatedData.length > 0
                ? `Mostrando ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
                    currentPage * itemsPerPage,
                    sortedData.length
                  )} de ${sortedData.length}`
                : "0 resultados"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-border bg-surface-elevated text-primary-secondary hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        currentPage === page
                          ? "bg-accent text-white"
                          : "bg-surface-elevated text-primary-secondary hover:bg-accent/10"
                      )}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-border bg-surface-elevated text-primary-secondary hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </PremiumCard>
    </section>
  );
}
