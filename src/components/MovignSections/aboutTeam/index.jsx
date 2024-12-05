// index.jsx

import { useScroll, useTransform, motion, animate } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const icons = [
    { name: "facebook", src: "/thumbsUp.png" },
    { name: "instagram", src: "/thumbsUp.png" },
    { name: "linkedin", src: "/thumbsUp.png" },
    { name: "twitter", src: "/thumbsUp.png" },
    { name: "youtube", src: "/thumbsUp.png" },
    { name: "mainWeb", src: "/thumbsUp.png" }
];


const people = [
    {
        name: "John Doe",
        number: '01',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/tree.png",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '02',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/cactus.webp",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '03',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/house.webp",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '04',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            src: "/svg/tree.png",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '05',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/rock.webp",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '06',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/tree.webp",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '07',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/water.webp",
        alt: "profile_pic1"
    },
    {
        name: "Jane Doe",
        number: '08',
        moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/svg/tree.png",
        alt: "profile_pic1"
    },
]

export default function AboutTeam() {
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
        const segmentStart = i / points;
        const segmentEnd = (i + 1) / points;
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
        <section className="AboutTeam" ref={sectionScroll}>
            <motion.div className="AboutTeam__wrapper">
                {/* Main Info Section */}
                <div className="AboutTeam__MainInfo">
                    <div className="AboutTeam__MainInfo__header">
                        {people.map((person, i) => {
                            return (
                                <motion.div key={i} className="AboutTeam__MainInfo__header__container" style={{ zIndex: i + 1, opacity: imageOpacities[i]}}>
                                    <h2>{person.name}</h2>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="AboutTeam__MainInfo__text__container">
                        <div className="AboutTeam__MainInfo__text">
                            {people.map((person, i) => {
                                return (
                                    <motion.div key={i} className="AboutTeam__MainInfo__text__container__text" style={{ zIndex: i + 1, opacity: imageOpacities[i]}}>
                                        <p>{person.number}</p>
                                        <p>{person.moto}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="AboutTeam__MainInfo__icons__container">
                        <div className="AboutTeam__MainInfo__icons">
                            {icons.map((icon, i) => (
                                <div key={i} className="AboutTeam__MainInfo__icon">
                                    <Image
                                        src={icon.src}
                                        alt={icon.name}
                                        width={30}
                                        height={30}
                                        priority
                                        quality={100}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sub Info Section */}
                <div className="AboutTeam__SubInfo">
                    <div className="AboutTeam__SubInfo__intro__container">
                        <div className="AboutTeam__SubInfo__intro">
                            <p>01</p>
                            <p>Jednoduché Moto</p>
                        </div>
                    </div>
                    <div className="AboutTeam__SubInfo__Moto">
                        <h2>
                            CELKOVÉ HESLO PRO KOMPLETNĚ CELÝ TÝM KTERÉHO SE DRŽÍ NEBO
                            VIZE CO CHTEJÍ VYTVOŘIT 
                        </h2>
                    </div>
                </div>

                {/* Collage Section with Snapping Transform */}
                <div className="AboutTeam__Collage">
                    <div className="AboutTeam__Collage__pics">
                        {people.map((person, i) => (
                            <motion.div 
                                key={i} 
                                className="AboutTeam__Collage__pic"
                                style={{ opacity: imageOpacities[i] }}
                            >
                                <Image src={person.src} alt={person.alt} fill={true}/>
                            </motion.div>
                        ))}
                    </div>
                    <div className="AboutTeam__Collage__progress">
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

///// old scroll effect: 

// index.jsx

// import { useScroll, useTransform, motion, useSpring, animate } from "framer-motion";
// import Image from "next/image";
// import { useRef, useEffect, useState } from "react";

// const icons = [
//     { name: "facebook", src: "/thumbsUp.png" },
//     { name: "instagram", src: "/thumbsUp.png" },
//     { name: "linkedin", src: "/thumbsUp.png" },
//     { name: "twitter", src: "/thumbsUp.png" },
//     { name: "youtube", src: "/thumbsUp.png" },
//     { name: "mainWeb", src: "/thumbsUp.png" }
// ];


// const people = [
//     {
//         name: "John Doe",
//         number: '01',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/tree.png",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '02',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/cactus.webp",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '03',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/house.webp",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '04',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             src: "/svg/tree.png",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '05',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/rock.webp",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '06',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/tree.webp",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '07',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/water.webp",
//         alt: "profile_pic1"
//     },
//     {
//         name: "Jane Doe",
//         number: '08',
//         moto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         src: "/svg/tree.png",
//         alt: "profile_pic1"
//     },
// ]

// export default function AboutTeam() {
//     const points = people.length;
//     const sectionScroll = useRef(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const totalScrollHeight = points * 200; // 200vh per section
//     const segment = totalScrollHeight / points;
//     const scrollTimeout = useRef(null);
//     const isSnapping = useRef(false);
//     const fraction = 0.5; // Keep your original fraction

//     // Calculate snap positions at the center of each image segment
//     const snapPositions = Array.from({ length: points }, (_, i) => i * segment + segment / 2);
//     const snapPoints = snapPositions.map(pos => pos / totalScrollHeight);

//     const { scrollYProgress } = useScroll({
//         target: sectionScroll,
//     });

//     // Keep your original image opacity transforms
//     const imageOpacities = people.map((_, i) => {
//         const start = i / points;
//         const end = (i + 1) / points;
//         const segmentFraction = (end - start) * fraction;
    
//         if (i === 0) {
//             return useTransform(
//                 scrollYProgress,
//                 [start, start + segmentFraction],
//                 [1, 1],
//                 { clamp: true }
//             );
//         }
//         return useTransform(
//             scrollYProgress,
//             [start, start + segmentFraction],
//             [0, 1],
//             { clamp: true }
//         );
//     });

//     // Keep your original segment progress
//     const segmentProgress = people.map((_, i) => {
//         const start = i / points;
//         const end = (i + 1) / points;
//         const segmentFraction = (end - start) * fraction;
//         const segmentStart = start + segmentFraction;
//         const segmentEnd = end;
    
//         return useTransform(
//             scrollYProgress,
//             [segmentStart, segmentEnd],
//             ['100%', '0%'],
//             { clamp: true }
//         );
//     });

//     // Keep your original circle progress
//     const circleProgress = people.map((_, i) => {
//         const start = (i - 0.5) / points;
//         const end = (i + 0.5) / points;
//         const segmentFraction = (end - start) * fraction;
    
//         if (i === 0) {
//             return useTransform(
//                 scrollYProgress,
//                 [start + segmentFraction, end],
//                 [1, 1],
//                 { clamp: true }
//             );
//         }
    
//         return useTransform(
//             scrollYProgress,
//             [start + segmentFraction, end],
//             [0, 1],
//             { clamp: true }
//         );
//     });

//     // Enhanced snapping logic
//     useEffect(() => {
//         const element = sectionScroll.current;
//         if (!element) return;

//         const handleScroll = () => {
//             if (isSnapping.current) return;
            
//             clearTimeout(scrollTimeout.current);
//             scrollTimeout.current = setTimeout(() => {
//                 const currentScroll = element.scrollTop;
//                 const viewportHeight = window.innerHeight;
//                 const snapPointsPx = snapPositions.map(pos => (pos / 100) * viewportHeight);
                
//                 // Find closest snap point
//                 let closestPoint = snapPointsPx[0];
//                 let closestIndex = 0;
//                 let minDistance = Math.abs(currentScroll - snapPointsPx[0]);

//                 snapPointsPx.forEach((point, index) => {
//                     const distance = Math.abs(currentScroll - point);
//                     if (distance < minDistance) {
//                         minDistance = distance;
//                         closestPoint = point;
//                         closestIndex = index;
//                     }
//                 });

//                 // Only snap if we're not too close to current position
//                 const snapThreshold = segment * 0.1; // 10% of segment height
//                 if (minDistance > snapThreshold) {
//                     isSnapping.current = true;
//                     setActiveIndex(closestIndex);

//                     animate(element.scrollTop, closestPoint, {
//                         type: "spring",
//                         stiffness: 400, // Strong snap
//                         damping: 40,
//                         mass: 0.8,
//                         onComplete: () => {
//                             isSnapping.current = false;
//                         },
//                         onUpdate: (value) => {
//                             element.scrollTop = value;
//                         },
//                     });
//                 }
//             }, 50);
//         };

//         // Wheel event handler for more precise control
//         const handleWheel = (e) => {
//             if (isSnapping.current) {
//                 e.preventDefault();
//                 return;
//             }

//             const currentScroll = element.scrollTop;
//             const viewportHeight = window.innerHeight;
//             const snapPointsPx = snapPositions.map(pos => (pos / 100) * viewportHeight);
//             const direction = e.deltaY > 0 ? 1 : -1;

//             // Find current snap point index
//             const currentIndex = snapPointsPx.findIndex(point => 
//                 Math.abs(currentScroll - point) < (segment * 0.1)
//             );

//             if (currentIndex !== -1) {
//                 const targetIndex = Math.max(0, Math.min(points - 1, currentIndex + direction));
//                 if (targetIndex !== currentIndex) {
//                     isSnapping.current = true;
//                     setActiveIndex(targetIndex);
                    
//                     animate(element.scrollTop, snapPointsPx[targetIndex], {
//                         type: "spring",
//                         stiffness: 400,
//                         damping: 40,
//                         mass: 0.8,
//                         onComplete: () => {
//                             isSnapping.current = false;
//                         },
//                         onUpdate: (value) => {
//                             element.scrollTop = value;
//                         },
//                     });
//                 }
//                 e.preventDefault();
//             }
//         };

//         element.addEventListener("scroll", handleScroll, { passive: true });
//         element.addEventListener("wheel", handleWheel, { passive: false });

//         return () => {
//             element.removeEventListener("scroll", handleScroll);
//             element.removeEventListener("wheel", handleWheel);
//             clearTimeout(scrollTimeout.current);
//         };
//     }, [snapPositions, points, segment]);

//     return (
//         <section className="AboutTeam" ref={sectionScroll}>
//             <motion.div className="AboutTeam__wrapper">
//                 {/* Main Info Section */}
//                 <div className="AboutTeam__MainInfo">
//                     <div className="AboutTeam__MainInfo__header">
//                         {people.map((person, i) => {
//                             return (
//                                 <motion.div key={i} className="AboutTeam__MainInfo__header__container" style={{ zIndex: i + 1, opacity: imageOpacities[i]}}>
//                                     <h2>{person.name}</h2>
//                                 </motion.div>
//                             )
//                         })}
//                     </div>
//                     <div className="AboutTeam__MainInfo__text__container">
//                         <div className="AboutTeam__MainInfo__text">
//                             {people.map((person, i) => {
//                                 return (
//                                     <motion.div key={i} className="AboutTeam__MainInfo__text__container__text" style={{ zIndex: i + 1, opacity: imageOpacities[i]}}>
//                                         <p>{person.number}</p>
//                                         <p>{person.moto}</p>
//                                     </motion.div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                     <div className="AboutTeam__MainInfo__icons__container">
//                         <div className="AboutTeam__MainInfo__icons">
//                             {icons.map((icon, i) => (
//                                 <div key={i} className="AboutTeam__MainInfo__icon">
//                                     <Image
//                                         src={icon.src}
//                                         alt={icon.name}
//                                         width={30}
//                                         height={30}
//                                         priority
//                                         quality={100}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sub Info Section */}
//                 <div className="AboutTeam__SubInfo">
//                     <div className="AboutTeam__SubInfo__intro__container">
//                         <div className="AboutTeam__SubInfo__intro">
//                             <p>01</p>
//                             <p>Jednoduché Moto</p>
//                         </div>
//                     </div>
//                     <div className="AboutTeam__SubInfo__Moto">
//                         <h2>
//                             CELKOVÉ HESLO PRO KOMPLETNĚ CELÝ TÝM KTERÉHO SE DRŽÍ NEBO
//                             VIZE CO CHTEJÍ VYTVOŘIT 
//                         </h2>
//                     </div>
//                 </div>

//                 {/* Collage Section with Snapping Transform */}
//                 <div className="AboutTeam__Collage">
//                     <div className="AboutTeam__Collage__pics">
//                         {people.map((person, i) => (
//                             <motion.div 
//                                 key={i} 
//                                 className="AboutTeam__Collage__pic"
//                                 style={{ opacity: imageOpacities[i] }}
//                             >
//                                 <Image src={person.src} alt={person.alt} width={100} height={100}/>
//                             </motion.div>
//                         ))}
//                     </div>
//                     <div className="AboutTeam__Collage__progress">
//                         <div>
//                             {Array.from({ length: points }).map((_, i) => (
//                                 <div key={`circle-${i}`} className="progress__circle">
//                                     <motion.div style={{ scale: circleProgress[i] }}></motion.div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div>
//                             {Array.from({ length: points }).map((_, i) => (
//                                 <div key={`segment-outline-${i}`} className="progress__segment">
//                                     <motion.div style={{ x: segmentProgress[i] }}></motion.div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </section>
//     )
// }