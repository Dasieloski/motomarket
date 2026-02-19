import React from "react";

interface BrandSelectProps {
  brands: string[];
  value: string | "all";
  onChange: (value: string | "all") => void;
}

export const BrandSelect: React.FC<BrandSelectProps> = ({ brands, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="rounded-input border border-border bg-surface-elevated px-3 py-1 text-xs text-primary focus:border-accent focus:outline-none"
    >
      <option value="all">Todas las marcas</option>
      {brands.map(b => (
        <option key={b} value={b}>{b}</option>
      ))}
    </select>
  );
};
