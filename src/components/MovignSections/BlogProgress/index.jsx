import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
    {
        title: 'Blog Progress1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        link: '/blogprogress'
    },
    {
        title: 'Blog Progress2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        link: '/blogprogress'
    },{
        title: 'Blog Progress3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        link: '/blogprogress'
    },{
        title: 'Blog Progress4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        link: '/blogprogress'
    },{
        title: 'Blog Progress5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        link: '/blogprogress'
    }
]

export default function BlogProgress() {
    const sectionRef = useRef(null);
    const paragraphRefs = useRef([]);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
    });
    const points = paragraphs.length;

    const handleCircleClick = (index) => {
        const targetElement = paragraphRefs.current[index];
        if (targetElement) {
            if (window.lenis) {
                window.lenis.scrollTo(targetElement, {
                    offset: 0,
                    immediate: false,
                    duration: 0.3,
                    easing: (t) => t,
                });
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Create peak points array without callback
    const peakPoints = new Array(points).fill(null).map((_, i) => {
        const segmentStart = i / points;
        return segmentStart + (1 / (points * 2));
    });

    // Create circle progress transforms array without callbacks
    const circleProgress = new Array(points).fill(null).map((_, i) => {
        const peakPoint = peakPoints[i];
        const transitionRange = 0.1 / points;

        if (i === 0) {
            return useTransform(
                scrollYProgress,
                [peakPoint - transitionRange, peakPoint],
                [1, 1],
                { clamp: true }
            );
        }

        return useTransform(
            scrollYProgress,
            [peakPoint - transitionRange, peakPoint],
            [0, 1],
            { clamp: true }
        );
    });

    // Create segment progress transforms array without callbacks
    const segmentProgress = new Array(points).fill(null).map((_, i) => {
        const peakPoint = peakPoints[i];
        const transitionRange = 0.1 / points;

        return useTransform(
            scrollYProgress,
            [peakPoint, peakPoint + transitionRange],
            ['-100%', '0%'],
            { clamp: true }
        );
    });
    return (
        <section className="Blog__MainPage" ref={sectionRef}>
            <div className="Blog__MainPage__Container">
                {paragraphs.map((paragraph, index) => {
                    return (
                        <div 
                            key={index} 
                            className="Blog__MainPage__Paragraph" 
                            id={paragraph.link}
                            ref={(el) => (paragraphRefs.current[index] = el)}
                        >
                            <h2>{paragraph.title}</h2>
                            <p>{paragraph.content}</p>

                        </div>
                    )
                })}
            </div>
            <div className="Blog__MainPage__progressBar">
                <div className="Blog__MainPage__progressBar_div">
                    {paragraphs.map((paragraph, index) => {
                        const isLastItem = index === paragraphs.length - 1;
                        return (
                            <div className="Blog__MainPage__progressBar__Container" key={index}>
                                <div className="circle" onClick={() => handleCircleClick(index)}>
                                    <motion.div className="circle__inner" style={{ scale: circleProgress[index]}}></motion.div>
                                </div>
                                { !isLastItem && <div className="segment">
                                    <motion.div className="segment__inner" style={{ y: segmentProgress[index]}}></motion.div>
                                </div> }
                            </div> 
                        )
                    })}
                </div>
                
            </div>
        </section>
    )
}