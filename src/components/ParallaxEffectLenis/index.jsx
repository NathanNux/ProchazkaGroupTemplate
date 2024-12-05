// FILE: components/ParallaxSection.jsx
// This is manual effect for parallax effect not relying on framer-motion and not relying on global context 
// Global context is not needed for this effect
// Global context version is also in this project folder
// inside the context folder is context for the parallax effect
// and the component for chilred for multiple parallax sections is also in the components folder
import { useEffect, useState } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import Lenis from "lenis";

export default function ParallaxSection({ children, speed = 0.5 }) {
  const [scroll, setScroll] = useState(0);
  const y = useMotionValue(0);
  const yTransform = useTransform(y, (value) => value * speed);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
      setScroll(e.scroll);
      y.set(e.scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [y, speed]);

  return (
    <motion.div style={{ y: yTransform }}>
      {children}
    </motion.div>
  );
}

// this will make the children of the ParallaxSection component move up and down based on the scroll position added to the y value
// the speed prop will determine how fast the children will move
// resulting in a parallax effect