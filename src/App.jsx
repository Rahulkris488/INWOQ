import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — stagger fade up
      gsap.fromTo('.hero-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.4 }
      )

      // Blobs entrance — scale up & fade
      gsap.fromTo('.blob',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 3, stagger: 0.2, ease: "power2.out", delay: 0.1 }
      )

      // Glow orb entrance
      gsap.fromTo('.glow-orb',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 2, ease: "elastic.out(1, 0.5)", delay: 1 }
      )

      // About section fade in
      gsap.fromTo('.about-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: '.about-section', start: "top 75%", toggleActions: "play none none reverse" }
        }
      )

      // About blobs parallax
      gsap.to('.about-blob--purple', {
        y: -80,
        scrollTrigger: { trigger: '.about-section', start: "top bottom", end: "bottom top", scrub: 1 }
      })
      gsap.to('.about-blob--blue', {
        y: 60,
        scrollTrigger: { trigger: '.about-section', start: "top bottom", end: "bottom top", scrub: 1 }
      })

      // Service cards — frosted glass stagger
      gsap.fromTo('.svc-reveal',
        { opacity: 0, y: 30, backdropFilter: 'blur(0px)' },
        {
          opacity: 1, y: 0, backdropFilter: 'blur(40px)', duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: '.service-cards', start: "top 80%", toggleActions: "play none none reverse" }
        }
      )

      // Bento cards — scale + fade stagger
      gsap.fromTo('.bento-reveal',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: '.services-bento', start: "top 80%", toggleActions: "play none none reverse" }
        }
      )

      // Process horizontal scroll
      const ps = document.querySelector('.process-section')
      const pc = document.querySelector('.process-container')
      if (ps && pc) {
        gsap.to(pc, {
          x: -(pc.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ps, start: "top top",
            end: () => `+=${pc.scrollWidth - window.innerWidth}`,
            pin: true, scrub: 1, anticipatePin: 1
          }
        })
      }

      // Wave lines on contact section parallax
      gsap.fromTo('.wave-lines',
        { opacity: 0, y: 40 },
        {
          opacity: 0.06, y: 0, duration: 1.5,
          scrollTrigger: { trigger: '.contact-section', start: "top 80%", toggleActions: "play none none reverse" }
        }
      )

      // Contact reveal
      gsap.fromTo('.contact-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
          scrollTrigger: { trigger: '.contact-section', start: "top 70%", toggleActions: "play none none reverse" }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ background: '#050510' }}>
      {/* Fixed background + noise */}
      <div className="site-bg" />
      <div className="noise-overlay" />

      {/* ---- NAVBAR (liquid glass — image 5) ---- */}
      <nav className="navbar">
        <a href="#" className="nav-logo">
          <span className="nav-logo-dot">N</span>
          <span>Novae</span>
        </a>

        <div className="nav-links">
          {['Work', 'Capabilities', 'About', 'Careers'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
        </div>

        <a href="#contact" className="nav-cta">
          Get in touch
          <span className="nav-cta-arrow">→</span>
        </a>
      </nav>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="hero-section">
        {/* Animated gradient blobs (images 1, 3, 5) */}
        <div className="blob-canvas">
          <div className="blob blob--purple" />
          <div className="blob blob--blue" />
          <div className="blob blob--teal" />
          <div className="blob blob--warm" />
          <div className="blob blob--pink" />
        </div>

        {/* Glowing orb (image 3 — GC Studio) */}
        <div className="glow-orb" />

        {/* Sparkle decorations */}
        <div className="hero-sparkle" />
        <div className="hero-sparkle-2" />
        <div className="hero-sparkle-3" />

        {/* Badges */}
        <div className="hero-badges hero-reveal" style={{ position: 'relative', zIndex: 10 }}>
          <span className="hero-badge">We're hiring</span>
          <span className="hero-badge-dot" />
          <span className="hero-badge">Careers →</span>
        </div>

        {/* Main heading — gradient text (image 4 PULSE) */}
        <div className="relative" style={{ zIndex: 10 }}>
          <h1 className="hero-heading hero-reveal">
            Journey Through the{' '}
            <span className="hero-heading-underline">Universe</span>,{' '}
            <span className="hero-heading-italic">Where Innovation Meets Design</span>
          </h1>
        </div>

        {/* CTAs — liquid glass button (image 5) */}
        <div className="hero-ctas hero-reveal" style={{ position: 'relative', zIndex: 10 }}>
          <a href="#contact" className="hero-cta-primary">
            Let's talk
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#work" className="hero-cta-secondary">Works</a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ zIndex: 10 }}>
          <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll</span>
          <svg className="w-4 h-4 scroll-indicator" fill="none" stroke="rgba(139,92,246,0.5)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* ---- BRAND TICKER ---- */}
      <div className="relative z-10 py-8 border-y border-white/[0.04] overflow-hidden">
        <div className="ticker-track flex gap-16 items-center whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(2)].map((_, rep) =>
            ['TechCorp', 'StartupXYZ', 'InnovateCo', 'FutureAI', 'DigitalEdge', 'CloudNine', 'MetaFlow', 'QuantumLab'].map((brand, i) =>
              <span key={`${rep}-${i}`} className="text-white/[0.06] text-lg font-bold tracking-[0.2em] uppercase">{brand}</span>
            )
          )}
        </div>
      </div>

      {/* ============================================
          ABOUT SECTION — with background blobs
          ============================================ */}
      <section className="about-section" id="about">
        {/* Background blobs for this section */}
        <div className="about-blob-canvas">
          <div className="about-blob about-blob--purple" />
          <div className="about-blob about-blob--blue" />
        </div>

        <div className="about-container">
          {/* Left column */}
          <div className="about-left">
            <h2 className="about-tagline about-reveal">
              A Collective of Creative Visionaries and Technical Wizards, Pioneering the Future of Design and Development
            </h2>

            <div className="about-meta about-reveal">
              <div className="about-meta-item">
                <span className="about-meta-label">Founded in</span>
                <span className="about-meta-value">2018</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label">Services</span>
                <span className="about-meta-value">Branding, UI/UX Design, Development</span>
              </div>
            </div>
          </div>

          {/* Right column — Glassmorphism cards (image 2) */}
          <div className="service-cards">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Strategy',
                desc: 'With a very systematic approach to digital strategy, we take products and companies to new heights.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="11" cy="11" r="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Design',
                desc: 'Highly appealing products, functional interfaces and superior user experiences and development.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="14" y1="4" x2="10" y2="20" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Development',
                desc: 'Robust and high performing products as a result of a fusion of both the latest and proven technologies.'
              },
            ].map((card, i) => (
              <div key={i} className="service-card svc-reveal">
                <div className="service-card-icon">{card.icon}</div>
                <div className="service-card-content">
                  <h3 className="service-card-title">{card.title}</h3>
                  <p className="service-card-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES — GLASSMORPHISM BENTO GRID (image 2)
          ============================================ */}
      <section id="capabilities" className="services-section">
        <div className="services-section-header">
          <h2 className="services-section-title">What We Create</h2>
          <p className="services-section-subtitle">Transforming ideas into digital excellence</p>
        </div>

        <div className="services-bento">
          {[
            { title: 'Websites', desc: 'Stunning, performant websites that captivate and convert.', icon: '🌐', span: 'bento-tall' },
            { title: 'Web Apps', desc: 'Complex applications made elegantly simple.', icon: '⚡', span: '' },
            { title: 'Mobile Apps', desc: 'Native experiences that feel natural.', icon: '📱', span: '' },
            { title: 'AI Workflows', desc: 'Intelligent automation that streamlines everything.', icon: '🤖', span: '' },
            { title: 'AI Integrations', desc: 'Seamlessly weaving AI into existing systems.', icon: '🔗', span: '' },
            { title: 'AI Chatbots', desc: 'Conversations that understand and delight.', icon: '💬', span: 'bento-wide' },
          ].map((s, i) => (
            <div key={i} className={`bento-card bento-reveal ${s.span}`}>
              <div>
                <div className="bento-card-icon">{s.icon}</div>
                <h3 className="bento-card-title">{s.title}</h3>
                <p className="bento-card-desc">{s.desc}</p>
              </div>
              <div className="bento-card-arrow">
                <span>Learn more</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          PROCESS — HORIZONTAL SCROLL
          ============================================ */}
      <section className="process-section">
        <div className="process-container">
          <div className="process-intro">
            <h2 className="process-intro-title">Our Process</h2>
            <p className="process-intro-subtitle">Four steps to digital excellence</p>
          </div>

          {[
            { num: '01', title: 'LISTEN', desc: 'We absorb your vision, challenges, and dreams.' },
            { num: '02', title: 'DECIDE', desc: 'Strategic choices, clear direction forward.' },
            { num: '03', title: 'BUILD', desc: 'Pixel-perfect execution with cutting-edge tech.' },
            { num: '04', title: 'DEFINE', desc: 'Launch, refine, set new standards.' },
          ].map((step, i) => (
            <div key={i} className="process-step">
              <span className="process-step-num">{step.num}</span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
              {i < 3 && <div className="process-divider" />}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          CONTACT — with wave line pattern (image 4 PULSE)
          ============================================ */}
      <section id="contact" className="contact-section">
        {/* Wave / topographic lines SVG background (from image 4) */}
        <svg className="wave-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d={`M0 ${300 + i * 50} Q360 ${250 + i * 50 + Math.sin(i) * 40} 720 ${300 + i * 50} T1440 ${300 + i * 50}`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
              fill="none"
            />
          ))}
        </svg>

        <div className="contact-inner">
          <h2 className="contact-title contact-reveal">Let's Create Together</h2>
          <p className="contact-subtitle contact-reveal">Ready to bring your vision to life?</p>

          <form className="contact-form contact-reveal">
            <div className="contact-input-wrap">
              <input type="text" className="contact-input" placeholder="Your Name" required />
            </div>
            <div className="contact-input-wrap">
              <input type="email" className="contact-input" placeholder="Email" required />
            </div>
            <div className="contact-input-wrap">
              <input type="text" className="contact-input" placeholder="Company (Optional)" />
            </div>
            <div className="contact-input-wrap">
              <textarea className="contact-input" placeholder="Tell us about your project" rows="4" required />
            </div>
            <button type="submit" className="contact-submit">
              <span>Send Message</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">INWOQ</div>
            <p className="footer-tagline">Where Innovation Meets Design</p>
          </div>
          <div className="footer-links">
            {['Work', 'Capabilities', 'About', 'Careers', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
            ))}
          </div>
          <p className="footer-copy">© 2026 INWOQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
