import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";

// Linear Interpolation function
const lerp = (start, end, t) => start + t * (end - start);

const AnimatedWord = ({ char, progress, animationOffset, initialColor, isHighlighted }) => {
    // Define overlapping range by using animation offset for each character

    // Animations with just one color and scale
    const scale = useTransform(progress, [animationOffset + 0.1, animationOffset + 0.3, animationOffset + 0.5], [1, 1.2, 1]);
    const color = useTransform(progress, [animationOffset + 0.1, animationOffset + 0.3, animationOffset + 0.5], [initialColor, '#00F0FF', initialColor]);

    const opacity = useTransform(progress, [animationOffset + 0.1, animationOffset + 0.3], [0.65, 1]);

    return (
        <motion.span
            style={{
                display: 'inline-block',
                marginRight: '0.02em',
                scale,
                opacity,
                // be carefull of how you write your code. because of the color was not properly set and written, it broke the website each time it loaded pages where this component is.
                ...(isHighlighted ? { color: '#00F0FF' } : { color }),
            }}
            className={isHighlighted ? 'highlighted' : ''}
        >
            {char}
        </motion.span>
    );
};

const getCharsWithBrAndSpans = ({ text, initialColor, progress }) => {
    const lines = text.split('<br />');
    let allChars = [];
    const groupSize = 1;

    lines.forEach((line, i) => {
        const spans = line.split(/<span>|<\/span>/);
        spans.forEach((span, j) => {
            const chars = span.split('');
            chars.forEach((char, k) => {
                allChars.push({ char, isHighlighted: j % 2 === 1 });
            });
        });

        if (i < lines.length - 1) {
            allChars.push({ char: '<br />', isHighlighted: false });
        }
    });

    const totalChars = allChars.length;
    // Calculate animation offsets for each character to create staggered overlaps
    const animationOffsets = allChars.map((_, i) => lerp(0, 1, i / totalChars) * 0.2);

    return (
        <>
            {allChars.map((item, charIndex) => (
                <Fragment key={charIndex}>
                    {item.char === '<br />' ? (
                        <br key={`br-${charIndex}`} />
                    ) : item.char === ' ' ? (
                        <span key={`space-${charIndex}`}>&nbsp;</span>
                    ) : (
                        <AnimatedWord
                            char={item.char}
                            progress={progress}
                            animationOffset={animationOffsets[charIndex]}
                            initialColor={initialColor}
                            isHighlighted={item.isHighlighted}
                        />
                    )}
                </Fragment>
            ))}
        </>
    );
};

export default function MainTextV4() {
    const ref = useRef(null);
    const text = "Lorem ipsum dolor sit amet,<br /> consectetur <span>adipiscing</span> elit,";
    const initialColor = '#fff';
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.5", "start -0.4"]
    });

    return (
        <div className="MainTextV4__Main" ref={ref}>
            <div className="MainText__Container">
                <motion.p>
                    {getCharsWithBrAndSpans({ text, initialColor: initialColor, progress: scrollYProgress })}
                </motion.p>
            </div>
        </div>
    );
}