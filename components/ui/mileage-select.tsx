import React from "react";

interface MileageSelectProps {
  value: string | "all";
  onChange: (value: string | "all") => void;
}

const options = [
  { value: "all", label: "Cualquier kilometraje" },
  { value: "<5000", label: "Menos de 5,000 km" },
  { value: "5000-20000", label: "5,000 - 20,000 km" },
  { value: ">20000", label: "Más de 20,000 km" },
];

export const MileageSelect: React.FC<MileageSelectProps> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-input border border-border bg-surface-elevated px-3 py-1 text-xs text-primary focus:border-accent focus:outline-none"
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
