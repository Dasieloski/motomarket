import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function EstadisticasAdmin() {
  return (
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
  );
}
