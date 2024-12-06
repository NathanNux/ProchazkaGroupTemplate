import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, memo, useRef } from "react";


const AnimatedWord = memo(({ char, range, progress, isHighlighted, initialColor }) => {
    const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1]);
    const color = useTransform(progress, [0, 0.5, 1], [initialColor, '#00F0FF', initialColor]);
    const opacity = useTransform(progress, range, [0.65, 1]);

    return (
        <motion.span
            style={{
                display: 'inline-block',
                marginRight: '0.02em',
                scale,
                opacity,
                ...(isHighlighted ? {} : { color }),
            }}
            className={isHighlighted ? 'highlighted' : ''}
        >
            {char}
        </motion.span>
    )
})

// Assign displayName to satisfy ESLint rule
AnimatedWord.displayName = 'AnimatedWordV2';
const getCharsWithBrAndSpans = ({ text, initialColor, progress }) => {
    const lines = text.split('<br />');
    let allChars = [];

    lines.forEach((line, i) => {
        const spans = line.split(/<span>|<\/span>/);
        spans.forEach((span, j) => {
            const chars = span.split('');
            chars.forEach((char, k) => {
                allChars.push({ char, isHighlighted: j % 2 === 1 });
            })
        });

        if( i < lines.length - 1) {
            allChars.push({ char: '<br />', isHighlighted: false });
        }
    });

    const ranges = allChars.map((_, i) => {
        const start = i / allChars.length;
        const end = start + 1 / allChars.length;
        return [start, end];
    })

    return (
        <>
            {allChars.map(( item, i ) => {
                const range = ranges[i];
                return (
                    <Fragment key={i}>
                        {item.char === '<br />' ? (
                            <br key={`br-${i}`} />
                        ) : item.char === ' ' ? (
                            <span key={`space-${i}`}>&nbsp;</span>
                        ) : (
                            <AnimatedWord
                                char={item.char}
                                range={range}
                                progress={progress}
                                isHighlighted={item.isHighlighted}
                                initialColor={initialColor}
                            />
                        )}
                    </Fragment>
                )
            })}
        </>
    )
}

export default function MainTextV2() {
    const ref = useRef(null);
    const text = "Lorem ipsum dolor sit amet,<br /> consectetur <span>adipiscing</span> elit,";
    const initialColor = '#fff';
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.4", "start -0.1"]
    });

    return (
        <div className="MainText__MainV2" ref={ref}>
            <div className="MainText__Container">
                <motion.p>
                    {getCharsWithBrAndSpans({text, initialColor: initialColor, progress: scrollYProgress})}
                </motion.p>
            </div>
        </div>
    )
}