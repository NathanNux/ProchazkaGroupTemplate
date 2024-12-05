import ContactBenefit from "@/components/ModemComponents/ContactBenefit";
import Footer from "@/components/OtherAnims/Footer";
import GraphSection from "@/components/OtherAnims/Graphs";
import QNA from "@/components/OtherAnims/QNA";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function ReviewPage () {
    return(
        <>
            <Navbar />
            <Cursor />
            <GraphSection />
            <ContactBenefit />
            <QNA />
            <Footer />
        </>
    )
}