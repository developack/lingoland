import { Header } from "../../shared/components/Header/Header.jsx"
import { Footer } from "../../shared/components/Footer"
import { HeroSection } from "./components/HeroSection"
import { OnlineAssignmentSection } from "./components/OnlineAssignmentSection"
import { OnlineQuizSection } from "./components/OnlineQuizSection"
import { OnlinePaymentSection } from "./components/OnlinePaymentSection"
import { LmsSection } from "./components/LmsSection"
import { CallToActionSection } from "./components/CallToActionSection"


export function HomePage() {
    return (
        <>
            <Header/>

            <title>Home Page</title>

            <div className="flex-1">

                <HeroSection />
                <OnlineAssignmentSection />
                <OnlineQuizSection />
                <OnlinePaymentSection />
                <LmsSection />
                <CallToActionSection />

            </div>

            <Footer/>
        </>
    )
}