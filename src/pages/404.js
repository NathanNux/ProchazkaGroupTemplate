import Intro404 from "@/components/PagesIntro/404";
import Navbar from "@/components/Sticky/navbar";
import Cursor from "@/components/Sticky/navbar/cursor";

export default function Page404() {
    return (
        <>
            <Cursor />
            <Navbar />
            <Intro404 />
        </>
    )
}