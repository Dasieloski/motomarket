import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function RoadmapPage() {
  // Lee el archivo markdown desde el sistema de archivos
  const filePath = path.join(process.cwd(), 'ANALISIS_ESTRATEGICO_CUBA.md');
  const markdown = fs.readFileSync(filePath, 'utf8');

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Análisis Estratégico & Roadmap</h1>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </main>
  );
}
