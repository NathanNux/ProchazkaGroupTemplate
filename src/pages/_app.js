import "@/styles/globals.scss";
import '@/styles/styles.scss';
import { CursorRefProvider } from "@/context/CursorRefProvider";
import { LoadProvider } from "@/context/LoadProvider";
import { useEffect } from "react";
import Lenis from "lenis";
import Transition from "@/components/Transition";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.lenis = new Lenis({
      duration: 1.2,           
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      lerp: 0.8,               
      smoothWheel: true,       
      wheelMultiplier: 1,      
      touchMultiplier: 1,      
      autoRaf: false,          
    });

    function raf(time) {
      window.lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.lenis.destroy()
    }
  }, [])


  return (
    <LoadProvider>
      <CursorRefProvider>
        {/* <ScrollProvider> */}
          <Transition> 
            <Component {...pageProps} />
          </Transition>
        {/* </ScrollProvider> */}
      </CursorRefProvider>
    </LoadProvider>
  );
}