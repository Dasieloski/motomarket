"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TrendingUp, TrendingDown } from "lucide-react";

interface QuickStatProps {
  label: string;
  value: number;
  unit?: string;
  trend?: { value: number; direction: "up" | "down" };
  icon?: React.ComponentType<any>;
  color?: string;
}

export function QuickStat({
  label,
  value,
  unit = "",
  trend,
  icon: Icon,
  color = "var(--accent)",
}: QuickStatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-lg border border-border/50 bg-surface-elevated p-4 space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary-secondary uppercase tracking-wider">
          {label}
        </span>
        {Icon && <Icon size={16} color={color} />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-primary">
          <AnimatedCounter value={value} />
          {unit}
        </span>
        {trend && (
          <div
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              trend.direction === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend.direction === "up" ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface QuickStatsProps {
  stats: QuickStatProps[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
          <QuickStat {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
