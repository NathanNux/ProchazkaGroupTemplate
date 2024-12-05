import ONViewLogo from "@/components/Logo/onView";
import RotatingButton from "@/components/Sticky/buttons/RotatingButton";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/LoadProvider";
import Cursor from "@/components/Sticky/navbar/cursor";



export default function MainIntro () {
    const { firstLoad } = useGlobalContext()

    const introAnim = {
        initial: {
            scale: 1.5
        },
        enter: {
            scale: 1,
            transition: {
                delay: firstLoad ?  4.5 : 0.5,
                duration: 0.3,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }
    
    const rectAnim = (i) => ({
        initial: {
            x: '100%'
        },
        enter: () => ({
            x: '0%',
            transition:{
                delay: firstLoad ? 4.5 + (i * 0.2) : 0.5 + (i * 0.2),
                duration: 1.5,
                ease: [ 0.76, 0, 0.24, 1],
            }
        })
    })
    const introText = {
        initial: {
            opacity: 0,
            x: '100%'
        },
        enter: {
            opacity: 1,
            x: '0%',
            transition: {
                delay: firstLoad ? 5.3 : 1.3,
                duration: 1,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }
    const introbutton = {
        initial: {
            y: '200%'
        },
        enter: {
            y: '0%',
            transition: {
                delay: firstLoad ? 5.4 : 0.9,
                duration: 1,
                ease: [ 0.76, 0, 0.24, 1],
            }
        }
    }
    
    return (
        <section className="MainIntro">
            <motion.div 
                className="MainIntro__Wrapper"
                initial="initial"
                animate="enter"
                variants={introAnim}

            >
                <motion.div 
                    className="Heading"
                    initial='initial'
                    animate='enter'
                    variants={introText}
                >
                    <h1>BUDUJEME PRO LIDI <br/> 
                    STABILNÍ A KVALITNÍ <br/>
                    FINANČNÍ PORADENSTVÍ <br/>
                    UŽ PŘES <span>JEDNU DEKÁDU</span></h1>
                </motion.div>
                
                <div className="cover"/>
                <Image src='/assets/mainBackground.png' alt="background" fill={true}/>
                <div className="rect__container">
                    <div className="rect__Wrapper">
                        {Array.from({length: 3}, (_, i) => (
                            <motion.div
                            className="rect"
                            key={i}
                            initial="initial"
                            animate="enter"
                            variants={rectAnim(i)}
                        />
                        ))}
                    </div>
                    
                    <div className="rect__bottom">
                        <ONViewLogo />
                    </div>
                </div>
            </motion.div>
            <motion.div 
                    className="button__container"
                    initial='initial'
                    animate='enter'
                    variants={introbutton}
                >
                    <RotatingButton text=" - Nahlášení Pojistného - Nahlášení Pojistného" href="/"/>
            </motion.div>
        </section>

    )
}