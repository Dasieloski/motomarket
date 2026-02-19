"use client";

import React from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminTable } from "@/components/admin/admin-table";
import { QuickStats } from "@/components/admin/quick-stats";
import { Check, X, Eye, AlertCircle, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const pendientes = [
  { id: 1, title: "Yamaha FZ", precio: "$2,200", usuario: "maria88", publicador: "Particular", fecha: "2026-02-17", prioridad: "Alta" },
  { id: 2, title: "Honda CB190R", precio: "$2,500", usuario: "daniel", publicador: "Personal", fecha: "2026-02-15", prioridad: "Media" },
  { id: 3, title: "Piaggio X9", precio: "$1,200", usuario: "pedro", publicador: "Personal", fecha: "2026-02-13", prioridad: "Baja" },
  { id: 4, title: "Suzuki Burgman", precio: "$3,500", usuario: "lucia", publicador: "Negocio", fecha: "2026-02-12", prioridad: "Alta" },
];

const columns = [
  {
    key: "title",
    label: "Título",
    sortable: true,
    render: (value: string) => <span className="font-medium text-primary">{value}</span>,
  },
  {
    key: "precio",
    label: "Precio",
    sortable: true,
  },
  {
    key: "usuario",
    label: "Publicador",
    sortable: true,
    render: (value: string) => <span className="text-primary-secondary">@{value}</span>,
  },
  {
    key: "prioridad",
    label: "Prioridad",
    sortable: true,
    render: (value: string) => {
      const colors: Record<string, string> = {
        Alta: "bg-red-100 text-red-600",
        Media: "bg-amber-100 text-amber-600",
        Baja: "bg-blue-100 text-blue-600",
      };
      return (
        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${colors[value]}`}>
          {value}
        </div>
      );
    },
  },
  {
    key: "fecha",
    label: "Fecha",
    sortable: true,
    render: (value: string) => <span className="text-primary-secondary text-sm">{value}</span>,
  },
];

export default function PendientesAdmin() {
  const totalPendientes = pendientes.length;
  const altaPrioridad = pendientes.filter((p) => p.prioridad === "Alta").length;
  const mediaPrioridad = pendientes.filter((p) => p.prioridad === "Media").length;

  const renderActions = (row: any) => (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-all text-xs font-medium"
      >
        <Eye size={14} />
        Ver
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all text-xs font-medium"
      >
        <Check size={14} />
        Aprobar
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all text-xs font-medium"
      >
        <X size={14} />
        Rechazar
      </motion.button>
    </>
  );

  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10 bg-surface">
          <QuickStats
            stats={[
              { label: "Total pendientes", value: totalPendientes, icon: Clock, color: "var(--accent)", trend: { value: 3, direction: "down" } },
              { label: "Alta prioridad", value: altaPrioridad, icon: Zap, color: "#ef4444", trend: { value: 42, direction: "up" } },
              { label: "Media prioridad", value: mediaPrioridad, icon: AlertCircle, color: "#f59e42" },
              { label: "Tiempo promedio", value: 2, unit: " h", icon: Clock, color: "#3b82f6" },
            ]}
          />
          <AdminTable title="Publicaciones pendientes de aprobación" columns={columns} data={pendientes} renderActions={renderActions} />
        </main>
      </div>
    </div>
  );
}
