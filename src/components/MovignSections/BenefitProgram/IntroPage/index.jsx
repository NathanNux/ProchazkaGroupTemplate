import ONViewLogo from "@/components/Logo/onView";
import { useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function IntroPageBenefit() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'], // Fixed offset syntax
    });

    const height = useTransform(
        scrollYProgress,
        [0,1],
        ['140vh','100vh']
    );

    const borderRadiusValue = useTransform(
        scrollYProgress,
        [0, 0.9, 1],
        ['45%', "0%", '0%']
    );

    return(
        <motion.section 
            className="IntroPageBenefit" 
            ref={sectionRef}
            style={{
                height,
                borderBottomLeftRadius: borderRadiusValue,
                borderBottomRightRadius: borderRadiusValue,
            }}
        > 
            <Image src="/background/benefit.png" alt="Benefit Program Intro Page" fill={true} />
            <div className="cover"/>
            <div className="text">
                <h1 className="heading"><span>BENEFIT </span>PROGRAM</h1>
                <div className="Logo">
                    <ONViewLogo />
                </div>
            </div>
        </motion.section>
    );
}