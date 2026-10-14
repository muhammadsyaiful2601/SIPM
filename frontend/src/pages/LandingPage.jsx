import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Steps from '../components/landing/Steps'
import Categories from '../components/landing/Categories'
import Privacy from '../components/landing/Privacy'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="konten-utama" tabIndex={-1}>
        <Hero />
        <Features />
        <Steps />
        <Categories />
        <Privacy />
      </main>
      <Footer />
    </div>
  )
}