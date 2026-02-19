"use client";

import React from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminTable } from "@/components/admin/admin-table";
import { QuickStats } from "@/components/admin/quick-stats";
import { Edit, Trash2, CheckCircle, Clock, XCircle, Bike, Eye, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const motos = [
  { id: 1, title: "Suzuki GN 125", precio: "$1,500", estado: "Aprobada", usuario: "juanperez", vistas: 234, fecha: "2026-02-18" },
  { id: 2, title: "Yamaha FZ", precio: "$2,200", estado: "Pendiente", usuario: "maria88", vistas: 0, fecha: "2026-02-17" },
  { id: 3, title: "Lifan E3", precio: "$1,800", estado: "Aprobada", usuario: "carlosm", vistas: 145, fecha: "2026-02-16" },
  { id: 4, title: "Honda CB190R", precio: "$2,500", estado: "Eliminada", usuario: "daniel", vistas: 89, fecha: "2026-02-15" },
  { id: 5, title: "Kymco DJ 110", precio: "$950", estado: "Aprobada", usuario: "ana_m", vistas: 567, fecha: "2026-02-14" },
  { id: 6, title: "Piaggio X9", precio: "$1,200", estado: "Pendiente", usuario: "pedro", vistas: 0, fecha: "2026-02-13" },
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
    key: "estado",
    label: "Estado",
    sortable: true,
    render: (value: string) => {
      const stateConfig: Record<string, { icon: React.ComponentType<any>; color: string; bg: string }> = {
        Aprobada: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
        Pendiente: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
        Eliminada: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
      };
      const config = stateConfig[value] || stateConfig.Aprobada;
      const Icon = config.icon;
      return (
        <div className={`inline-flex items-center gap-2 ${config.bg} ${config.color} px-3 py-1 rounded-full text-xs font-medium`}>
          <Icon size={14} />
          {value}
        </div>
      );
    },
  },
  {
    key: "usuario",
    label: "Usuario",
    sortable: true,
  },
  {
    key: "vistas",
    label: "Vistas",
    sortable: true,
    render: (value: number) => <span className="font-medium text-accent">{value}</span>,
  },
  {
    key: "fecha",
    label: "Fecha",
    sortable: true,
  },
];

export default function MotosAdmin() {
  const totalPublicaciones = motos.length;
  const aprobadas = motos.filter((m) => m.estado === "Aprobada").length;
  const pendientes = motos.filter((m) => m.estado === "Pendiente").length;
  const totalVistas = motos.reduce((sum, m) => sum + m.vistas, 0);

  const renderActions = (row: any) => (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all text-xs font-medium"
      >
        <Edit size={14} />
        Editar
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all text-xs font-medium"
      >
        <Trash2 size={14} />
        Eliminar
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
              { label: "Total publicado", value: totalPublicaciones, icon: Bike, color: "var(--accent)", trend: { value: 12, direction: "up" } },
              { label: "Aprobadas", value: aprobadas, icon: CheckCircle, color: "#10b981", trend: { value: 5, direction: "up" } },
              { label: "Pendientes", value: pendientes, icon: Clock, color: "#f59e42", trend: { value: 2, direction: "down" } },
              { label: "Vistas totales", value: totalVistas, icon: Eye, color: "#3b82f6" },
            ]}
          />
          <AdminTable title="Gestión de motos" columns={columns} data={motos} renderActions={renderActions} />
        </main>
      </div>
    </div>
  );
}
