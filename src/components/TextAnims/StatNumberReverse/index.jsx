import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function StatNumberReverse({ number }) {
  const paragraphRef = useRef();
  const count = useMotionValue(0);
  const Counting = useTransform(count, Math.round);
  const isInView = useInView(paragraphRef, { margin: '0px' });

//   const GenerateKeyFrames = ( target, staggers ) => {
//     const keyFrames = [];
//     const mainStaggers = Math.floor(staggers * 0.9);
//     const finalStaggers = staggers - mainStaggers;
//     // this here is to generate the keyframes for the animation to create smooth anim till 90% of the number
//     for (let i = 1; i <= mainStaggers; i++) {
//       keyFrames.push(target * (i / staggers));
//     }
//     // initialization - condition - increment / decrement 
//     // if i is less than or equal to finalStaggers, increment i by 1 
//     // 250 * 0.9 + (250 * 0.1) * (1 / 2) = 250 * 0.9 + 25 * 0.5 = 225 + 12.5 = 237.5
//     // that increments by 0.1 so it will be 237.5 + 2.5 = 240 and on and on

//     // for the last 10% and its an oscillation going back and forward
//     for (let i = 1; i <= finalStaggers; i++) {
//       keyFrames.push(target * 0.9 + (target * 0.1) * (i / finalStaggers));
//       keyFrames.push(target * 0.9 + (target * 0.1) * ((i / finalStaggers) - 0.05)); // Backwards step
//     }

//     keyFrames.push(target);
//     return keyFrames
//   }
//  // Let's generate the keyFrames for the animation to create smooth anim till 90% of the number
//  // the keyframes must be like 0, but then number*0.9, then *, 0.91, and so on till 100% of the number
//   const generateTimes = ( staggers ) => {
//     const times = [];
//     const mainStaggers = Math.floor(staggers * 0.9); // the 90% anim
//     const finalStaggers = staggers - mainStaggers; // the rest 10% of the anim
//     // this here is to generate the times for the animation to create smooth anim till 90% of the number
//     // and then I can even use different easing for the last 10% of the number
//     for (let i = 1; i <= staggers; i++) {
//       times.push(i / (staggers + finalStaggers));
//     }

//     // i++ is the same as i = i + 1 so an increment of 1 
//     for (let i = 1; i <= finalStaggers; i++) {
//       times.push(( mainStaggers + i ) / (staggers + finalStaggers));
//     }
//     // example: 9 + 1 / 10 + 2 = 10 / 12 = 0.8333333333333334
//     times.push(1);
//     return times;
//   };


// The approach above is too complicated and I even don't know exactly how it works, so I will try to simplify it

//I know how keyframes works and times - keyframes will state the values and since there are lets say 5 keyframes, then I need 5 times
// Times will be the % of the animation, so if I have 5 keyframes, then I need 5 times, so 1/5, 2/5, 3/5, 4/5, 5/5 of that anim, or anything I set for the keyframes values

  const generateKeyFrames = ( target ) => {
    const keyFrames = [0, target * 0.9]; // fixed values we know we need
    const lastTenPercent = target * 0.1; // the last 10% of the number we will work with to create staggers 
    let current = target * 0.9; // the current value will be 90% of the number
    let increments = Math.floor(lastTenPercent / 5) || 1; 
    // the increments will be 10% of the last 10% of the number

    while (current < target) {
      increments = Math.max(Math.floor((target - current) / 2), 1); 
      // the increments will be 10% of the last 10% of the number
      current += increments; // the current value will be incremented by the increments
      keyFrames.push(Math.min(current, target)); // the keyframes will be pushed with the current value
    }
    return keyFrames;
  };

  const generateTimes = ( keyFrames ) => {
    const times = [ 0, 0.9 ]; // fixed values we know we need
    const finalKeyFrames = keyFrames.slice(2) // the final keyframes will be the rest of the keyframes excluding the first 2
    const step = 0.1 / finalKeyFrames.length; // the step will be 10% of the final keyframes length

    finalKeyFrames.forEach((_, i) => {
      times.push(0.9 + step * (i + 1)); // the times will be pushed with 90% + the step * the index + 1
    })

    return times // return the times
  }

  useEffect(() => {
    let controls;

    if (isInView) {
      // this is how the numbers will animate
      const keyFrames = generateKeyFrames(number); // number and staggers can be dynamic

      // need time or % of that animation
      const times = generateTimes(keyFrames); // number and staggers can be dynamic
      const easing = [ 0.76, 0, 1, 0.24];
      const reversedEasing = [0, 0.76, 0.24, 1];

      // Start the animation when the component is in view
      controls = animate(count, number, {
        duration: 6,
        ease: reversedEasing,
      },)
    } else {
      // Optionally reset the count when the component is out of view
      count.set(0);
    }

    return () => {
      // Clean up the animation when the component unmounts or when isInView changes
      if (controls) {
        controls.stop();
      }
    };
  }, [isInView, number]);

  return (
    <motion.h1 ref={paragraphRef}>{Counting}</motion.h1>
  );
}