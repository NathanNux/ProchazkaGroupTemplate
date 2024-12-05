// index.jsx

import CustomImage from "@/components/Sticky/images";
import { useScroll, useTransform, motion, animate } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";


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
    const points = people.length;
    const sectionScroll = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalScrollHeight = points * 100; // 200vh per section
    const segment = totalScrollHeight / points;
    const scrollTimeout = useRef(null);
    const isSnapping = useRef(false);

    // Calculate peak opacity points for each image (where opacity = 1)
    const peakPoints = people.map((_, i) => {
        const segmentStart = i / points;
        const segmentCenter = segmentStart + (1 / (points * 2)); // Center of each segment
        return segmentCenter;
    });

    const { scrollYProgress } = useScroll({
        target: sectionScroll,
    });

    // Enhanced image opacity transforms with sharper transitions
    const imageOpacities = people.map((_, i) => {
        const peakPoint = peakPoints[i];
        const transitionRange = 0.6 / points; // Shorter transition for sharper effect

        if ( i === 0) {
            return useTransform(
                scrollYProgress,
                [
                    peakPoint - transitionRange, // Start fade in
                    peakPoint, // Peak opacity
                    peakPoint + transitionRange, // Start fade out
                ],
                [1, 1, 0],
                { clamp: true }
            );
        }
        if ( i === 7) {
            return useTransform(
                scrollYProgress,
                [
                    peakPoint - transitionRange, // Start fade in
                    peakPoint, // Peak opacity
                    peakPoint + transitionRange, // Start fade out
                ],
                [0, 1, 1],
                { clamp: true }
            );
        }
        return useTransform(
            scrollYProgress,
            [
                peakPoint - transitionRange, // Start fade in
                peakPoint, // Peak opacity
                peakPoint + transitionRange, // Start fade out
            ],
            [0, 1, 0],
            { clamp: true }
        );
    });
    // Circle and segment progress animations (adjusted to align with image peaks)
    const circleProgress = people.map((_, i) => {
        const peakPoint = peakPoints[i];
        const transitionRange = 0.1 / points;


        if (i === 0) {
            return useTransform(
                scrollYProgress,
                [
                    peakPoint - transitionRange,
                    peakPoint,
                ],
                [1, 1],
                { clamp: true }
            );
        }

        return useTransform(
            scrollYProgress,
            [
                peakPoint - transitionRange,
                peakPoint,
            ],
            [0, 1],
            { clamp: true }
        );
    });

    const segmentProgress = people.map((_, i) => {
        const peakPoint = peakPoints[i];
        const transitionRange = 1 / points;

        if (i === 7) {
            return useTransform(
                scrollYProgress,
                [
                    peakPoint,
                    peakPoint + (transitionRange / 2),
                ],
                ['100%', '0%'],
                { clamp: true }
            );
        }

        return useTransform(
            scrollYProgress,
            [
                peakPoint,
                peakPoint + transitionRange,
            ],
            ['100%', '0%'],
            { clamp: true }
        );
    });
    // Enhanced snap detection and animation
    useEffect(() => {
        const element = sectionScroll.current;
        if (!element) return;

        let isVisible = false;
    
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                isVisible = entry.isIntersecting;
            },
            { 
                threshold: 0.125
            }
        );
        

        const handleScroll = () => {
            if (!isVisible || isSnapping.current) return;
            console.log('scrolling');
            
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
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
                        velocity: 0,
                        onComplete: () => {
                            isSnapping.current = false;
                        },
                        onUpdate: (value) => {
                            // Use smooth scroll behavior
                            window.scrollTo({
                                top: value,
                                behavior: 'auto' // 'auto' is better here since animate() already handles the smoothing
                            });
                        },
                        // Add velocity for smoother start
                        velocity: scrollYProgress.getVelocity(),
                    });
                }
            }, 50);
        };

        observer.observe(element);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.unobserve(element);
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, [peakPoints, points]);

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
                                <motion.div key={i} className="BenefitRewards__MainInfo__header__container" style={{ zIndex: i + 1, opacity: imageOpacities[i]}}>
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
                                <motion.div key={i} className="BenefitRewards__SubInfo__intro" style={{ zIndex: i + 1, opacity: imageOpacities[i]}}>
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
                                style={{ opacity: imageOpacities[i] }}
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