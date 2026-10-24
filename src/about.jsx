import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// Curated rotating hero banner background images tailored for an "About Us" page
const ABOUT_HERO_IMAGES = [
    { url: "/images/about4.jpg", alt: "Team Collaboration" },
    { url: "/images/about5.jpg", alt: "Modern Office Space" },
    { url: "/images/about6.jpg", alt: "Tech Leadership Team" },
    { url: "/images/hakasolution (9).jpg", alt: "Strategy Meeting" }
];

// Subtle animated data particles configuration
const DATA_PARTICLES = [
    { top: '18%', left: '12%', size: 'w-2 h-2', delay: '0s', duration: '5s' },
    { top: '28%', left: '44%', size: 'w-1.5 h-1.5', delay: '1.2s', duration: '7s' },
    { top: '65%', left: '18%', size: 'w-2.5 h-2.5', delay: '2.5s', duration: '6s' },
    { top: '75%', left: '52%', size: 'w-1.5 h-1.5', delay: '0.8s', duration: '8s' },
    { top: '22%', left: '82%', size: 'w-2 h-2', delay: '1.7s', duration: '5.5s' },
    { top: '58%', left: '88%', size: 'w-1.5 h-1.5', delay: '3s', duration: '6.5s' },
];

// Portfolio Live Project Categories
const PORTFOLIO_CATEGORIES = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'E-Commerce', label: 'Luxury E-Commerce' },
    { id: 'Construction', label: 'Civil & Landscaping' },
    { id: 'Healthcare', label: 'HealthTech Network' }
];

// Live Production Ecosystems Portfolio (3 Featured Deployments)
const PORTFOLIO_PROJECTS = [
    {
        id: 'fashion',
        category: 'E-Commerce',
        tag: 'LUXURY COMMERCE',
        title: 'AURA Haute Couture & Luxury Fashion Showcase',
        subtitle: 'Flagship Digital Experience',
        metric: '+340% Mobile Conversion',
        desc: 'Interactive 3D runway previews, headless multi-currency checkout, and real-time European boutique synchronization with sub-second page transitions.',
        tech: ['Next.js 15', 'Shopify Plus', 'WebGL / Three.js', 'Stripe Global'],
        image: '/images/hakasolution (10).jpg'
    },
    {
        id: 'construction',
        category: 'Construction',
        tag: 'CIVIL & LANDSCAPE',
        title: 'TS Landscaping & Heavy Construction Site',
        subtitle: 'Civil Earthworks & Field Ops',
        metric: '40+ Active Field Sites',
        desc: 'Comprehensive civil construction operations portal with drone topographic mapping, real-time crew dispatch, and automated equipment telemetry.',
        tech: ['React', '3D BIM Viewer', 'Node.js', 'PostgreSQL', 'Mapbox GL'],
        image: '/images/hakasolution (11).jpg'
    },
    {
        id: 'healthcare',
        category: 'Healthcare',
        tag: 'HEALTHTECH NETWORK',
        title: 'PulseCore Healthcare Provider Clinic Network',
        subtitle: 'HIPAA Clinical Orchestration',
        metric: '99.999% Core HIPAA Uptime',
        desc: 'Secure multi-clinic coordination suite handling patient intake, biometric sync, encrypted telemedicine consultations, and zero-latency lab pipelines.',
        tech: ['TypeScript', 'FHIR API', 'AWS GovCloud', 'TailwindCSS'],
        image: '/images/hakasolution (12).jpg'
    }
];

