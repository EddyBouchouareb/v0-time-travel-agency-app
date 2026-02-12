import { AnimatedBackground } from "@/components/animated-background"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AgencySection } from "@/components/agency-section"
import { DestinationsSection } from "@/components/destinations-section"
import { QuizSection } from "@/components/quiz-section"
import { ReservationSection } from "@/components/reservation-section"
import { Chatbot } from "@/components/chatbot"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AgencySection />
        <DestinationsSection />
        <QuizSection />
        <ReservationSection />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
