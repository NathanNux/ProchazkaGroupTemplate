// index.jsx

import CustomImage from "@/components/Sticky/images";
import { useScroll, useTransform, motion, animate } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useMemo, useCallback, useLayoutEffect } from "react";


const people = [
    {
        name: "John Doe",
        number: '01',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/tree.png",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '02',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/cactus.webp",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '03',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/house.webp",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '04',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/tree.png",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '05',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/rock.webp",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '06',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/tree.webp",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '07',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/water.webp",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
    {
        name: "Jane Doe",
        number: '08',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/tree.png",
        alt: "profile_pic1",
        photo1: '/assets/reviewsBackground.png',
        altText1: 'asset1',
        photo2: '/assets/reviewsBackground.png',
        altText2: 'asset2',
    },
]

export default function BenefitRewards() {
    const points = useMemo(() => people.length, []);
    const sectionScroll = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollTimeout = useRef(null);
    const isSnapping = useRef(false);
    const isVisible = useRef(false);

    const { scrollYProgress } = useScroll({
        target: sectionScroll,
    });

    // Calculate peak points with useMemo
    const peakPoints = useMemo(() => (
        Array.from({ length: points }, (_, i) => (i / points) + (1 / (points * 2)))
    ), [points]);
    

    // Helper functions
    const getOpacityInputs = useCallback((index) => {
        const peakPoint = (index / points) + (1 / (points * 2));
        return [peakPoint - 0.6/points, peakPoint, peakPoint + 0.6/points];
    }, [points]);

    const getCircleInputs = useCallback((index) => {
        const peakPoint = (index / points) + (1 / (points * 2));
        return [peakPoint - 0.1/points, peakPoint];
    }, [points]);

    const getSegmentInputs = useCallback((index) => {
        const peakPoint = (index / points) + (1 / (points * 2));
        return [peakPoint, peakPoint + (index === points - 1 ? 0.5/points : 1/points)];
    }, [points]);

    // Memoize input arrays
    const opacityInputs = useMemo(() => Array.from({ length: points }, (_, i) => getOpacityInputs(i)), [points, getOpacityInputs]);
    const circleInputs = useMemo(() => Array.from({ length: points }, (_, i) => getCircleInputs(i)), [points, getCircleInputs]);
    const segmentInputs = useMemo(() => Array.from({ length: points }, (_, i) => getSegmentInputs(i)), [points, getSegmentInputs]);

    // Create transforms
    const imageOpacities = opacityInputs.map((inputs, i) => 
        useTransform(scrollYProgress, inputs, i === 0 ? [1, 1, 0] : i === points - 1 ? [0, 1, 1] : [0, 1, 0], { clamp: true })
    );

    const circleProgress = circleInputs.map((inputs, i) => 
        useTransform(scrollYProgress, inputs, i === 0 ? [1, 1] : [0, 1], { clamp: true })
    );

    const segmentProgress = segmentInputs.map((inputs) => 
        useTransform(scrollYProgress, inputs, ['100%', '0%'], { clamp: true })
    );


    // Scroll handling with useCallback
    const handleScroll = useCallback(() => {
        if (!isVisible.current || isSnapping.current || !peakPoints || peakPoints.length === 0) return;
        
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            const element = sectionScroll.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const sectionScrollProgress = -rect.top / (rect.height - window.innerHeight);
            
            // Find closest peak point
            let closestPeak = peakPoints[0];
            let closestIndex = 0;
            let minDistance = Math.abs(sectionScrollProgress - peakPoints[0]);

            peakPoints.forEach((peak, index) => {
                const distance = Math.abs(sectionScrollProgress - peak);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPeak = peak;
                    closestIndex = index;
                }
            });

            const snapThreshold = 0.05 / points;
            if (minDistance > snapThreshold) {
                isSnapping.current = true;
                setActiveIndex(closestIndex);

                const targetScroll = window.scrollY + (closestPeak - sectionScrollProgress) * (rect.height - window.innerHeight);

                animate(window.scrollY, targetScroll, {
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    mass: 0.5,
                    bounce: 0,
                    onComplete: () => {
                        isSnapping.current = false;
                    },
                    onUpdate: (value) => {
                        window.scrollTo({
                            top: value,
                            behavior: 'auto'
                        });
                    },
                    velocity: scrollYProgress.getVelocity(),
                });
            }
        }, 50);
    }, [peakPoints, points, scrollYProgress]);

    // Intersection observer effect
    // Update useEffect to set isVisible.current
    useLayoutEffect(() => {
        const element = sectionScroll.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                isVisible.current = entry.isIntersecting; // Update the ref value
            },
            { threshold: [0, 0.125, 0.25, 0.5, 0.75, 1] }
        );

        observer.observe(element);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.unobserve(element);
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, [handleScroll]);

    return (
        <section className="BenefitRewards" ref={sectionScroll}>
            <motion.div className="BenefitRewards__wrapper">
                {/* Main Info Section */}
                <div className="BenefitRewards__MainInfo">
                    <div className="BenefitRewards__MainInfo__icons__container">
                       <p>A S KAŽDÝM KROKEM NOVÁ ÚROVEŇ. 
                       PROČ? - TVRDÍ DŘÍČI </p>
                    </div>   
                    <div className="BenefitRewards__MainInfo__header">
                        {people.map((person, i) => {
                            return (
                                <motion.div 
                                    key={i} 
                                    className="BenefitRewards__MainInfo__header__container" 
                                    style={{ 
                                        zIndex: i + 1, 
                                        opacity: imageOpacities[i]
                                    }}
                                >
                                    <Image src={person.photo1} alt={person.altText1} fill={true}/>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Sub Info Section */}
                <div className="BenefitRewards__SubInfo">
                    <div className="BenefitRewards__SubInfo__intro__container">
                        {people.map((person, i) => {
                            return (
                                <motion.div 
                                    key={i} 
                                    className="BenefitRewards__SubInfo__intro" 
                                    style={{ 
                                        zIndex: i + 1, 
                                        opacity: imageOpacities[i]
                                    }}
                                >
                                    <Image src={person.photo2} alt={person.altText2} fill={true}/>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="BenefitRewards__SubInfo__Moto">
                        <h2>
                            MÁTE CHUŤ
                            BÝT AKTIVNÍMI? TO,
                            JAK RYCHLE SE NA KONEC DOSTANETE, JE ČISTĚ NA VÁS.
                        </h2>
                    </div>
                </div>

                {/* Collage Section with Snapping Transform */}
                <div className="BenefitRewards__Collage">
                    <div className="BenefitRewards__Collage__pics">
                        {people.map((person, i) => (
                            <motion.div 
                                key={i} 
                                className="BenefitRewards__Collage__pic"
                                style={{ 
                                    opacity: imageOpacities[i]
                                }}
                            >
                                <Image src={person.src} alt={person.alt} fill={true}/>
                            </motion.div>
                        ))}
                    </div>
                    <div className="BenefitRewards__Collage__progress">
                        <div>
                            {Array.from({ length: points }).map((_, i) => (
                                <div key={`circle-${i}`} className="progress__circle">
                                    <motion.div style={{ scale: circleProgress[i] }}></motion.div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {Array.from({ length: points }).map((_, i) => (
                                <div key={`segment-outline-${i}`} className="progress__segment">
                                    <motion.div style={{ x: segmentProgress[i] }}></motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}