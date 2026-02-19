"use client";

import React from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminTable } from "@/components/admin/admin-table";
import { QuickStats } from "@/components/admin/quick-stats";
import { Shield, AlertCircle, CheckCircle, Trash2, Edit, Users, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const usuarios = [
  { id: 1, nombre: "Juan Pérez", usuario: "juanperez", email: "juan@mail.com", estado: "Activo", verificado: true, publicaciones: 5 },
  { id: 2, nombre: "María Gómez", usuario: "maria88", email: "maria@mail.com", estado: "Activo", verificado: true, publicaciones: 8 },
  { id: 3, nombre: "Carlos Martínez", usuario: "carlosm", email: "carlos@mail.com", estado: "Suspendido", verificado: false, publicaciones: 2 },
  { id: 4, nombre: "Ana López", usuario: "ana_m", email: "ana@mail.com", estado: "Activo", verificado: true, publicaciones: 12 },
  { id: 5, nombre: "Pedro Díaz", usuario: "pedro", email: "pedro@mail.com", estado: "Activo", verificado: false, publicaciones: 1 },
];

const columns = [
  {
    key: "nombre",
    label: "Nombre",
    sortable: true,
    render: (value: string) => <span className="font-medium text-primary">{value}</span>,
  },
  {
    key: "usuario",
    label: "Usuario",
    sortable: true,
    render: (value: string) => <span className="text-primary-secondary">@{value}</span>,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    render: (value: string) => <span className="text-primary-secondary text-xs">{value}</span>,
  },
  {
    key: "verificado",
    label: "Verificado",
    sortable: true,
    render: (value: boolean) => (
      <div className={`inline-flex items-center gap-2 ${value ? "text-emerald-600" : "text-amber-600"}`}>
        {value ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
        {value ? "Sí" : "No"}
      </div>
    ),
  },
  {
    key: "publicaciones",
    label: "Publicaciones",
    sortable: true,
    render: (value: number) => <span className="font-medium text-accent">{value}</span>,
  },
  {
    key: "estado",
    label: "Estado",
    sortable: true,
    render: (value: string) => (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
        value === "Activo" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
      }`}>
        {value === "Activo" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
        {value}
      </div>
    ),
  },
];

export default function UsuariosAdmin() {
  const totalUsuarios = usuarios.length;
  const activos = usuarios.filter((u) => u.estado === "Activo").length;
  const verificados = usuarios.filter((u) => u.verificado).length;
  const totalPublicaciones = usuarios.reduce((sum, u) => sum + u.publicaciones, 0);

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
              { label: "Total usuarios", value: totalUsuarios, icon: Users, color: "var(--accent)", trend: { value: 8, direction: "up" } },
              { label: "Activos", value: activos, icon: CheckCircle, color: "#10b981", trend: { value: 15, direction: "up" } },
              { label: "Verificados", value: verificados, icon: UserCheck, color: "#3b82f6", trend: { value: 20, direction: "up" } },
              { label: "Total publicaciones", value: totalPublicaciones, icon: Shield, color: "#f59e42" },
            ]}
          />
          <AdminTable title="Gestión de usuarios" columns={columns} data={usuarios} renderActions={renderActions} />
        </main>
      </div>
    </div>
  );
}
