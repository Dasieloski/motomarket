import React from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1.2, className, prefix = '', suffix = '' }) => {
  const controls = useAnimation();
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    controls.start({ count: value, transition: { duration, ease: [0.16, 1, 0.3, 1] } });
  }, [value, duration, controls]);

  return (
    <motion.span
      className={className}
      ref={nodeRef}
      animate={controls}
      initial={{ count: 0 }}
      onUpdate={latest => {
        setDisplay(Math.round(latest.count));
      }}
    >
      {prefix}{display.toLocaleString()}{suffix}
    </motion.span>
  );
};
