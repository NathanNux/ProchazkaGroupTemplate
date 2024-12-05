import FeedbackForm from "@/components/forms/feedback";
import Footer from "@/components/OtherAnims/Footer";
import QNA from "@/components/OtherAnims/QNA";
import FeedbackIntro from "@/components/PagesIntro/feedBack";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function FeedbackPage () {
    return(
        <>
            <Cursor />
            <Navbar />
            <FeedbackIntro />
            <QNA />
            <Footer />
        </>
    )
}