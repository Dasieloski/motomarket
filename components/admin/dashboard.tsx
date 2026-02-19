import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Motos publicadas", value: 1280 },
  { label: "Usuarios activos", value: 432 },
  { label: "Pendientes de aprobación", value: 17 },
  { label: "Ingresos estimados", value: "$4,200" },
];

export function Dashboard() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m) => (
          <Card key={m.label} className="bg-surface-elevated border-accent/10 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center py-8">
              <span className="text-3xl font-bold text-accent mb-2">{m.value}</span>
              <span className="text-sm text-primary-secondary font-medium uppercase tracking-wider">{m.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-elevated rounded-lg border border-border p-6 shadow">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary">Actividad reciente</h2>
          <ul className="space-y-3 text-primary-secondary text-sm">
            <li>+ Nueva moto publicada: Suzuki GN 125</li>
            <li>+ Usuario registrado: juanperez</li>
            <li>- Publicación eliminada: Yamaha FZ</li>
            <li>+ Moto aprobada: Lifan E3</li>
          </ul>
        </div>
        <div className="bg-surface-elevated rounded-lg border border-border p-6 shadow">
          <h2 className="font-heading text-lg font-bold mb-4 text-primary">Resumen de estadísticas</h2>
          <div className="flex flex-col gap-2 text-primary-secondary text-sm">
            <span>Promedio de publicaciones diarias: <b>22</b></span>
            <span>Usuarios nuevos esta semana: <b>38</b></span>
            <span>Ingresos este mes: <b>$1,200</b></span>
            <span>Motos destacadas: <b>12</b></span>
          </div>
        </div>
      </div>
    </section>
  );
}
