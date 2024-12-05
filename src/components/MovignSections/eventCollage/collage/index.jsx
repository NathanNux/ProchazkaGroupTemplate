import CustomImage from "@/components/Sticky/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
const events = [
    {
        name: 'Annual Company Meeting',
        time: '2023-11-15',
        photo: '/assets/reviewsBackground.png',
        alt: 'Annual Company Meeting',
        text: 'Join us for the annual company meeting where we discuss the achievements of the past year and plans for the future.'
    },
    {
        name: 'Team Building Retreat',
        time: '2023-12-05',
        photo: '/assets/reviewsBackground.png',
        alt: 'Team Building Retreat',
        text: 'A weekend retreat focused on team-building activities to strengthen collaboration and communication among team members.'
    },
    {
        name: 'Product Launch Event',
        time: '2024-01-20',
        photo: '/assets/reviewsBackground.png',
        alt: 'Product Launch Event',
        text: 'Be the first to see our new product line at the official launch event. Exciting presentations and demos await!'
    },
    {
        name: 'Quarterly Financial Review',
        time: '2024-02-10',
        photo: '/assets/reviewsBackground.png',
        alt: 'Quarterly Financial Review',
        text: 'An in-depth review of the company’s financial performance over the last quarter, followed by a Q&A session.'
    },
    {
        name: 'Team Building Workshop',
        time: '2024-03-15',
        photo: '/assets/reviewsBackground.png',
        alt: 'Team Building Workshop',
        text: 'Interactive workshops designed to enhance team dynamics and problem-solving skills through fun and engaging activities.'
    },
    {
        name: 'Customer Appreciation Day',
        time: '2024-04-25',
        photo: '/assets/reviewsBackground.png',
        alt: 'Customer Appreciation Day',
        text: 'A special event to thank our loyal customers with exclusive offers, giveaways, and a chance to meet the team.'
    },
    {
        name: 'Leadership Training Program',
        time: '2024-05-10',
        photo: '/assets/reviewsBackground.png',
        alt: 'Leadership Training Program',
        text: 'A comprehensive training program aimed at developing leadership skills among our employees.'
    },
    {
        name: 'Summer Picnic',
        time: '2024-06-20',
        photo: '/assets/reviewsBackground.png',
        alt: 'Summer Picnic',
        text: 'A fun-filled day at the park with games, food, and activities for employees and their families.'
    }
]

// Add these animation variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
        staggerChildren: 0.2,
        },
    },
};
  
const evenItemVariants = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
        duration: 0.6,
        ease: "easeOut",
        },
    },
};
  
const oddItemVariants = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
        duration: 0.6,
        ease: "easeOut",
        },
    },
};

export default function Collage() {
    const points = events.length / 2;
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ['start start', 'end start']
    });

    const eventPairs = [];
    for (let i = 0; i < events.length; i += 2) {
        eventPairs.push([
            events[i],
            events[i + 1] || null // Handle odd number of events
        ]);
    }

    const peakPoints = events.map((_, i) => {
        const segmentStart = i / points;
        return segmentStart;
    });

  const circleProgress = events.map((_, i) => {
    const peakPoint = peakPoints[i];
    const transitionRange = 0.05 / points;

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

  const segmentProgress = events.map((_, i) => {
    const peakPoint = peakPoints[i];
    const transitionRange = 0.9 / points;

    return useTransform(
      scrollYProgress,
      [peakPoint, peakPoint + transitionRange],
      ['-100%', '0%'],
      { clamp: true }
    );
  });
    return (
        <section className="Collage" ref={sectionRef}>
            <div className="ProgressBar__container__wrapper">
                    <div className='ProgressBar__container'>
                        <div className="Collage__progressBar">
                            <div className="Collage__progressBar_div">
                                {eventPairs.map((_, index) => {
                                const isLastItem = index === events.length - 1;
                                return (
                                    <div className="Collage__progressBar__Container" key={index}>
                                    <div className="circle" >
                                        <motion.div className="circle__inner" style={{ scale: circleProgress[index] }}></motion.div>
                                    </div>
                                    {!isLastItem && (
                                        <div className="segment">
                                        <motion.div className="segment__inner" style={{ y: segmentProgress[index] }}></motion.div>
                                        </div>
                                    )}
                                    </div>
                                );
                                })}
                            </div>
                        </div>
                    </div>
            </div> 

            <div className="content__wrapper">
                {eventPairs.map(([event1, event2], i) => {
                    return (
                        <motion.div 
                            className="content__container" 
                            key={i}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className="top__devider"/>
                            <div className="bottom__devider"/>
                            {/* First Event */}
                            <motion.div className="content">
                                <motion.div 
                                    className="contains"
                                    variants={i % 2 === 0 ? oddItemVariants : evenItemVariants}
                                >
                                    <motion.div 
                                        className="contains__header"
                                        variants={{
                                            hidden: { y: 20, opacity: 0 },
                                            visible: { 
                                                y: 0, 
                                                opacity: 1,
                                                transition: { delay: 0.2, duration: 0.5 }
                                            }
                                        }}
                                    >
                                        <h2>{event1.time}</h2>
                                        <p>|</p>
                                        <h3>{event1.name}</h3>
                                    </motion.div>
                                    <motion.div 
                                        className="image"
                                        variants={{
                                            hidden: { scale: 0.8, opacity: 0 },
                                            visible: { 
                                                scale: 1, 
                                                opacity: 1,
                                                transition: { delay: 0.3, duration: 0.5 }
                                            }
                                        }}
                                    > 
                                        <CustomImage src={event1.photo} altText={event1.alt}/>
                                    </motion.div>
                                </motion.div>
                                <motion.div 
                                    className="contains__text"
                                    variants={{
                                        hidden: { y: 30, opacity: 0 },
                                        visible: { 
                                            y: 0, 
                                            opacity: 1,
                                            transition: { delay: 0.4, duration: 0.5 }
                                        }
                                    }}
                                >
                                    <p>{event1.text}</p>
                                </motion.div>
                            </motion.div>

                            {/* Second Event (if exists) */}
                            {event2 && (
                                <motion.div className="content">
                                    <motion.div 
                                        className="contains"
                                        variants={i % 2 === 0 ? evenItemVariants : oddItemVariants}
                                    >
                                        <motion.div 
                                            className="contains__header"
                                            variants={{
                                                hidden: { y: 20, opacity: 0 },
                                                visible: { 
                                                    y: 0, 
                                                    opacity: 1,
                                                    transition: { delay: 0.2, duration: 0.5 }
                                                }
                                            }}
                                        >
                                            <h2>{event2.time}</h2>
                                            <p>|</p>
                                            <h3>{event2.name}</h3>
                                        </motion.div>
                                        <motion.div 
                                            className="image"
                                            variants={{
                                                hidden: { scale: 0.8, opacity: 0 },
                                                visible: { 
                                                    scale: 1, 
                                                    opacity: 1,
                                                    transition: { delay: 0.3, duration: 0.5 }
                                                }
                                            }}
                                        > 
                                            <CustomImage src={event2.photo} altText={event2.alt}/>
                                        </motion.div>
                                    </motion.div>
                                    <motion.div 
                                        className="contains__text"
                                        variants={{
                                            hidden: { y: 30, opacity: 0 },
                                            visible: { 
                                                y: 0, 
                                                opacity: 1,
                                                transition: { delay: 0.4, duration: 0.5 }
                                            }
                                        }}
                                    >
                                        <p>{event2.text}</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}