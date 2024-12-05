import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";
import FeedbackIntro from "@/components/PagesIntro/feedBack";
import QNA from "@/components/OtherAnims/QNA";
import Footer from "@/components/OtherAnims/Footer";


export default function ContactPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <FeedbackIntro />
      <QNA />
      <Footer />
    </>
  )
}