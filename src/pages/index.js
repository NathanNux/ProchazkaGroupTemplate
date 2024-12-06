import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";
import MainIntro from "@/components/PagesIntro/main";
import TestimonialsMainDrag from "@/components/MovignSections/TestiCarouselDragable";
import TestimonialsMain from "@/components/MovignSections/TestiCarousel";
import Statbar from "@/components/OtherAnims/StatBar";
import MainPageSection from "@/components/MovignSections/MainSection";
import QNA from "@/components/OtherAnims/QNA";
import Footer from "@/components/OtherAnims/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Cursor />
      <MainIntro />
      <Statbar />
      {/* <MainPageSection /> */}
      <QNA />
      <Footer />
    </>
  )
}