import React, { useEffect } from "react"
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Diagnosis } from "@/components/sections/Diagnosis"
import { Solution } from "@/components/sections/Solution"
import { About } from "@/components/sections/About"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { SocialProof } from "@/components/sections/SocialProof"
import { VideoTestimonials } from "@/components/sections/VideoTestimonials"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA, Footer } from "@/components/sections/Footer"

import { InteractiveBackground } from "@/components/ui/InteractiveBackground"

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // Reduced for more natural feel
      infinite: false,
    })

    // Disable smooth scroll on mobile/touch devices for better performance
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      lenis.destroy();
      return;
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Aesthetic Overlays */}
      <div className="grain" />
      <div className="mesh-gradient" />
      <InteractiveBackground />

      <Navbar />

      <main className="relative z-10 w-full">
        <Hero />

        <Diagnosis />
        <Solution />
        <About />
        <HowItWorks />
        <VideoTestimonials />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
