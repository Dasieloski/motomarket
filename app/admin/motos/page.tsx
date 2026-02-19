import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const motos = [
  { id: 1, title: "Suzuki GN 125", estado: "Aprobada", usuario: "juanperez", fecha: "2026-02-18" },
  { id: 2, title: "Yamaha FZ", estado: "Pendiente", usuario: "maria88", fecha: "2026-02-17" },
  { id: 3, title: "Lifan E3", estado: "Aprobada", usuario: "carlosm", fecha: "2026-02-16" },
  { id: 4, title: "Honda CB190R", estado: "Eliminada", usuario: "daniel", fecha: "2026-02-15" },
];

export default function MotosAdmin() {
  return (
    <section>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading text-2xl font-bold text-primary">Gestión de motos</h1>
            <input
              type="text"
              placeholder="Buscar moto..."
              className="rounded-input border border-border bg-surface-elevated px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border text-primary-muted">
                  <th className="py-2 px-3 font-medium">Título</th>
                  <th className="py-2 px-3 font-medium">Estado</th>
                  <th className="py-2 px-3 font-medium">Usuario</th>
                  <th className="py-2 px-3 font-medium">Fecha</th>
                  <th className="py-2 px-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {motos.map((moto) => (
                  <tr key={moto.id} className="border-b border-border hover:bg-accent/5 transition-colors">
                    <td className="py-2 px-3 font-body text-primary">{moto.title}</td>
                    <td className="py-2 px-3">
                      <span className={
                        moto.estado === "Aprobada"
                          ? "bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs"
                          : moto.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs"
                          : "bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs"
                      }>
                        {moto.estado}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-primary-secondary">{moto.usuario}</td>
                    <td className="py-2 px-3 text-primary-secondary">{moto.fecha}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <button className="rounded bg-accent text-white px-3 py-1 text-xs font-medium shadow hover:bg-accent-hover transition-colors">Editar</button>
                      <button className="rounded bg-red-500 text-white px-3 py-1 text-xs font-medium shadow hover:bg-red-600 transition-colors">Eliminar</button>
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
