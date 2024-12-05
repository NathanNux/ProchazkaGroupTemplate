import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";
import AboutInto from "@/components/PagesIntro/about";
import ParallaxExpanf from "@/components/MovignSections/parallaxExpand";
import AboutTeam from "@/components/MovignSections/aboutTeam";
import EventCollage from "@/components/MovignSections/eventCollage";
import QNA from "@/components/OtherAnims/QNA";
import Footer from "@/components/OtherAnims/Footer";


export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Cursor />
      <AboutInto />
      <ParallaxExpanf />
      <EventCollage />
      <AboutTeam />
      <QNA />
      <Footer />
    </>
    
  )
}