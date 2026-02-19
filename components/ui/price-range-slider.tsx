import React from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, value, onChange }) => {
  const [localValue, setLocalValue] = React.useState<[number, number]>(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newValue: [number, number] = [...localValue] as [number, number];
    newValue[index] = Number(e.target.value);
    if (newValue[0] > newValue[1]) return;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs">
        <span>{min.toLocaleString()} USD</span>
        <span>{max.toLocaleString()} USD</span>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={e => handleChange(e, 0)}
          className="w-full accent-primary"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={e => handleChange(e, 1)}
          className="w-full accent-primary"
        />
      </div>
      <div className="flex justify-between text-xs">
        <span>Mín: {localValue[0].toLocaleString()} USD</span>
        <span>Máx: {localValue[1].toLocaleString()} USD</span>
      </div>
    </div>
  );
};
