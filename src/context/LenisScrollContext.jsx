// FILE: context/ScrollContext.js

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      wheelMultiplier: 2,
      touchMultiplier: 2,
      smoothWheel: true,
      autoRaf: false,
    });

    lenis.on('scroll', (e) => {
      setScroll(e.scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={scroll}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);