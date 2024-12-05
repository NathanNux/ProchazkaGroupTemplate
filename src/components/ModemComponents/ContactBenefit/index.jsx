import ContactModem from "@/components/Modems/ContactModem"
import RoundButton from "@/components/Sticky/buttons/RoundButton"
import SVGButton from "@/components/Sticky/buttons/SvgButton"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const people = [
    {
        name: 'Václav Procházka',
        likes: '506',
        reviews: '25',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/cactus.webp',
        alt: 'person1',
    },
    {
        name: 'Ondřej Efenberk',
        likes: '340',
        reviews: '20',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/house.webp',
        alt: 'person2',
    },
    {
        name: 'Michaela Marková',
        likes: '400',
        reviews: '30',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/rock.webp',
        alt: 'person2',
    },
    {
        name: 'Tereza Marková',
        likes: '200',
        reviews: '20',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/water.webp',
        alt: 'person3',
    },
    {
        name: 'Zdeněk Kafka',
        likes: '158',
        reviews: '18',
        moto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        src: '/svg/tree.webp',
        alt: 'person4',
    }
]

const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

const menuVariants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        scaleX: 1,
        scaleY: 1,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
            // Sequence the animations
            scaleX: { duration: 0.3, ease: "circOut" },
            scaleY: { duration: 0.4, delay: 0.2, ease: "circOut" }
        }
    },
    closed: {
        clipPath: "inset(10% 50% 90% 50% round 10px)",
        scaleX: 0,
        scaleY: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3
        }
    }
}

export default function ContactBenefit() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(null)

    const activeIndex = previewIndex ?? currentIndex


    const nextPerson = () => {
        setCurrentIndex((prev) => (prev + 1) % people.length)
    }

    const prevPerson = () => {
        setCurrentIndex((prev) => (prev - 1 + people.length) % people.length)
    }

    // add useffect to block scrolling, that would mean save the position of this component and scroll back while animating out the modem component

    return (
        <section className="Contact">
            <div className="Contact__Personal">
                <div className="Contact__Personal__header">
                    <h3>
                        01
                    </h3>
                    <p>
                        Vy ještě nejste našimi klientý?<br />
                        Viditelně jsme Vás zaujmuli, to byste teď <br /> neprocházeli náš program, že?
                    </p>
                </div>

                <div className="Contact__Personal__choice">
                    <div className="Contact__Personal__choice__container">
                        {people.map(( person, i) => {
                            const { name, likes, reviews, moto, src, alt } = person

                            return (
                                <div className="Contact__Personal__choice__wrapper" key={i}>
                                    <div className="Contact__Personal__choice__image__container" key={i} style={{ zIndex: 1 + i}}>
                                        <AnimatePresence mode="wait">
                                            <motion.div 
                                                key={activeIndex}
                                                className="Contact__Personal__choice__image"
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Image src={people[activeIndex].src} alt={people[activeIndex].alt} fill={true}/>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                    <div className="Contact__Personal__choice__Data__container">
                                        <AnimatePresence mode="wait">
                                            <motion.div 
                                                key={activeIndex}
                                                className="Moto"
                                                initial={{ opacity: 0, y: -50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -50 }}
                                                transition={{ 
                                                    duration: 0.2,
                                                    delay: 0.05
                                                }}
                                            >
                                                <p>{people[activeIndex].moto}</p>
                                            </motion.div>
                                        </AnimatePresence>
                                        <div className="Reviews_stats">
                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={activeIndex}
                                                    className="ThumsUp"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ 
                                                        duration: 0.2,
                                                        delay: 0.1
                                                    }}
                                                >
                                                    <p>{people[activeIndex].likes}</p>
                                                    <Image  src='/thumbsUp.svg' alt="thumbsUp_icon" width={50} height={50}/> 
                                                </motion.div>
                                            </AnimatePresence>

                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={activeIndex}
                                                    className="Comments"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ 
                                                        duration: 0.2,
                                                        delay: 0.15
                                                    }}
                                                >
                                                    <p>{people[activeIndex].reviews}</p>
                                                    <Image  src='/thumbsUp.svg' alt="thumbsUp_icon" width={50} height={50}/> 
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                   
                    <div className="Contact__choice__Input">
                        <div  className="devider"/>
                        <div className="header">
                            <div className="index">
                                <h3>Γ</h3>
                            </div>
                            <p>Váš Poradce:</p>
                        </div>
                        <div className="person__container">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={activeIndex} 
                                    className="name"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ 
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <p>{people[activeIndex].name}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                        {/* <div className="buttons"
                        >
                            <button onClick={prevPerson}>
                                <Image src='/svg/arrow-left.svg' alt="left__arrow" width={30} height={30}/>
                            </button>
                            <div className="devider__vertical"/>
                            <button onClick={nextPerson}>
                                <Image src='/svg/arrow-right.svg' alt="left__right" width={30} height={30}/>
                            </button>
                        </div> */}
                        <div className="buttons">
                             <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="menu__button"
                            >
                                <motion.div
                                    variants={{
                                        open: { rotate: 180 },
                                        closed: { rotate: 90 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Image src='/svg/arrow-left.svg' alt="arrow" width={30} height={30} />
                                </motion.div>
                            </motion.button>

                            <motion.nav
                                initial={false}
                                animate={menuOpen ? "open" : "closed"}
                                className="person__menu"
                                variants={menuVariants}
                            >

                                <motion.ul
                                    variants={menuVariants}
                                    className="menu__list"
                                >
                                    {people.map((person, index) => (
                                        <motion.li
                                            key={index}
                                            variants={itemVariants}
                                            onHoverStart={() => setPreviewIndex(index)}
                                            onHoverEnd={() => setPreviewIndex(null)}
                                            onClick={() => {
                                                setCurrentIndex(index)
                                                setMenuOpen(false)
                                                setPreviewIndex(null)
                                            }}
                                        >
                                            {person.name}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.nav>
                        </div>
                        <div  className="devider"/>
                    </div>
                </div>

                <div className="Contact__Personal__addInfo">
                    <div className="addInfo__text">
                        <p>Potřebujete Poradit?</p>
                        <p> | 8-16</p>
                    </div>
                    <div className="addInfo__phoneNumber"
                        //here add a toast copy button
                    >
                        <p>+420 777 898 157</p>
                    </div>
                </div>
            </div>

            <div className="Contact__CTA">
                <div className="Contact__CTA__Header">
                    <h3>
                        JE TO NA VÁS... FINANČNÍ NEZÁVISLOST,<br /> NEBO DALŠÍ ROKY NA MÍSTĚ? PŘIDEJTE <br /> SE K NAŠIM 3000+ KLIENTŮM, KTEŘÍ UŽ <br /> DÁVNO ZAČALI VYHRÁVAT.
                    </h3>
                </div>

                <div className="Contact__CTA__buttons">
                    <div className="Contact__CTA__buttons__container">
                        <SVGButton src='/thumbsUp.svg' altText='CallIcon' />
                        <SVGButton src='/thumbsUp.svg' altText='TextIcon' />
                    </div>
                    <div className="devider"/>
                </div>

                <div className="Contact__CTA__optional">
                    <p className="infoText">Jste více tradiční?</p>
                    <div className="devider__vertical"/>
                    <div className="Button" onClick={() => setIsOpen(true)}>
                        <RoundButton href='/' text='Použít E-mail' />
                    </div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <ContactModem 
                        setIsOpen={setIsOpen} 
                        isOpen={isOpen}
                        people={people}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        activeIndex={activeIndex}
                        previewIndex={previewIndex}
                        setPreviewIndex={setPreviewIndex}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}