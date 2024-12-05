import ReviewsList from "@/components/ModemComponents/Review";
import Footer from "@/components/OtherAnims/Footer";
import ReviewsIntro from "@/components/PagesIntro/reviews";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function ReviewsPage () {
    return(
        <>
            <Cursor />
            <Navbar />
            <ReviewsIntro />
            <ReviewsList />
            <Footer />
        </>
    )
}