// FILE: components/ParallaxSection.jsx

import { useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useScrollContext } from "@/context/ScrollContext";

export default function ParallaxSection({ children, speed = 0.5 }) {
  const scroll = useScrollContext();
  const y = useMotionValue(0);
  const yTransform = useTransform(y, (value) => value * speed);

  useEffect(() => {
    y.set(scroll);
  }, [scroll, y]);

  return (
    <motion.div style={{ y: yTransform }}>
      {children}
    </motion.div>
  );
}