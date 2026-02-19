import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Motos", href: "/admin/motos" },
  { label: "Usuarios", href: "/admin/usuarios" },
  { label: "Pendientes", href: "/admin/pendientes" },
  { label: "Estadísticas", href: "/admin/estadisticas" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-surface-elevated border-r border-border shadow-lg">
      <div className="h-20 flex items-center justify-center border-b border-border">
        <span className="font-heading text-2xl font-bold text-accent tracking-tight">MotoMarket</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-4 py-2 font-body text-base text-primary-secondary hover:bg-accent/10 hover:text-accent transition-colors",
              // Aquí se puede agregar lógica de activo
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 text-xs text-primary-muted">
        &copy; {new Date().getFullYear()} MotoMarket Cuba
      </div>
    </aside>
  );
}
