import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Magnetic from '../../Magnetic'
import GetChars from './getChars'

const links = [
    {
        href: '/',
        text: 'DOMOV'
    },
    {
        href: '/benefit-program',
        text: 'BENEFIT PROGRAM'
    },
    {
        href: '/prilezitosti',
        text: 'PŘÍLEŽITOSTI'
    },
    {
        href: '/about',
        text: 'NÁŠ PŘÍBĚH'
    },
    {
        href: '/recenze',
        text: 'RECENZE'
    },
    {
        href: '/contact',
        text: 'KONTAKT'
    },
]

const addLinks = [
    {
        href: '/privacy-policy',
        text: 'Ochrana osobních údajů'
    },
    {
        href: '/cookies',
        text: 'Cookies'
    }
]

const icons = [
    {
        href: 'https://www.facebook.com/',
        src: '/facebook.svg',
        text: 'Facebook'
    },
    {
        href: 'https://www.instagram.com/',
        src: '/instagram.svg',
        text: 'Instagram'
    },
    {
        href: 'https://www.linkedin.com/',
        src: '/linkedin.svg',
        text: 'LinkedIn'
    },
    {
        href: 'https://www.twitter.com/',
        src: '/twitter.svg',
        text: 'Twitter'
    },
    {
        href: 'https://www.youtube.com/',
        src: '/youtube.svg',
        text: 'YouTube'
    }
]

const rows = [
    {
        number: 0,
    },
    {
        number: 1,
    },
    {
        number: 2,
    }
]



const textSlide = {
    initial: {
        y: 0,
    },
    enter: (i) => ({
        y: '100%',
        opacity: 1,
        transition: {duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[0]}
    }),
    exit: (i) => ({
        y: 0,
        opacity: 0.65,
        transition: {duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[1]}
    })
}
const hoverText = {
    hover: (i) => ({
        scale: 1.2,
        color: '#00F0FF',
        transition: {
            duration: 0.1,
            delay: i[0],
            ease: [0.76, 0, 0.24, 1]  
        }
    })
}

// I need to somehow combine those 2 animations, so I used copilot and it turns out you can just add another object to the anim defition
// NOTE: this anim is very advanced, there are keyframes that match scale and color, we need initial color and the set color, and look at the reverse anim carefully, the kayframes % of the anim is reversed correctly, and the keyframes must be at the end on the reverse
// Also to split the words into spaces and natural look, there must be the condition there is now. 
// Also it must have inline-block display and margin-right to look natural and the scale to work inside the <p> tag


const textShow = {
    initial: {
        opacity: 0,
        y: '100%'
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
            delay: (i * 0.05) + 0.6
        }
    }),
    exit: (i) => ({
        opacity: 0,
        y: '100%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: ((links.length - i - 1) * 0.05)
        }
    })
};

//I googled this anim if its even possible to make anim like this, but it turns out you can onHover prop state

const logoShow = {
    initial: {
        opacity: 0,
        y: '-100%'
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.7}
    },
    exit: {
        opacity: 0,
        y: '-100%',
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1}
    }
}

const background = {
    initial: {
        x: '100%'
    },
    enter: {
        x: '0%',
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        x: '100%',
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.6}
    }
}
const rowSlide = {
    initial: {
      x: '100%',
    },
    enter: (i) => ({
      x: '0%',
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1], 
        delay: ((rows.length - i - 1) * 0.1 ) + 0.2 },
    }),
    exit: (i) => ({
      x: '100%',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: (i * 0.15 ) + 0.3  },
    }),
};


export default function NavbarBody({setMenu}) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
  const pathname = usePathname();


  return (
    <div className='navbar__body'>
      <motion.div
        className='navbar__body__background'
        variants={background}
        initial='initial'
        animate='enter'
        exit='exit'
        onClick={() => setMenu(false)}
      ></motion.div>
      <div className='navbar__body__rows__container'>
        <motion.div 
            className='navbar__body__rows__logo'
            initial='initial'
            animate='enter'
            exit='exit'
            variants={logoShow}
        >
            <h1>Logo Here</h1>
        </motion.div>
        {rows.map((row, index) => {
            const { number } = row;
            return (
            <motion.div
                key={number}
                className='navbar__body__row'
                variants={rowSlide}
                initial='initial'
                animate='enter'
                exit='exit'
                custom={index} //ensure the index is passed as a custom prop
            ></motion.div>
            );
        })}
      </div>
      <div className='navbar__body__container'>
        {links.map((link, index) => {
          const { href, text } = link;
          const initialColor = pathname === href ? '#00F0FF' : '#fff';
          return (
            <Magnetic key={index} sensitivity='0.1'>
                <motion.div
                key={index}
                className={`navbar__body__link ${pathname === href ? 'active' : ''}`}
                onMouseEnter={() => setSelectedLink({ isActive: true, index })}
                onMouseLeave={() => setSelectedLink({ isActive: false, index })}
                variants={textShow}
                initial='initial'
                animate='enter'
                exit='exit'
                custom={index}
                >
                <Link href={href}>
                    <motion.p>
                        <GetChars
                        text={text}
                        selectedLink={selectedLink}
                        index={index}
                        initialColor={initialColor}
                        />
                    </motion.p>
                </Link>
                </motion.div>
            </Magnetic>
          );
        })}
      </div>
      <div className='navbar__body__add__container'>
        <div className='navbar__body__add__devider'>
          {addLinks.map((link, index) => {
            const { href, text } = link;
            // there is slight bug with the index, it is not unique, so we need to add the length of the links array to it
            const newIndex = index + links.length;
            const initialColor = pathname === href ? '#00F0FF' : '#fff';
            return (
              <Magnetic key={newIndex} sensitivity='0.1'>
                <motion.div
                    key={newIndex}
                    className='navbar__body__add-link'
                    onMouseEnter={() => setSelectedLink({ isActive: true, index: index + links.length })}
                    onMouseLeave={() => setSelectedLink({ isActive: false, index: index + links.length })}
                    variants={textShow}
                    initial='initial'
                    animate='enter'
                    exit='exit'
                    custom={newIndex}
                >
                    <Link href={href}>
                        <motion.p>
                            <GetChars
                                text={text}
                                selectedLink={selectedLink}
                                index={newIndex}
                                initialColor={initialColor}
                            />
                        </motion.p>
                    </Link>
                </motion.div>
              </Magnetic>
            );
          })}
        </div>
        <div className='navbar__body__add__devider'>
          {icons.map((icon, index) => {
            const { href, src, text } = icon;
            const iconIndex = index + links.length + addLinks.length;
            const initialColor = pathname === href ? '#00F0FF' : '#fff';
            return (
              <Magnetic key={iconIndex} sensitivity='0.1'>
                <motion.div
                    // Icons will have very similar animation, but with svg filing from the left opacity 0.65 to 1
                    // Now I use text as the icons, or I can use just the text instead of the svg icons, we'll see
                    key={iconIndex}
                    onMouseEnter={() => setSelectedLink({ isActive: true, index: index + links.length + addLinks.length })}
                    onMouseLeave={() => setSelectedLink({ isActive: false, index: index + links.length + addLinks.length })}
                    className='navbar__body__icon'
                    variants={textShow}
                    initial='initial'
                    animate='enter'
                    exit='exit'
                    custom={iconIndex}
                >
                    <Link href={href}>
                        <motion.p>
                            <GetChars
                                text={text}
                                selectedLink={selectedLink}
                                index={iconIndex}
                                initialColor={initialColor}
                            />
                        </motion.p>
                    </Link>
                </motion.div>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </div>
  );
}