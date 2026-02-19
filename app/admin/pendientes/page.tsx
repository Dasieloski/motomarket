import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const pendientes = [
  { id: 1, title: "Yamaha FZ", usuario: "maria88", fecha: "2026-02-17" },
  { id: 2, title: "Honda CB190R", usuario: "daniel", fecha: "2026-02-15" },
];

export default function PendientesAdmin() {
  return (
    <section>
      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">Publicaciones pendientes de aprobación</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border text-primary-muted">
                  <th className="py-2 px-3 font-medium">Título</th>
                  <th className="py-2 px-3 font-medium">Usuario</th>
                  <th className="py-2 px-3 font-medium">Fecha</th>
                  <th className="py-2 px-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-accent/5 transition-colors">
                    <td className="py-2 px-3 font-body text-primary">{p.title}</td>
                    <td className="py-2 px-3 text-primary-secondary">{p.usuario}</td>
                    <td className="py-2 px-3 text-primary-secondary">{p.fecha}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <button className="rounded bg-emerald-500 text-white px-3 py-1 text-xs font-medium shadow hover:bg-emerald-600 transition-colors">Aprobar</button>
                      <button className="rounded bg-red-500 text-white px-3 py-1 text-xs font-medium shadow hover:bg-red-600 transition-colors">Rechazar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
