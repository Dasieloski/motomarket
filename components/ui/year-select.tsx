import React from "react";

interface YearSelectProps {
  min: number;
  max: number;
  value: number | "all";
  onChange: (value: number | "all") => void;
}

export const YearSelect: React.FC<YearSelectProps> = ({ min, max, value, onChange }) => {
  const years = Array.from({ length: max - min + 1 }, (_, i) => max - i);
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value === "all" ? "all" : Number(e.target.value))}
      className="rounded-input border border-border bg-surface-elevated px-3 py-1 text-xs text-primary focus:border-accent focus:outline-none"
    >
      <option value="all">Todos los años</option>
      {years.map(y => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  );
};
