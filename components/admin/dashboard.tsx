"use client";

import React from "react";
import { PremiumCard } from "@/components/ui/premium-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { BarChart3, TrendingUp, TrendingDown, Users, Bike, Clock, DollarSign } from "lucide-react";

const metrics = [
  {
    label: "Motos publicadas",
    value: 1280,
    icon: Bike,
    trend: 5.2,
    trendType: "up",
    color: "var(--accent)",
  },
  {
    label: "Usuarios activos",
    value: 432,
    icon: Users,
    trend: 2.1,
    trendType: "up",
    color: "#3b82f6",
  },
  {
    label: "Pendientes de aprobación",
    value: 17,
    icon: Clock,
    trend: -1.8,
    trendType: "down",
    color: "#f59e42",
  },
  {
    label: "Ingresos estimados",
    value: 4200,
    icon: DollarSign,
    trend: 7.4,
    trendType: "up",
    color: "#10b981",
    prefix: "$",
  },
];

const chartData = [
  { name: "Lun", Motos: 18, Usuarios: 6 },
  { name: "Mar", Motos: 22, Usuarios: 7 },
  { name: "Mié", Motos: 19, Usuarios: 5 },
  { name: "Jue", Motos: 25, Usuarios: 8 },
  { name: "Vie", Motos: 21, Usuarios: 6 },
  { name: "Sáb", Motos: 17, Usuarios: 4 },
  { name: "Dom", Motos: 15, Usuarios: 3 },
];

export function Dashboard() {
  return (
    <section>
      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <PremiumCard key={m.label} delay={i * 0.08} className="flex flex-col items-center py-8 group cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <m.icon size={28} color={m.color} className="drop-shadow-glow" />
              <span className="text-lg font-semibold text-primary-secondary tracking-tight">{m.label}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-4xl font-extrabold text-accent">
                <AnimatedCounter value={m.value} prefix={m.prefix} />
              </span>
              <Badge
                variant={m.trendType === "up" ? "default" : "destructive"}
                className={
                  m.trendType === "up"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                {m.trendType === "up" ? <TrendingUp size={14} className="inline mr-1" /> : <TrendingDown size={14} className="inline mr-1" />}
                {Math.abs(m.trend)}%
              </Badge>
            </div>
          </PremiumCard>
        ))}
      </div>

      {/* Gráfico y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PremiumCard className="p-6">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary flex items-center gap-2">
            <BarChart3 size={20} className="text-accent" /> Publicaciones y usuarios (últimos 7 días)
          </h2>
          <ChartContainer
            config={{
              Motos: { label: "Motos", color: "var(--accent)" },
              Usuarios: { label: "Usuarios", color: "#3b82f6" },
            }}
            className="w-full h-64"
          >
            <BarChart data={chartData} barGap={2} barCategoryGap={16}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="Motos" fill="var(--accent)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Usuarios" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>


        </PremiumCard>
        <PremiumCard className="p-6 flex flex-col justify-between">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary">Actividad reciente</h2>
          <ul className="space-y-3 text-primary-secondary text-sm">
            <li><span className="text-green-600 font-bold mr-1">+ </span>Nueva moto publicada: <b>Suzuki GN 125</b></li>
            <li><span className="text-blue-600 font-bold mr-1">+ </span>Usuario registrado: <b>juanperez</b></li>
            <li><span className="text-red-600 font-bold mr-1">- </span>Publicación eliminada: <b>Yamaha FZ</b></li>
            <li><span className="text-green-600 font-bold mr-1">+ </span>Moto aprobada: <b>Lifan E3</b></li>
          </ul>
          <div className="mt-6 flex flex-col gap-2 text-primary-secondary text-sm">
            <span>Promedio de publicaciones diarias: <b>22</b></span>
            <span>Usuarios nuevos esta semana: <b>38</b></span>
            <span>Ingresos este mes: <b>$1,200</b></span>
            <span>Motos destacadas: <b>12</b></span>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
