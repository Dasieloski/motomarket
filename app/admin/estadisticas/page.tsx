"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { QuickStats } from "@/components/admin/quick-stats";
import { TrendingUp, TrendingDown, BarChart3, Users } from "lucide-react";

export default function EstadisticasAdmin() {
  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10 bg-surface">
          <QuickStats
            stats={[
              { label: "Total publicaciones", value: 342, icon: BarChart3, color: "var(--accent)", trend: { value: 12, direction: "up" } },
              { label: "Usuarios activos", value: 89, icon: Users, color: "#3b82f6", trend: { value: 8, direction: "down" } },
              { label: "Índice de aprobación", value: 94, unit: "%", icon: TrendingUp, color: "#10b981" },
              { label: "Conversión", value: 3.2, unit: "%", icon: TrendingUp, color: "#8b5cf6" },
            ]}
          />
          <section>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h1 className="font-heading text-2xl font-bold text-primary mb-4">Estadísticas básicas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-surface-elevated rounded-lg border border-border p-6 shadow">
                    <h2 className="font-heading text-lg font-bold mb-2 text-primary">Publicaciones por mes</h2>
                    <div className="h-32 flex items-end gap-2">
                      {/* Gráfico de barras simulado */}
                      {[12, 18, 22, 15, 30, 25, 28].map((v, i) => (
                        <div key={i} className="flex flex-col items-center justify-end">
                          <div className="w-6 bg-accent rounded-t h-[${v * 3}px] transition-all" />
                          <span className="text-xs text-primary-muted mt-1">{['Ene','Feb','Mar','Abr','May','Jun','Jul'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface-elevated rounded-lg border border-border p-6 shadow">
                    <h2 className="font-heading text-lg font-bold mb-2 text-primary">Usuarios activos por semana</h2>
                    <div className="h-32 flex items-end gap-2">
                      {[8, 12, 10, 15, 18, 14, 20].map((v, i) => (
                        <div key={i} className="flex flex-col items-center justify-end">
                          <div className="w-6 bg-accent/70 rounded-t h-[${v * 5}px] transition-all" />
                          <span className="text-xs text-primary-muted mt-1">{['S1','S2','S3','S4','S5','S6','S7'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
