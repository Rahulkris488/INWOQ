import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance - staggered fade up
      gsap.fromTo('.hero-reveal',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.13, ease: "power4.out", delay: 0.3 }
      )

      // Hero arc entrance
      gsap.fromTo('.hero-arc',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out", delay: 0.2 }
      )
      gsap.fromTo('.hero-rays',
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out", delay: 0.5 }
      )
      gsap.fromTo('.hero-horizon',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.8 }
      )

      // Stats count up
      document.querySelectorAll('.stat-number').forEach(el => {
        const val = parseInt(el.dataset.value)
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: val, duration: 2, snap: { textContent: 1 }, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        })
      })

      // Why Calm - character reveal on scroll
      gsap.fromTo('.why-calm-char',
        { color: 'rgba(255,255,255,0.04)' },
        {
          color: 'rgba(255,255,255,0.88)', stagger: 0.008,
          scrollTrigger: { trigger: '.why-calm-section', start: "top 70%", end: "top 20%", scrub: 1 }
        }
      )

      // Service cards stagger
      gsap.fromTo('.service-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: '.services-grid', start: "top 80%", toggleActions: "play none none reverse" }
        }
      )

      // Process horizontal scroll
      const ps = document.querySelector('.process-section')
      const pc = document.querySelector('.process-container')
      if (ps && pc) {
        gsap.to(pc, {
          x: -(pc.scrollWidth - window.innerWidth), ease: "none",
          scrollTrigger: { trigger: ps, start: "top top", end: () => `+=${pc.scrollWidth - window.innerWidth}`, pin: true, scrub: 1, anticipatePin: 1 }
        })
      }

      // Why cards
      gsap.fromTo('.why-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: '.why-section', start: "top 70%", toggleActions: "play none none reverse" }
        }
      )

      // Contact heading chars
      gsap.fromTo('.contact-char',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.025,
          scrollTrigger: { trigger: '.contact-section', start: "top 70%", toggleActions: "play none none reverse" }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const splitChars = (text, cls) =>
    text.split('').map((c, i) =>
      <span key={i} className={`inline-block ${cls}`}>{c === ' ' ? '\u00A0' : c}</span>
    )

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden" style={{ background: '#050010' }}>
      {/* Fixed dark background */}
      <div className="site-bg" />
      <div className="noise-overlay" />

      {/* ---- LIQUID GLASS NAVBAR ---- */}
      <nav className="glass-nav">
        <span className="nav-logo">INWOQ</span>
        <div className="flex items-center gap-2">
          {['Services', 'Process', 'About', 'Contact'].map(item =>
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          )}
        </div>
        <a href="#contact" className="nav-cta">Get Started</a>
      </nav>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* ARC BACKGROUND */}
        <div className="hero-arc-container">
          <div className="hero-rays" />
          <div className="hero-arc" />
          <div className="hero-horizon" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-[1100px] mx-auto">
          {/* Main typography */}
          <h1 className="hero-reveal text-[clamp(3.2rem,8vw,7.5rem)] leading-[1.1] tracking-[-0.03em] mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            <span className="glass-text-bright font-light block">Crafting</span>
            <span className="block">
              <span className="glass-text-dim font-light italic">(your) </span>
              <span className="glass-text-bright font-light">digital.</span>
            </span>
            <span className="block mt-2">
              <span className="glass-text-bright font-medium text-[clamp(3.8rem,10vw,9rem)]">Shaping </span>
              <span className="glass-text-dim font-light italic text-[clamp(3.8rem,10vw,9rem)]">futures</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-reveal glass-text-muted text-sm md:text-base max-w-md mx-auto leading-relaxed mb-14">
            We craft premium digital experiences that transform businesses — blending technology with calm, purposeful design.
          </p>

          {/* Stats */}
          <div className="hero-reveal flex items-center justify-center gap-4 mt-16">
            {[
              { value: 50, label: 'Projects', suffix: '+' },
              { value: 30, label: 'Clients', suffix: '+' },
              { value: 3, label: 'Years', suffix: '+' },
            ].map((s, i) => (
              <div key={i} className="stat-card min-w-[100px]">
                <div className="text-2xl font-bold glass-text-bright">
                  <span className="stat-number" data-value={s.value}>0</span>{s.suffix}
                </div>
                <p className="glass-text-muted text-[10px] tracking-wider mt-1 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[10px] glass-text-muted tracking-[0.3em] uppercase">Scroll</span>
          <svg className="w-4 h-4 scroll-indicator" fill="none" stroke="rgba(139,92,246,0.5)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* ---- BRAND TICKER ---- */}
      <div className="relative z-10 py-10 border-y border-white/[0.04] overflow-hidden">
        <div className="ticker-track flex gap-16 items-center whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(2)].map((_, rep) =>
            ['TechCorp', 'StartupXYZ', 'InnovateCo', 'FutureAI', 'DigitalEdge', 'CloudNine', 'MetaFlow', 'QuantumLab'].map((brand, i) =>
              <span key={`${rep}-${i}`} className="text-white/[0.08] text-lg font-bold tracking-[0.2em] uppercase">{brand}</span>
            )
          )}
        </div>
      </div>

      {/* ============================================
          WHY CALM
          ============================================ */}
      <section className="why-calm-section min-h-screen flex items-center justify-center px-6 md:px-16 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="glass-text text-4xl md:text-6xl font-bold mb-16">Why Calm?</h2>
          <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed">
            <p>{splitChars('In a world of complexity, we strip away the noise.', 'why-calm-char')}</p>
            <p>{splitChars('Technology should feel effortless — invisible yet powerful.', 'why-calm-char')}</p>
            <p>{splitChars('We craft digital experiences that breathe, flow, and simply work.', 'why-calm-char')}</p>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES - BENTO GRID
          ============================================ */}
      <section id="services" className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="glass-text text-4xl md:text-7xl font-bold mb-4 text-center">What We Create</h2>
          <p className="glass-text-muted text-center mb-16 text-lg">Transforming ideas into digital excellence</p>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[220px]">
            {[
              { title: 'Websites', desc: 'Stunning, performant websites that captivate and convert.', icon: '🌐', span: 'bento-tall' },
              { title: 'Web Apps', desc: 'Complex applications made elegantly simple.', icon: '⚡', span: '' },
              { title: 'Mobile Apps', desc: 'Native experiences that feel natural.', icon: '📱', span: '' },
              { title: 'AI Workflows', desc: 'Intelligent automation that streamlines everything.', icon: '🤖', span: '' },
              { title: 'AI Integrations', desc: 'Seamlessly weaving AI into existing systems.', icon: '🔗', span: '' },
              { title: 'AI Chatbots', desc: 'Conversations that understand and delight.', icon: '💬', span: 'bento-wide' },
            ].map((s, i) => (
              <div key={i} className={`service-card glass-card group p-8 flex flex-col justify-between ${s.span}`}>
                <div>
                  <div className="text-3xl mb-4 relative z-10">{s.icon}</div>
                  <h3 className="glass-text-bright text-xl font-bold relative z-10 mb-2">{s.title}</h3>
                  <p className="glass-text-dim text-sm leading-relaxed relative z-10">{s.desc}</p>
                </div>
                <div className="relative z-10 flex items-center gap-1 glass-text-muted text-xs mt-4 group-hover:text-white/50 transition-colors">
                  <span>Learn more</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PROCESS - HORIZONTAL SCROLL
          ============================================ */}
      <section className="process-section h-screen overflow-hidden relative z-10">
        <div className="process-container flex items-center h-full px-16 gap-32 relative z-10" style={{ width: 'max-content' }}>
          <div className="flex-shrink-0 w-[50vw] flex flex-col justify-center">
            <h2 className="glass-text text-5xl md:text-8xl font-bold mb-4">Our Process</h2>
            <p className="glass-text-dim text-xl">Four steps to digital calm</p>
          </div>

          {[
            { num: '01', title: 'LISTEN', desc: 'We absorb your vision, challenges, and dreams.' },
            { num: '02', title: 'DECIDE', desc: 'Strategic choices, clear direction forward.' },
            { num: '03', title: 'BUILD', desc: 'Pixel-perfect execution with cutting-edge tech.' },
            { num: '04', title: 'DEFINE', desc: 'Launch, refine, set new standards.' },
          ].map((step, i) => (
            <div key={i} className="flex-shrink-0 w-[70vw] h-[70vh] flex flex-col justify-center px-12 relative">
              <span className="absolute top-8 left-12 text-[clamp(6rem,15vw,12rem)] font-extrabold text-white/[0.02] leading-none select-none">{step.num}</span>
              <h3 className="glass-text text-6xl md:text-9xl font-extrabold mb-8">{step.title}</h3>
              <p className="glass-text-dim text-xl max-w-lg leading-relaxed">{step.desc}</p>
              {i < 3 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-purple-500/20 to-transparent" />}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          WHY INWOQ
          ============================================ */}
      <section id="about" className="why-section py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="glass-text text-4xl md:text-7xl font-bold mb-16 text-center">Why INWOQ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'Precision Crafted', desc: 'Every pixel, every interaction — meticulously designed for perfection.' },
              { title: 'Future Ready', desc: "Built with tomorrow's technology, for today's needs." },
              { title: 'Seamless Integration', desc: 'Technology that adapts to you, not the other way around.' },
              { title: 'Excellence Driven', desc: "We don't do ordinary. Every project is our masterpiece." },
            ].map((item, i) => (
              <div key={i} className="why-card glass-card p-8">
                <h3 className="glass-text-bright text-2xl font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="glass-text-dim leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT
          ============================================ */}
      <section id="contact" className="contact-section py-32 px-6 md:px-16 relative z-10 min-h-screen flex items-center">
        <div className="max-w-xl mx-auto w-full">
          <h2 className="glass-text text-4xl md:text-6xl font-bold mb-4 text-center">
            {splitChars("Let's Create Calm", 'contact-char')}
          </h2>
          <p className="glass-text-muted text-center mb-12">Ready to transform your digital presence?</p>

          <form className="space-y-5">
            {[{ id: 'name', label: 'Your Name', type: 'text' }, { id: 'email', label: 'Email', type: 'email' }, { id: 'company', label: 'Company (Optional)', type: 'text' }].map(f =>
              <div key={f.id} className="relative">
                <input type={f.type} id={f.id} required={f.id !== 'company'} placeholder=" "
                  className="glass-input w-full rounded-xl py-4 px-4 text-white outline-none peer" />
                <label htmlFor={f.id}
                  className="absolute left-4 top-4 text-white/20 text-sm transition-all
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#050010] peer-focus:px-2
                    peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-[#050010] peer-[&:not(:placeholder-shown)]:px-2">
                  {f.label}
                </label>
              </div>
            )}
            <div className="relative">
              <textarea id="message" required placeholder=" " rows="4"
                className="glass-input w-full rounded-xl py-4 px-4 text-white outline-none resize-none peer" />
              <label htmlFor="message"
                className="absolute left-4 top-4 text-white/20 text-sm transition-all
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#050010] peer-focus:px-2
                  peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-[#050010] peer-[&:not(:placeholder-shown)]:px-2">
                Tell us about your project
              </label>
            </div>
            <button type="submit" className="w-full py-4 rounded-full solid-button text-sm tracking-wider uppercase flex items-center justify-center gap-2 group">
              <span>Send Message</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="py-12 px-6 md:px-16 border-t border-white/[0.04] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-lg font-bold tracking-[0.15em] glass-text">INWOQ</span>
            <p className="glass-text-muted text-xs mt-1">We make technologies calm</p>
          </div>
          <div className="flex gap-8 text-xs tracking-wider">
            {['Services', 'Process', 'About', 'Contact'].map(l =>
              <a key={l} href={`#${l.toLowerCase()}`} className="glass-text-muted hover:text-white/70 transition-colors">{l}</a>
            )}
          </div>
          <p className="text-white/[0.12] text-xs">© 2026 INWOQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
