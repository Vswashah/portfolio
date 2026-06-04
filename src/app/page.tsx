import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Signals from '@/components/sections/Signals'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 10%, rgba(77,124,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 80% 80%, rgba(124,92,252,0.07) 0%, transparent 70%)' }} />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Story />
        <Experience />
        <Projects />
        <Signals />
        <Contact />
      </main>
      <Footer />
    </>
  )
}