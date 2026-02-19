"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { LayoutDashboard, Bike, Users, Clock, BarChart3 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Motos", href: "/admin/motos", icon: Bike },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Pendientes", href: "/admin/pendientes", icon: Clock },
  { label: "Estadísticas", href: "/admin/estadisticas", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-surface-elevated border-r border-border shadow-xl">
      <div className="h-20 flex items-center justify-center border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
        <span className="font-heading text-2xl font-bold text-accent tracking-tight select-none">MotoMarket</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-2 font-body text-base transition-all duration-200",
                active
                  ? "bg-accent/10 text-accent shadow-glow-sm border border-accent/30"
                  : "text-primary-secondary hover:bg-accent/5 hover:text-accent border border-transparent"
              )}
            >
              <AnimatedIcon
                icon={item.icon}
                size={22}
                color={active ? "var(--accent)" : "var(--primary-secondary)"}
                className={cn(
                  "transition-all duration-200",
                  active ? "scale-110" : "group-hover:scale-105"
                )}
              />
              <span className="tracking-tight font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-xs text-primary-muted select-none">
        &copy; {new Date().getFullYear()} MotoMarket Cuba
      </div>
    </aside>
  );
}
