import MyButton from "@/components/Sticky/buttons/MyButton";
import RoundButton from "@/components/Sticky/buttons/RoundButton";
import SmallButton from "@/components/Sticky/buttons/SmallButton";
import SVGButton from "@/components/Sticky/buttons/SvgButton";
import CustomImage from "@/components/Sticky/images";
import MainText from "@/components/TextAnims/MainText";
import MainTextV2 from "@/components/TextAnims/MainTextV2";
import MainTextV3 from "@/components/TextAnims/MainTextV3";
import MainTextV4 from "@/components/TextAnims/MainTextV4";
import PageHeading from "@/components/TextAnims/PageHeading";
import RollingText from "@/components/TextAnims/RollingText";
import RollingTextColor from "@/components/TextAnims/RollingTextColor";
import { useGlobalContext } from "@/context/LoadProvider";
import StatNumber from "@/components/TextAnims/StatNumber";
import LoadingNumber from "@/components/TextAnims/LoadingNumber";
import StatNumberReverse from "@/components/TextAnims/StatNumberReverse";
import StatNumberVariable from "@/components/TextAnims/StatNumberVariable";
import RotatingButton from "@/components/Sticky/buttons/RotatingButton";
import SVGPathText from "@/components/SvgAnims/TextSVGPath";
import SVGFillCircles from "@/components/SvgAnims/SVGFill";
import LoopAnim from "@/components/LoopAnims/GraphAnim";
import AdvcAnim from "@/components/LoopAnims/SmoothGraphAnim";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";
import HoverLogo from "@/components/Logo/HoverAnim/index copy";
import HoverLogo2 from "@/components/Logo/HoverAnim2/index copy";
import ONViewLogo from "@/components/Logo/onView";


export default function Home() {
  return (
    <>
      <Navbar />
      <Cursor />
        <main className='page'>
        <section className="header__text">
          <h1>Next.js + Framer Motion</h1>
          <p>Template for creating animations with Next.js and Framer Motion.</p>

          <p>Logo Anims</p>
          <HoverLogo />
          <HoverLogo2 />

          <ONViewLogo />
          <p>NUMBER ANIMATIONS</p>
          <div>
            <LoadingNumber number={100} staggers={8}/>
          </div>
          <div className="Count__Text__Container">
            <StatNumber number={25000}/>
            <StatNumber number={2500}/>
            <StatNumber number={250}/>
            <StatNumber number={150}/>
            <StatNumber number={90}/>
            <StatNumber number={60}/>
            <StatNumber number={40}/>
            <StatNumber number={25}/>
            <StatNumber number={12}/>
          </div>
          <div className="Count__Text__Container">
            <StatNumberReverse number={25000}/>
            <StatNumberReverse number={2500}/>
            <StatNumberReverse number={250}/>
            <StatNumberReverse number={150}/>
            <StatNumberReverse number={90}/>
            <StatNumberReverse number={60}/>
            <StatNumberReverse number={40}/>
            <StatNumberReverse number={25}/>
            <StatNumberReverse number={12}/>
          </div>
          <div className="Count__Text__Container">
            <StatNumberVariable number={25000}  EndDuration={4} StartDuration={2} BreakPoint={24500}/>
            <StatNumberVariable number={2500}  EndDuration={4} StartDuration={2} BreakPoint={2350}/>
            <StatNumberVariable number={250}  EndDuration={4} StartDuration={2} BreakPoint={225}/>
            <StatNumberVariable number={150}  EndDuration={4} StartDuration={2} BreakPoint={125}/>
            <StatNumberVariable number={90}  EndDuration={4} StartDuration={2} BreakPoint={75}/>
            <StatNumberVariable number={60}  EndDuration={4} StartDuration={2} BreakPoint={45}/>
            <StatNumberVariable number={40}  EndDuration={4} StartDuration={2} BreakPoint={30}/>
            <StatNumberVariable number={25}  EndDuration={4} StartDuration={2} BreakPoint={15}/>
            <StatNumberVariable number={12}  EndDuration={4} StartDuration={2} BreakPoint={7}/>
          </div>
          <p>TEXT ANIM ON LOAD PAGE</p>
          <PageHeading />
          <p>BUTTON ANIMATIONS</p>
          <RoundButton href='/' text='RButton'/>
          <SmallButton href='/' text='SButton'/>
          <MyButton href='/' text='MButton'/>
          <SVGButton src='/thumbsUp.svg' altText='SVGButton'/>
          <RotatingButton href='/' text='Rotating Button Rotating Button'/>
          <p>IMAGE ANIMATIONS</p>
          <CustomImage src='/test.png' altText='Next.js Logo' width='200' height='200'/>
          <p>ON SCROLL BASED TEXT ANIMATIONS</p>
          <div>
            <MainText />
            <MainTextV2 />
            <MainTextV3 />
            <MainTextV4 />
          </div>
          <div>
            <RollingText text='Rolling Text' baseVelocity={''} textsCount='13'/>
            <RollingTextColor text='Rolling Text ' baseVelocity={''} textsCount='13'/>
          </div>
          <SVGPathText text='SVG PATH TEXT COMPONENT' textButton='Click Here'/>
          <SVGFillCircles />
          <LoopAnim />
          <AdvcAnim />
        </section>
      </main>
    </>
  )
}