function About() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('ALL');

    // Automatically transition hero background image every 4.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ABOUT_HERO_IMAGES.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    // Detect scroll past hero banner for navbar state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 420);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for scroll fade in / fade out animations
    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible'); // Fades out when out of view
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.08 // Triggers smoothly when 8% of the section is visible
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const elements = document.querySelectorAll('.reveal-element');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-sans text-white selection:bg-orange-500 selection:text-white overflow-x-hidden w-full max-w-[100vw]">

            {/* INJECTED CSS FOR FONTS, UNIQUE ANIMATIONS & SCROLL FADES */}
            <style>{`
                /* Import Instrument Serif from Google Fonts */
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

                .font-instrument {
                    font-family: 'Instrument Serif', serif;
                    font-weight: 400;
                }

                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-14px); }
                }
                @keyframes floatDelayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes particlePulse {
                    0%, 100% { opacity: 0.2; transform: translateY(0px) scale(1); }
                    50% { opacity: 0.85; transform: translateY(-18px) scale(1.3); }
                }
                @keyframes dashFlow {
                    to { stroke-dashoffset: -100; }
                }
                
                /* Fade In / Fade Out Scroll Animation Classes for Page Sections */
                .reveal-element {
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: opacity, transform;
                }
                .reveal-element.visible {
                    opacity: 1;
                    transform: translateY(0px);
                }
                .delay-100 { transition-delay: 100ms; }
                .delay-200 { transition-delay: 200ms; }

                .animate-dashboard-float { animation: floatSlow 6s ease-in-out infinite; }
                .animate-badge-float { animation: floatDelayed 5s ease-in-out 2s infinite; }
                .animate-network-line { stroke-dasharray: 8 8; animation: dashFlow 12s linear infinite; }
            `}</style>

            <Navbar isScrolled={isScrolled} activePage="about" />

            {/* ===================================================================== */}
            {/* ABOUT HERO SECTION                                                    */}
            {/* ===================================================================== */}
            <section id="hero" className="relative min-h-[100svh] w-full flex flex-col justify-center pt-28 pb-20 md:pb-28 overflow-hidden bg-[#0a0a0a] reveal-element">

                {/* Rotating Background Images + Noise/Grain Texture */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {ABOUT_HERO_IMAGES.map((img, idx) => (
                        <img
                            key={idx}
                            src={img.url}
                            alt={img.alt}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${idx === currentImageIndex ? 'opacity-50 scale-105' : 'opacity-0 scale-100'
                                }`}
                        />
                    ))}
                    {/* Dark gradient overlay - balanced for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-transparent"></div>
                    {/* Custom Noise Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

                    {/* Glowing Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-orange-600/20 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-amber-500/10 rounded-full blur-[80px] md:blur-[100px] mix-blend-screen pointer-events-none"></div>
                </div>

                {/* Animated Network Lines & Particles */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M -100 280 Q 480 -50 880 380 T 1580 200" fill="none" stroke="url(#networkGrad)" strokeWidth="1" className="animate-network-line" />
                        <path d="M -50 620 Q 520 480 980 580 T 1600 440" fill="none" stroke="url(#networkGrad)" strokeWidth="0.5" className="animate-network-line" />
                    </svg>

                    {DATA_PARTICLES.map((p, index) => (
                        <span key={index} style={{ top: p.top, left: p.left, animation: `particlePulse ${p.duration} ease-in-out ${p.delay} infinite` }}
                            className={`absolute rounded-full bg-orange-400 shadow-[0_0_15px_#f97316] ${p.size}`} />
                    ))}
                </div>

                <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                    {/* Left Column: Typography */}
                    <div className="lg:col-span-7 text-left text-white mt-10 lg:mt-0">
                        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-6 sm:mb-8 shadow-inner shadow-white/5">
                            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-orange-500"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-slate-300 truncate">
                                OUR STORY
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-[80px] xl:text-[96px] font-instrument tracking-normal leading-[1.05] sm:leading-[1] mb-6">
                            Pioneering <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600 italic pr-4">
                                Digital Excellence.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
                            HAKA Solutions was founded on a simple premise: technology should empower, not hinder. We are a global collective of engineers, strategists, and visionaries redefining operational scale.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
                            <a href="#mission" className="group relative w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-orange-600 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase rounded-sm overflow-hidden flex items-center gap-3">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="relative z-10 w-full text-center">Our Mission</span>
                                <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform shrink-0">↓</span>
                            </a>
                            <a href="#team" className="group w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-transparent border border-white/20 hover:border-orange-500 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-3">
                                <span className="w-full text-center">Meet The Team</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Orbital Tech Core (Refined for Viewport) */}
                    <div className="lg:col-span-5 relative flex items-center justify-center h-[350px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0 perspective-[1000px]">

                        <div className="absolute w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full blur-[60px] sm:blur-[80px] opacity-30 animate-pulse" />

                        {/* 3D Tilted Concentric Rings - Scaled for viewport constraints */}
                        <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] border-[1px] border-orange-500/20 rounded-full border-dashed animate-[spin_30s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(10deg)' }} />
                        <div className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] border-[2px] border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" style={{ transform: 'rotateX(60deg) rotateY(10deg)' }} />

                        {/* Central Glass Node */}
                        <div className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.2)] transform rotate-45">
                            <span className="text-4xl sm:text-5xl md:text-6xl font-instrument text-white transform -rotate-45">H<span className="text-orange-500 font-sans">.</span></span>
                        </div>

                        {/* Glass Widgets - Adjusted positions for mobile viewport */}
                        <div className="absolute top-[0%] sm:top-[10%] left-0 sm:left-2 z-20 p-3 sm:p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl animate-dashboard-float scale-90 sm:scale-100 origin-left">
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400">Global Reach</span>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-white tracking-wide">24/7 Operations</div>
                        </div>

                        <div className="absolute bottom-[5%] sm:bottom-[15%] right-0 sm:-right-4 lg:right-0 z-20 p-4 sm:p-5 w-44 sm:w-52 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl animate-badge-float scale-90 sm:scale-100 origin-right">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-orange-400 mb-2 sm:mb-3">Team Growth</p>
                            <div className="flex items-end gap-1 sm:gap-1.5 h-8 sm:h-10 mb-2">
                                {[30, 45, 60, 75, 85, 95, 100].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-600/50 to-orange-400 rounded-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="text-right text-[10px] sm:text-xs text-white font-mono">150+ Experts</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 1: MISSION & VISION STATEMENT (~50 lines)                     */}
            {/* ===================================================================== */}
            <section id="mission" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[1px] w-12 bg-orange-500"></div>
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase">Our Foundation</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-instrument text-white leading-tight mb-6">
                                Bridging ambitious vision with <br />
                                <span className="text-orange-500 italic">resilient engineering.</span>
                            </h2>
                            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8 font-normal">
                                We exist to transform legacy friction into hyper-scalable velocity. By unifying human ingenuity with autonomous infrastructure, we build ecosystems designed to thrive amidst volatility.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                <div>
                                    <div className="text-3xl font-instrument text-white mb-1">01 / Purpose</div>
                                    <p className="text-xs sm:text-sm text-neutral-400">Pioneering secure, mission-critical digital pipelines for worldwide commerce.</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-instrument text-orange-500 mb-1">02 / Horizon</div>
                                    <p className="text-xs sm:text-sm text-neutral-400">Democratizing enterprise-grade cloud automation for every growing industry.</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[380px] group">
                                <img src="/images/about3.jpg" alt="Team Brainstorming" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                                    <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold block mb-1">Guiding Creed</span>
                                    <p className="text-xs text-neutral-200 italic font-medium">"Simplicity is the prerequisite for reliability."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 2: TIMELINE & JOURNEY (~50 lines)                             */}
            {/* ===================================================================== */}
            <section id="journey" className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-sm mb-4">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Evolution</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-instrument text-white mb-4">
                            From Genesis to <span className="italic text-orange-500">Global Scale.</span>
                        </h2>
                        <p className="text-neutral-400 text-sm sm:text-base font-normal">A brief history of continuous breakthroughs, resilience, and expansion.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { year: "2019", title: "Inception & Core R&D", desc: "Founded with 5 systems engineers determined to rethink workflow automation." },
                            { year: "2021", title: "Enterprise Pilot Launch", desc: "Deployed first distributed edge clusters across tier-1 financial partners." },
                            { year: "2023", title: "Global Network Expansion", desc: "Scaled operations across 14 international timezones and 200+ nodes." },
                            { year: "2025+", title: "Autonomous Operations", desc: "Launching self-healing cloud fabrics and AI-assisted workflow engines." }
                        ].map((m, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 hover:border-orange-500/50 shadow-sm hover:shadow-[0_0_25px_rgba(249,115,22,0.1)] transition-all group">
                                <span className="text-3xl font-instrument text-orange-500 block mb-3 group-hover:translate-x-1 transition-transform">{m.year}</span>
                                <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                                <p className="text-xs text-neutral-400 leading-relaxed font-normal">{m.desc}</p>
                                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                                    <span>PHASE 0{i + 1}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 3: CORE VALUES & CULTURE (~50 lines)                          */}
            {/* ===================================================================== */}
            <section id="values" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-10 bg-orange-500"></div>
                                <span className="text-xs font-bold tracking-widest uppercase text-orange-500">Core DNA</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-instrument text-white">
                                Principles That <span className="italic text-neutral-400">Anchor Us.</span>
                            </h2>
                        </div>
                        <p className="text-neutral-400 max-w-md text-sm font-normal">Non-negotiable ethical and architectural standards that dictate every line of code we write.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { tag: "ETHICS", title: "Radical Transparency", desc: "No opaque black boxes. We deliver open architectural clarity, honest SLAs, and verifiable metrics.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                            { tag: "QUALITY", title: "Engineering Rigor", desc: "Zero-tolerance for fragile hacks. Everything is battle-tested, unit-validated, and built for continuous uptime.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
                            { tag: "MINDSET", title: "Velocity With Purpose", desc: "Speed is nothing without direction. We accelerate outcomes while preserving security and sustainable architecture.", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
                        ].map((val, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/10 hover:border-orange-500/50 hover:bg-[#121212] transition-all shadow-sm flex flex-col justify-between h-[280px]">
                                <div>
                                    <div className="w-10 h-10 rounded-lg bg-orange-600/15 border border-orange-500/30 text-orange-500 flex items-center justify-center mb-6">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={val.icon} /></svg>
                                    </div>
                                    <span className="text-[10px] font-mono tracking-widest text-orange-500 font-bold uppercase mb-2 block">{val.tag}</span>
                                    <h3 className="text-xl font-instrument text-white mb-2">{val.title}</h3>
                                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 4: LEADERSHIP & STRATEGISTS (~50 lines)                       */}
            {/* ===================================================================== */}
            <section id="team" className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-sm mb-4">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Team</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-instrument text-white mb-4">
                            Minds Behind The <span className="italic text-orange-500">Machines.</span>
                        </h2>
                        <p className="text-neutral-400 text-sm sm:text-base font-normal">Seasoned operators with backgrounds spanning hyperscale infrastructure and automated systems.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Aria Thorne", role: "Chief Executive Officer", focus: "Systems Strategy & Scale", img: "/images/author (1).jpg" },
                            { name: "Devon Chen", role: "Head of Infrastructure", focus: "Distributed Consensus", img: "/images/author (2).jpg" },
                            { name: "Elena Rostova", role: "VP of Automation", focus: "Autonomous Robotics", img: "/images/about4.jpg" },
                            { name: "Marcus Vance", role: "Principal Architect", focus: "Zero-Trust Cryptography", img: "/images/author (4).jpg" }
                        ].map((member, i) => (
                            <div key={i} className="group rounded-2xl bg-[#0d0d0d] border border-white/10 overflow-hidden hover:border-orange-500/50 shadow-sm hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] transition-all">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0 opacity-90" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-lg font-instrument text-white mb-0.5">{member.name}</h4>
                                    <p className="text-xs text-orange-500 font-semibold mb-2">{member.role}</p>
                                    <p className="text-[11px] text-neutral-400 font-light border-t border-white/10 pt-2 font-mono">{member.focus}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 5: GLOBAL FOOTPRINT & IMPACT NUMBERS (~50 lines)              */}
            {/* ===================================================================== */}
            <section id="impact" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-8 bg-orange-500"></div>
                                <span className="text-xs font-bold tracking-widest uppercase text-orange-500">Worldwide Presence</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-instrument text-white mb-6">
                                Engineering scale with <span className="italic text-orange-500">measurable impact.</span>
                            </h2>
                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                                Our distributed edge presence spans continents, offering microsecond predictability and continuous operational resilience for organizations operating around the clock.
                            </p>
                            <div className="flex items-center gap-6">
                                <div><div className="text-2xl font-instrument text-white font-bold">24/7/365</div><p className="text-[11px] text-neutral-500 uppercase tracking-wider">Live Monitoring</p></div>
                                <div className="w-px h-10 bg-white/10"></div>
                                <div><div className="text-2xl font-instrument text-orange-500 font-bold">100%</div><p className="text-[11px] text-neutral-500 uppercase tracking-wider">Encrypted At Rest</p></div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                            {[
                                { num: "42M+", label: "Tasks Automated Daily", desc: "Hands-off operational workflows." },
                                { num: "99.999%", label: "Verified Core Uptime", desc: "Contractually guaranteed SLAs." },
                                { num: "18", label: "Global Edge Hubs", desc: "Americas, EMEA & APAC coverage." },
                                { num: "< 3ms", label: "Internal Node Latency", desc: "Real-time sync protocols." }
                            ].map((stat, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 hover:border-orange-500/40 hover:bg-[#121212] shadow-sm transition-all">
                                    <div className="text-3xl sm:text-4xl font-instrument text-white mb-2">{stat.num}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-1">{stat.label}</div>
                                    <div className="text-[11px] text-neutral-400 font-light">{stat.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 6: LIVE PRODUCTION PORTFOLIO ECOSYSTEMS                       */}
            {/* ===================================================================== */}
            <section id="portfolio" className="py-24 sm:py-32 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                {/* Subtle ambient background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none"></div>

                <div className="max-w-[1380px] mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase">Portfolio & Deployments</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-instrument text-white leading-tight">
                                Live Systems & <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 italic pr-2">
                                    Client Ecosystems.
                                </span>
                            </h2>
                        </div>
                        <p className="text-neutral-400 max-w-lg text-sm sm:text-base font-normal leading-relaxed">
                            A showcase of mission-critical production platforms running on HAKA infrastructure, spanning luxury e-commerce, civil engineering, clinical healthcare, and high-frequency hospitality.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
                        {PORTFOLIO_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                                    : 'bg-[#0d0d0d] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 shadow-sm'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {PORTFOLIO_PROJECTS
                            .filter(project => activeCategory === 'ALL' || project.category === activeCategory)
                            .map((project) => (
                                <div
                                    key={project.id}
                                    className="group rounded-2xl sm:rounded-3xl bg-[#0d0d0d] border border-white/10 hover:border-orange-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                                >
                                    <div>
                                        {/* Image Area with Badges */}
                                        <div className="relative h-60 sm:h-64 overflow-hidden bg-[#141414]">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/30 to-transparent"></div>

                                            {/* Top badges */}
                                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 font-semibold shadow-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    LIVE PRODUCTION
                                                </span>
                                                <span className="px-2.5 py-1 rounded-full bg-orange-600 text-white text-[9px] font-bold tracking-widest uppercase shadow">
                                                    {project.tag}
                                                </span>
                                            </div>

                                            {/* Bottom impact stat preview */}
                                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                                                <span className="text-[11px] font-mono text-orange-400 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-orange-500/30 font-semibold shadow-sm">
                                                    {project.metric}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6 sm:p-7">
                                            <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-1">
                                                {project.subtitle}
                                            </p>
                                            <h3 className="text-xl sm:text-2xl font-instrument text-white mb-3 group-hover:text-orange-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-neutral-400 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                                                {project.desc}
                                            </p>

                                            {/* Tech stack badges */}
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                                                {project.tech.map((t, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-300"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                                        <span className="text-neutral-500 font-mono text-[11px]">Status: Active</span>
                                        <a
                                            href="#contact"
                                            className="inline-flex items-center gap-1.5 text-orange-400 font-semibold uppercase tracking-wider text-[11px] hover:text-orange-300 transition-colors"
                                        >
                                            <span>Explore Case Study</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Bottom Feature CTA Banner inside Portfolio */}
                    <div className="mt-16 p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#140e0a] via-[#1a120c] to-[#120c08] border border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-2xl sm:text-3xl font-instrument text-white mb-2">Have a vision for your enterprise infrastructure?</h4>
                            <p className="text-neutral-300 text-xs sm:text-sm font-normal">We build high-availability platforms tailored to scale your specific operations seamlessly.</p>
                        </div>
                        <a
                            href="#contact"
                            className="shrink-0 px-8 py-3.5 rounded-full bg-orange-600 text-white hover:bg-orange-500 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/30"
                        >
                            Initiate Deployment
                        </a>
                    </div>

                </div>
            </section>

            {/* DARK MODE FOOTER */}
            <Footer />

        </div>
    );
}

export default About;