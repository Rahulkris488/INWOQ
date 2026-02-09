import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero letters animation
      gsap.fromTo('.hero-letter',
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3
        }
      )

      // Hero motto words
      gsap.fromTo('.motto-word',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 1.2
        }
      )

      // Why calm section - text reveal
      gsap.fromTo('.why-calm-char',
        { color: '#1a1a1a', opacity: 0.1 },
        {
          color: '#ffffff',
          opacity: 1,
          stagger: 0.008,
          scrollTrigger: {
            trigger: '.why-calm-section',
            start: "top 70%",
            end: "top 20%",
            scrub: 1
          }
        }
      )

      // Services cards stagger
      gsap.fromTo('.service-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.services-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Process horizontal scroll
      const processSection = document.querySelector('.process-section')
      const processContainer = document.querySelector('.process-container')
      if (processSection && processContainer) {
        const processWidth = processContainer.scrollWidth - window.innerWidth

        gsap.to(processContainer, {
          x: -processWidth,
          ease: "none",
          scrollTrigger: {
            trigger: processSection,
            start: "top top",
            end: () => `+=${processWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        })

        // Process step animations
        gsap.utils.toArray('.process-step').forEach((step) => {
          gsap.fromTo(step.querySelectorAll('.step-char'),
            { opacity: 0, y: 50, color: '#1a1a1a' },
            {
              opacity: 1,
              y: 0,
              color: '#ffffff',
              stagger: 0.02,
              scrollTrigger: {
                trigger: step,
                start: "left 70%",
                end: "left 30%",
                scrub: 1,
                containerAnimation: gsap.getById?.('processScroll')
              }
            }
          )
        })
      }

      // Why INWOQ cards
      gsap.fromTo('.why-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.why-section',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Contact title
      gsap.fromTo('.contact-char',
        { opacity: 0, y: 40, rotateY: 60 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.contact-section',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Split text helper
  const splitChars = (text, className) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`inline-block ${className}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="text-xl font-bold tracking-[0.2em] bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          INWOQ
        </div>
        <div className="hidden md:flex gap-8">
          {['Services', 'Process', 'Why Us', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-zinc-400 hover:text-white text-sm tracking-wide transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-radial from-purple-600/30 via-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[100px] rotate-12" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-[clamp(4rem,15vw,14rem)] font-bold tracking-[0.05em] leading-none mb-6 perspective-1000">
            {'INWOQ'.split('').map((letter, i) => (
              <span key={i} className="hero-letter inline-block bg-gradient-to-br from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(0,212,255,0.3)]">
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-3xl font-light text-zinc-400 tracking-[0.15em] lowercase">
            {'we make technologies calm'.split(' ').map((word, i) => (
              <span key={i} className="motto-word inline-block mr-3">{word}</span>
            ))}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs text-zinc-500 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Why Calm Section */}
      <section className="why-calm-section min-h-screen flex items-center justify-center px-6 md:px-16 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a15] to-[#050505]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Why Calm?
          </h2>
          <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed">
            <p>
              {splitChars('In a world of complexity, we strip away the noise.', 'why-calm-char')}
            </p>
            <p>
              {splitChars('Technology should feel effortless — invisible yet powerful.', 'why-calm-char')}
            </p>
            <p>
              {splitChars('We craft digital experiences that breathe, flow, and simply work.', 'why-calm-char')}
            </p>
          </div>
        </div>

        {/* Decorative circles */}
        <svg className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 opacity-10 animate-spin" style={{ animationDuration: '60s' }} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#7b2cbf" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* Services Section - Grid Layout */}
      <section id="services" className="py-32 px-6 md:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a15] via-[#050510] to-[#0a0515]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">What We Create</span>
          </h2>
          <p className="text-zinc-500 text-center mb-16 text-lg">Transforming ideas into digital excellence</p>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Websites', desc: 'Stunning, performant websites that captivate and convert visitors into customers.', icon: '🌐' },
              { title: 'Web Applications', desc: 'Complex applications made elegantly simple. Scalable and built for growth.', icon: '⚡' },
              { title: 'Mobile Apps', desc: 'Native experiences that feel natural and intuitive in your hands.', icon: '📱' },
              { title: 'AI Workflow Systems', desc: 'Intelligent automation that thinks ahead and streamlines your operations.', icon: '🤖' },
              { title: 'AI Integrations', desc: 'Seamlessly weaving AI capabilities into your existing systems.', icon: '🔗' },
              { title: 'AI Chatbots', desc: 'Conversations that understand, assist, and delight your users 24/7.', icon: '💬' },
            ].map((service, i) => (
              <div key={i} className="service-card group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,212,255,0.1)]">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Horizontal Scroll */}
      <section className="process-section h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#0a0510] to-[#050505]" />

        <div className="process-container flex items-center h-full px-16 gap-32 relative z-10" style={{ width: 'max-content' }}>
          <div className="flex-shrink-0 w-[50vw] flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Our Process</span>
            </h2>
            <p className="text-zinc-500 text-xl">Four steps to digital calm</p>
          </div>

          {[
            { num: '01', title: 'LISTEN', desc: 'We absorb your vision, challenges, and dreams. Every detail matters in understanding your needs.' },
            { num: '02', title: 'DECIDE', desc: 'Strategic choices, clear direction. We map the optimal path to bring your vision to life.' },
            { num: '03', title: 'BUILD', desc: 'Pixel-perfect execution with cutting-edge technology. Watch your vision materialize.' },
            { num: '04', title: 'DEFINE', desc: 'Launch, refine, and set new standards. Your success becomes the benchmark.' },
          ].map((step, i) => (
            <div key={i} className="process-step flex-shrink-0 w-[70vw] h-[70vh] flex flex-col justify-center px-12 relative">
              <span className="absolute top-8 left-12 text-8xl font-bold text-white/5">{step.num}</span>
              <h3 className="text-6xl md:text-8xl font-bold mb-8">
                {step.title.split('').map((char, j) => (
                  <span key={j} className="step-char inline-block">{char}</span>
                ))}
              </h3>
              <p className="text-zinc-400 text-xl max-w-lg leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why INWOQ Section */}
      <section id="why-us" className="why-section py-32 px-6 md:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080812] to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,44,191,0.1),transparent_70%)]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Why INWOQ?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Precision Crafted', desc: 'Every pixel, every interaction — meticulously designed for absolute perfection.' },
              { title: 'Future Ready', desc: 'Built with tomorrow\'s technology, designed for today\'s needs and beyond.' },
              { title: 'Seamless Integration', desc: 'Technology that adapts to you, not the other way around.' },
              { title: 'Excellence Driven', desc: 'We don\'t do ordinary. Every project is our masterpiece.' },
            ].map((item, i) => (
              <div key={i} className="why-card p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(123,44,191,0.1)]">
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-32 px-6 md:px-16 relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0a0a15] to-[#050505]" />

        <div className="relative z-10 max-w-xl mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            {splitChars("Let's Create Calm", 'contact-char')}
          </h2>
          <p className="text-zinc-500 text-center mb-12">Ready to transform your digital presence?</p>

          <form className="space-y-8">
            <div className="relative group">
              <input type="text" id="name" required placeholder=" "
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:border-cyan-500 transition-colors peer" />
              <label htmlFor="name" className="absolute left-0 top-4 text-zinc-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                Your Name
              </label>
            </div>
            <div className="relative group">
              <input type="email" id="email" required placeholder=" "
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:border-cyan-500 transition-colors peer" />
              <label htmlFor="email" className="absolute left-0 top-4 text-zinc-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                Email Address
              </label>
            </div>
            <div className="relative group">
              <input type="text" id="company" placeholder=" "
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:border-cyan-500 transition-colors peer" />
              <label htmlFor="company" className="absolute left-0 top-4 text-zinc-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                Company (Optional)
              </label>
            </div>
            <div className="relative group">
              <textarea id="message" required placeholder=" " rows="4"
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-white outline-none focus:border-cyan-500 transition-colors resize-none peer" />
              <label htmlFor="message" className="absolute left-0 top-4 text-zinc-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs">
                Tell us about your project
              </label>
            </div>
            <button type="submit"
              className="w-full py-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold text-lg hover:shadow-[0_20px_60px_rgba(0,212,255,0.3)] transition-all duration-500 hover:-translate-y-1 flex items-center justify-center gap-3 group">
              <span>Send Message</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </div>

        {/* Decorative */}
        <svg className="absolute right-10 bottom-20 w-64 h-64 opacity-5" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-xl font-bold tracking-[0.2em] bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">INWOQ</span>
            <p className="text-zinc-600 text-sm mt-1">We make technologies calm</p>
          </div>
          <div className="flex gap-8 text-zinc-500 text-sm">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-zinc-600 text-sm">© 2026 INWOQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
