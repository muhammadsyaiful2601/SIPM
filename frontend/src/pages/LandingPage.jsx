import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import LogoStrip from '../components/landing/LogoStrip'
import HowItWorks from '../components/landing/HowItWorks'
import PhaseTimeline from '../components/landing/PhaseTimeline'
import Lessons from '../components/landing/Lessons'
import Features from '../components/landing/Features'
import Privacy from '../components/landing/Privacy'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="konten-utama" tabIndex={-1}>
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <PhaseTimeline />
        <Lessons />
        <Features />
        <Privacy />
      </main>
      <Footer />
    </div>
  )
}