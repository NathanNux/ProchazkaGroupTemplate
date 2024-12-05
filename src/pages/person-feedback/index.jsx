import ContactIntro from "@/components/PagesIntro/contact";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function PersonFeebackPage() {
    return(
        <>
            <Cursor />
            <Navbar />
            <ContactIntro />
        </>
    )
}