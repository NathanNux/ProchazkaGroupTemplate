import { useCursorRef } from "@/context/CursorRefProvider";
import { animate, transform, useMotionValue, motion, useScroll, useVelocity, useSpring, useTransform, wrap, useAnimationFrame } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Magnetic from "../../Magnetic";
import Link from "next/link";

// Note / WIP: This needs to be first designed to be the component in Figma, after that I can start to implement the animations for rotating and rotating with velocity - should not be that hard
// desing done just need that text rotating function with velocity to scroll the text around the button
export default function RotatingButton({ href, text }) {
    const { registerRef, unregisterRef } = useCursorRef();
    const ButtonBoundsRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const [boundsHovered, setBoundsHovered] = useState(false);
    
    // rotating the button on scroll and with velocity
    const { scrollY } = useScroll();
    const BaseVelocity = 50;

    // we need the base value 
    const BaseRotate = useMotionValue(0);

    //then we need velocity 
    const Velocity = useVelocity(scrollY)
    const SmoothVelocity = useSpring(Velocity, {
        stiffness: 400, 
        damping: 50
    });
    const velocityFactor = useTransform(SmoothVelocity, [0, 1000], [0, 5], {clamp: false}); //clamp: false => value will exceed the range if it is outside of the range

    const loopStart = 0;
    const loopEnd = 360;

    // now I need to ensure it will be in specific range which is the full range here
    const rotation = useTransform(BaseRotate, (v) => `${wrap(loopStart, loopEnd, v)}deg`);

    // now I just need to know if we are scrolling up or down
    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        if( boundsHovered){
            return
        }
        let moveBy = directionFactor.current * BaseVelocity * (delta / 1000); // that is the speed of the scroll in pixels per second

        if(velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        BaseRotate.set(BaseRotate.get() + moveBy);
    })


    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }
    // this will calculate the angle of the point of the cursor to what angle the center of the navbar will ratate to 
    const HoverRotate = useMotionValue(0);
    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
        HoverRotate.set(angle);
        // i need to combine those two values to get the final rotation
        //this is the based code  i used to animate the button rotation with the text: 
        // animate(buttonRef.current, {rotate: `${angle}rad`}, {duration: 0});
        // //text cannot be rotated, so we need to rotate it in the opposite direction to stay in place
        if(boundsHovered) {
            animate(buttonRef.current, {rotate: `${angle}deg`}, {duration: 0});
            animate(textRef.current, {rotate: `${-angle}deg`}, {duration: 0});
        }
        // animate(textRef.current, {rotate: `${-angle}rad`}, {duration: 0});
    }

    const manageMouseMove = useCallback((e) => {
        const { clientX, clientY } = e;
        const { top: topBounds, left: leftBounds, width: widthBounds, height: heightBounds } = buttonRef.current.getBoundingClientRect();

        const center = { x: leftBounds + widthBounds / 2, y: topBounds + heightBounds / 2 };

        // the distance from the center of the navbar bounds to the mouse
        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (boundsHovered) {
            // rotation to the cursor
            rotate(distance);
            // for scale we need positive values
            const absDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
            // now I need to calculate the stretch factor
            const newScaleX = transform(absDistance.x, [0, widthBounds / 2], [1, 1.05], { clamp: true }); // clamps => value will not exceed the range - true
            const newScaleY = transform(absDistance.y, [0, heightBounds / 2], [1, 0.95], { clamp: true });
            // now I need to calculate the scale factor
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);
        } else {return null}
        // this above is condition to either stick the mouse to the center of the navbar bounds or just to follow the mouse
    }, [boundsHovered, scale.x, scale.y, buttonRef]);

    // note: useCallback is used to prevent the function from being recreated on every render - this is important for performance and function, it got bugged out when states changed
    // this only needs to be done when we are using utils like getMousePosition - this is not needed for this example above

    // Hover bounds
    const manageBoundsHover = () => {
        setBoundsHovered(true);
        animate(BaseRotate, BaseRotate.get(), { duration: 1, ease: 'easeOut' });
    };

    const manageBoundsLeave = () => {
        setBoundsHovered(false);
        animate(buttonRef.current, {scaleX: 1, scaleY: 1,}, {duration: 0.5}, {type: 'spring', damping: 5, stiffness: 350, mass: 0.5});
    };

    // Appearetly I need to create a function that will curve the text to a circle here, I did not came up with that idea, Copilot did
    const renderCircularText = (text) => {
        const letters = text.split('');
        const totalLetters = letters.length;
        const radius = 90; // Adjust the radius as needed

        return letters.map((letter, index) => {
            const angle = (360 / totalLetters) * index;
            return (
                <span
                    key={index}
                    className="Rotating__button_letter"
                    style={{
                        transform: `rotate(${angle}deg) translate(${radius}px) rotate(${90}deg)`
                    }}
                >
                    {letter}
                </span>
            )
        });
    }
    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, [manageMouseMove]);

    useEffect(() => {
        const current = ButtonBoundsRef.current;
        if (current) {
            current.addEventListener('mouseenter', manageBoundsHover);
            current.addEventListener('mouseleave', manageBoundsLeave);

            return () => {
                current.removeEventListener('mouseenter', manageBoundsHover);
                current.removeEventListener('mouseleave', manageBoundsLeave);
            };
        }
    }, [ButtonBoundsRef]);

    useEffect(() => {
        if (ButtonBoundsRef.current) {
            registerRef(ButtonBoundsRef.current);
        }

        return () => {
            if (ButtonBoundsRef.current) {
                unregisterRef(ButtonBoundsRef.current);
            }
        }
    }, [ButtonBoundsRef.current, registerRef, unregisterRef]);

    const template = ({rotate, scaleX, scaleY}) => {
        const base = BaseRotate.get();
        const hover = HoverRotate.get();
        return `rotate(${base + hover}deg) scaleX(${scaleX}) scaleY(${scaleY})` 
    }
    return (
        <Magnetic sensitivity='0.1'>
            <motion.div transformTemplate={template} ref={buttonRef} style={{scaleX: scale.x, scaleY: scale.y}} className='Rotating__button_container'>
                <div ref={ButtonBoundsRef} className='Rotating__button_Bounds'></div>
                    <Link href={href}>
                        <motion.p ref={textRef} style={{ rotate: rotation }}>{renderCircularText(text)}</motion.p>
                        <div className="Rotating__button_Center"></div>
                    </Link>
            </motion.div>
        </Magnetic>
    )
}