import ContactBenefit from "@/components/ModemComponents/ContactBenefit";
import BenefitDetails from "@/components/MovignSections/BenefitDetails";
import BenefitProgramKeyframes from "@/components/MovignSections/BenefitProgram";
import IntroPageBenefit from "@/components/MovignSections/BenefitProgram/IntroPage";
import BenefitShowcase from "@/components/MovignSections/BenefitShowcase";
import BenefitReminder from "@/components/OtherAnims/BenefitReminder";
import Footer from "@/components/OtherAnims/Footer";
import QNA from "@/components/OtherAnims/QNA";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function BenefitProgramPage() {
    return (
        <>
            <Navbar />
            <Cursor />
            <BenefitProgramKeyframes />
            <BenefitDetails />
            <BenefitShowcase />
            <BenefitReminder />
            <ContactBenefit />
            <QNA />
            <Footer />
        </>
        
    )
}