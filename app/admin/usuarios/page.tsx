import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const usuarios = [
  { id: 1, nombre: "Juan Pérez", usuario: "juanperez", email: "juan@mail.com", estado: "Activo" },
  { id: 2, nombre: "María Gómez", usuario: "maria88", email: "maria@mail.com", estado: "Activo" },
  { id: 3, nombre: "Carlos Martínez", usuario: "carlosm", email: "carlos@mail.com", estado: "Suspendido" },
];

export default function UsuariosAdmin() {
  return (
    <section>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading text-2xl font-bold text-primary">Gestión de usuarios</h1>
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="rounded-input border border-border bg-surface-elevated px-4 py-2 text-sm text-primary focus:border-accent focus:outline-none"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border text-primary-muted">
                  <th className="py-2 px-3 font-medium">Nombre</th>
                  <th className="py-2 px-3 font-medium">Usuario</th>
                  <th className="py-2 px-3 font-medium">Email</th>
                  <th className="py-2 px-3 font-medium">Estado</th>
                  <th className="py-2 px-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b border-border hover:bg-accent/5 transition-colors">
                    <td className="py-2 px-3 font-body text-primary">{u.nombre}</td>
                    <td className="py-2 px-3 text-primary-secondary">{u.usuario}</td>
                    <td className="py-2 px-3 text-primary-secondary">{u.email}</td>
                    <td className="py-2 px-3">
                      <span className={
                        u.estado === "Activo"
                          ? "bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs"
                          : "bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs"
                      }>
                        {u.estado}
                      </span>
                    </td>
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
