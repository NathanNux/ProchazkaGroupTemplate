import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, memo, useRef } from "react";

const AnimatedWord = memo(({ char, rangeOpacity, rangeScaleColor, progress, isHighlighted, initialColor }) => {
    const scale = useTransform(progress, rangeScaleColor, [1, 1.5, 1]);
    const color = useTransform(progress, rangeScaleColor, [initialColor, '#00F0FF', initialColor]);
    const opacity = useTransform(progress, rangeOpacity, [0.65, 1]);

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
AnimatedWord.displayName = 'AnimatedWord';

const getCharsWithBrAndSpans = ({ text, initialColor, progress }) => {
    const lines = text.split('<br />');
    let allChars = [];
    let groupedChars = [];
    const groupSize = 3;

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

    for (let i = 0; i < allChars.length; i += groupSize) {
        const group = allChars.slice(i, i + groupSize);
        groupedChars.push(group);
    }

    const rangesOpacity = allChars.map((_, i) => {
        const start = i / allChars.length;
        const end = start + 1 / allChars.length;
        return [start, end];
    })
    //I needed to calculate staggering effect for each group of chars, so the next one would animate when the previous one is animation to create better wavy effect
    // I can't find a way to achieve this effect, but I can try to create a staggering effect for each group of chars to not create wave but its kinda like an illusion
    const totalGroups = groupedChars.length;
    const rangesScaleColor = groupedChars.map((_, groupIndex) => {
        const start = (groupIndex / totalGroups) + (0.2 / totalGroups);
        const mid = start + (0.5 / totalGroups);
        const end = start + (1.0 / totalGroups);
        // I need to create clamp for the values to not exceed the range
        return [
            start > 1 ? 1 : start,
            mid > 1 ? 1 : mid,
            end > 1 ? 1 : end
        ];
    });

    return (
        <>
            {groupedChars.map((group, groupIndex) => {
                const [start, mid, end] = rangesScaleColor[groupIndex];
                return group.map((item, charIndex) => {
                    const globalIndex = groupIndex * groupSize + charIndex;
                    const rangeOpacity = rangesOpacity[globalIndex];
                    return (
                        <Fragment key={globalIndex}>
                            {item.char === '<br />' ? (
                                <br key={`br-${globalIndex}`} />
                            ) : item.char === ' ' ? (
                                <span key={`space-${globalIndex}`}>&nbsp;</span>
                            ) : (
                                <AnimatedWord
                                    char={item.char}
                                    rangeOpacity={rangeOpacity}
                                    rangeScaleColor={[start, mid, end]}
                                    progress={progress}
                                    isHighlighted={item.isHighlighted}
                                    initialColor={initialColor}
                                />
                            )}
                        </Fragment>
                    );
                });
            })}
        </>
    );
}

export default function MainText() {
    const ref = useRef(null);
    const text = "Lorem ipsum dolor sit amet,<br /> consectetur <span>adipiscing</span> elit,";
    const initialColor = '#fff';
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.5", "start -0.1"]
    });

    return (
        <div className="MainText__Main" ref={ref}>
            <div className="MainText__Container">
                <motion.p>
                    {getCharsWithBrAndSpans({text, initialColor: initialColor, progress: scrollYProgress})}
                </motion.p>
            </div>
        </div>
    )
}