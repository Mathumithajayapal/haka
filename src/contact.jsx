import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// Curated rotating hero banner background images tailored for a "Contact" page
const CONTACT_HERO_IMAGES = [
    { url: "/images/hakasolution (1).jpg", alt: "Digital Communication" },
    { url: "/images/hakasolution (3).jpg", alt: "Customer Support & Strategy" },
    { url: "/images/about3.jpg", alt: "Partnership & Handshake" },
    { url: "/images/hakasolution (5).jpg", alt: "Workspace & Connectivity" }
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

function Contact() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Automatically transition hero background image every 4.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CONTACT_HERO_IMAGES.length);
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
            threshold: 0.15 // Triggers when 15% of the element is visible
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
                
                /* Fade In / Fade Out Scroll Animation Classes */
                .reveal-element {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1);
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

            <Navbar isScrolled={isScrolled} activePage="contact" />

            {/* ===================================================================== */}
            {/* CONTACT HERO SECTION                                                  */}
            {/* ===================================================================== */}
            <section id="hero" className="relative min-h-[100svh] w-full flex flex-col justify-center pt-28 pb-20 md:pb-28 overflow-hidden bg-[#0a0a0a]">

                {/* Rotating Background Images + Noise/Grain Texture */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {CONTACT_HERO_IMAGES.map((img, idx) => (
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
                    <div className="lg:col-span-7 text-left text-white mt-10 lg:mt-0 reveal-element">
                        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-6 sm:mb-8 shadow-inner shadow-white/5">
                            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-orange-500"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-slate-300 truncate">
                                GET IN TOUCH
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-[80px] xl:text-[96px] font-instrument tracking-normal leading-[1.05] sm:leading-[1] mb-6">
                            Start the <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600 italic pr-4">
                                Conversation.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
                            Whether you're looking to scale your digital infrastructure, automate complex workflows, or secure your enterprise network, our global team of experts is ready to assist.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
                            <a href="#contact-form" className="group relative w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-orange-600 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase rounded-sm overflow-hidden flex items-center gap-3">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="relative z-10 w-full text-center">Send a Message</span>
                                <span className="relative z-10 text-lg group-hover:translate-y-1 transition-transform shrink-0">↓</span>
                            </a>
                            <a href="#locations" className="group w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-transparent border border-white/20 hover:border-orange-500 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-3">
                                <span className="w-full text-center">View Locations</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Orbital Tech Core (Refined for Viewport) */}
                    <div className="lg:col-span-5 relative flex items-center justify-center h-[350px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0 perspective-[1000px] reveal-element delay-200">

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
                                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400">Global Support</span>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-white tracking-wide">24/7 Active</div>
                        </div>

                        <div className="absolute bottom-[5%] sm:bottom-[15%] right-0 sm:-right-4 lg:right-0 z-20 p-4 sm:p-5 w-44 sm:w-52 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl animate-badge-float scale-90 sm:scale-100 origin-right">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-orange-400 mb-2 sm:mb-3">Avg Response Time</p>
                            <div className="flex items-end gap-1 sm:gap-1.5 h-8 sm:h-10 mb-2">
                                {[20, 15, 30, 10, 25, 12, 18].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-600/50 to-orange-400 rounded-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="text-right text-[10px] sm:text-xs text-white font-mono">&lt; 15 Minutes</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* 01 / INTERACTIVE DISPATCH TERMINAL & INQUIRY MATRIX (50 Lines)        */}
            {/* ===================================================================== */}
            <section id="contact-form" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" /> SECURE DISPATCH TERMINAL
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">Transmit Your <span className="text-orange-500 italic">Architecture Brief</span></h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">Direct routing to our principal engineers. No spam, no marketing fluff—just pure architecture assessment and feasibility diagnostics.</p>
                            <div className="space-y-3 border-l border-white/10 pl-4 text-xs font-mono text-slate-400">
                                <div className="flex items-center gap-2"><span className="text-orange-500">▶</span> PROTOCOL: TLS 1.3 / E2E ENCRYPTED</div>
                                <div className="flex items-center gap-2"><span className="text-emerald-400">●</span> ROUTE: DIRECT TO ENGINEERING CORE</div>
                                <div className="flex items-center gap-2"><span className="text-orange-400">⚡</span> AVERAGE FIRST RESPONSE: 14.8 MINS</div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative">
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">01 // Full Identity</label>
                                        <input type="text" placeholder="e.g. Alex Morgan" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">02 // Enterprise Email</label>
                                        <input type="email" placeholder="alex@enterprise.com" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">03 // Engagement Scope</label>
                                        <select className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-orange-500 transition-colors">
                                            <option>Cloud Infrastructure & Ops</option><option>AI Automation & Workflows</option><option>Custom SaaS & Web Platform</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">04 // Budget Allocation</label>
                                        <select className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-orange-500 transition-colors">
                                            <option>$10k – $25k (Sprint MVP)</option><option>$25k – $75k (Scale Stage)</option><option>$75k+ (Enterprise Overhaul)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">05 // Project Summary / Objective</label>
                                    <textarea rows="3" placeholder="Describe your current system challenges, deadlines, or desired tech stack..." className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                                    <span>Dispatch Secure Specification</span><span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* 02 / GLOBAL CARTOGRAPHIC RADAR & OPERATIONS MAP (50 Lines)            */}
            {/* ===================================================================== */}
            <section id="locations" className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> GEODETIC OPERATIONS RADAR
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white">Global Nodes & <span className="text-orange-500 italic">Headquarters</span></h2>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-md mt-4 md:mt-0 font-light">Engineers deployed across prime economic time zones for 24/7 continuous delivery and on-site engineering presence.</p>
                    </div>
                    <div className="relative rounded-3xl bg-[#0a0a0a] border border-white/15 overflow-hidden shadow-2xl">
                        <div className="h-[380px] sm:h-[420px] w-full relative overflow-hidden bg-[#070707]">
                            <iframe title="Haka Global Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.228512215392!2d78.9666!3d12.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad390234148b59%3A0x633458bfb8a6fcf7!2sPallikonda%2C%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" className="w-full h-full border-0 filter invert contrast-125 grayscale opacity-75 hover:opacity-100 transition-opacity duration-500" loading="lazy"></iframe>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 pointer-events-none"></div>
                            <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-white/15 p-4 rounded-xl max-w-xs pointer-events-none">
                                <div className="flex items-center gap-2 text-xs font-mono text-orange-400 mb-1"><span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>PRIMARY R&D HEADQUARTERS</div>
                                <div className="text-white text-sm font-bold">Union Bank Back Side, Kattupudi St</div>
                                <div className="text-[11px] text-slate-400 mt-1">Pallikonda 635809 • LAT: 12.9167° N, LNG: 78.9667° E</div>
                            </div>
                            <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full text-xs font-mono text-slate-300">
                                <span className="text-emerald-400">● LIVE</span><span>UTC+5:30 (IST)</span><span className="text-white/20">|</span><span>SPEED: 10Gbps METRO FIBER</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 bg-[#0d0d0d] divide-x divide-white/10">
                            {[
                                { city: "Pallikonda / BLR", role: "Engineering & R&D Hub", coord: "12.91° N, 78.96° E", ping: "8ms", lead: "Lead Architect Core" },
                                { city: "San Francisco", role: "Venture & AI Strategy", coord: "37.77° N, 122.41° W", ping: "64ms", lead: "VP Enterprise Delivery" },
                                { city: "London", role: "EMEA Enterprise Desk", coord: "51.50° N, 0.12° W", ping: "42ms", lead: "Cloud Security Officer" },
                                { city: "Singapore", role: "APAC Cloud Operations", coord: "1.35° N, 103.81° E", ping: "28ms", lead: "DevOps Escalation Team" }
                            ].map((node, i) => (
                                <div key={i} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                                        <span>{node.coord}</span><span className="text-emerald-400">{node.ping}</span>
                                    </div>
                                    <div className="text-white font-bold text-sm sm:text-base">{node.city}</div>
                                    <div className="text-[11px] text-orange-400/90 mt-0.5">{node.role}</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-1 pt-1 border-t border-white/5">{node.lead}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* 03 / DIRECT CHANNEL RADAR & RAPID ADVISORY HOTLINE (50 Lines)         */}
            {/* ===================================================================== */}
            <section id="priority-channels" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                            FAST-TRACK COMMS
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">Immediate Response <span className="text-orange-500 italic">Channels</span></h2>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">Skip the queue. Choose the communication protocol that fits your organization's urgency level.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: "Direct Architect Call", tag: "VOICE URGENT", desc: "Speak directly with lead infrastructure engineer for immediate critical consultation.", action: "Call +91 90000 00000", link: "tel:+919000000000", icon: "📞", active: true },
                            { title: "Encrypted WhatsApp", tag: "E2E CHAT", desc: "Fast asynchronous chat with technical leads for queries, media, or architecture snippets.", action: "Launch WhatsApp", link: "https://wa.me/", icon: "💬", active: false },
                            { title: "Corporate Dispatch", tag: "DOCUMENTED", desc: "Formal inquiries, vendor evaluation forms, RFPs, and master service agreements.", action: "contact@hakasolutions.com", link: "mailto:contact@hakasolutions.com", icon: "✉️", active: false },
                            { title: "Executive Calendar", tag: "VIDEO BRIEFING", desc: "Book an unmetered 30-minute system diagnostic session with our technical directors.", action: "Schedule Diagnostic", link: "#contact-form", icon: "📅", active: false }
                        ].map((ch, idx) => (
                            <div key={idx} className="group p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl p-2.5 rounded-xl bg-white/[0.04] border border-white/10">{ch.icon}</span>
                                        <span className={`text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border ${ch.active ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 'bg-white/5 text-slate-400 border-white/10'}`}>{ch.tag}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{ch.title}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">{ch.desc}</p>
                                </div>
                                <a href={ch.link} className="w-full py-3 px-4 rounded-lg bg-white/[0.03] hover:bg-orange-600 text-slate-200 hover:text-white border border-white/10 hover:border-orange-500 text-xs font-mono text-center font-bold transition-all flex items-center justify-center gap-2">
                                    <span>{ch.action}</span><span>→</span>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-600/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                            <span className="text-xs text-slate-300 font-mono">PRIORITY ESCALATION: Tier-1 Production incident triage active 24/7/365</span>
                        </div>
                        <a href="tel:+919000000000" className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4">Dispatch Emergency Triage →</a>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* 04 / ENTERPRISE SLA & GUARANTEED READINESS BENCHMARK (50 Lines)       */}
            {/* ===================================================================== */}
            <section id="sla-guarantee" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                                BINDING COMMITMENTS
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-6">Guaranteed <span className="text-orange-500 italic">Response Velocity</span></h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">We hold ourselves to transparent, mission-critical response metrics. When high-scale systems or strategic milestones are at stake, every minute counts.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10">
                                    <div className="text-3xl font-instrument text-orange-500 mb-1">99.8%</div>
                                    <div className="text-xs text-white font-bold mb-1">On-Time Sprint SLA</div>
                                    <div className="text-[11px] text-slate-400">Milestone commitments delivered on schedule.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-[#0f0f0f] border border-white/10">
                                    <div className="text-3xl font-instrument text-emerald-400 mb-1">&lt; 15m</div>
                                    <div className="text-xs text-white font-bold mb-1">Tier-1 Incident Response</div>
                                    <div className="text-[11px] text-slate-400">War-room mobilization for critical outages.</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex justify-between items-center">
                                <span>PHASE BENCHMARK</span><span>HAKA VELOCITY VS INDUSTRY</span>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { label: "Initial Technical Intake", haka: "15 Minutes", standard: "24–48 Hours", progress: "92%" },
                                    { label: "System Architecture Proposal", haka: "24 Hours", standard: "7–10 Days", progress: "88%" },
                                    { label: "Mutual NDA & Legal Clearance", haka: "Same Day", standard: "3–5 Days", progress: "95%" },
                                    { label: "Lead Engineer Allocation", haka: "48 Hours", standard: "2–3 Weeks", progress: "85%" }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-xs text-white">
                                            <span className="font-semibold">{item.label}</span>
                                            <span className="text-orange-400 font-mono font-bold">{item.haka} <span className="text-slate-500 font-normal">({item.standard})</span></span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" style={{ width: item.progress }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* 05 / PROTOCOL FAQ & ENGAGEMENT STANDARDS (50 Lines)                   */}
            {/* ===================================================================== */}
            <section id="contact-faq" className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                            CLARITY & PROTOCOLS
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">Pre-Engagement <span className="text-orange-500 italic">Clarifications</span></h2>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">Direct answers regarding how we onboard enterprise clients, manage intellectual property, and initiate sprint deliverables.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            { q: "How quickly can your engineering squad begin?", a: "Following preliminary architecture audit and alignment, dedicated sprint squads typically mobilize within 48 to 72 business hours.", badge: "ONBOARDING" },
                            { q: "Do you sign mutual NDAs before system discovery?", a: "Yes. All intellectual property, architectural specs, and database topologies are secured under binding mutual Non-Disclosure Agreements prior to intake.", badge: "CONFIDENTIALITY" },
                            { q: "What communication tools do you operate within?", a: "We embed directly into your corporate Slack, Microsoft Teams, Jira, or GitHub workflows, backed by asynchronous status dashboards.", badge: "INTEGRATION" },
                            { q: "Can we hire Haka for audits before full buildouts?", a: "Absolutely. Many enterprise partners start with our comprehensive 2-week architectural diagnostic before commissioning development.", badge: "FLEXIBILITY" },
                            { q: "Who owns the code, infrastructure & patents?", a: "100% of the intellectual property, code repositories, CI/CD pipelines, and cloud resources belong entirely to you with full documentation.", badge: "IP OWNERSHIP" },
                            { q: "What happens if our requirements evolve midway?", a: "We run Agile 2-week continuous delivery sprints, allowing backlog re-prioritization at each sprint planning cycle without penalty.", badge: "AGILITY" }
                        ].map((faq, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-orange-500/30 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">{faq.badge}</span>
                                        <span className="text-slate-500 text-xs font-mono">0{idx + 1}</span>
                                    </div>
                                    <h3 className="text-white text-base font-bold mb-2">{faq.q}</h3>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light mb-4">{faq.a}</p>
                                </div>
                                <div className="text-[11px] text-orange-400/80 font-mono">Verified Standard Protocol ✓</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DARK MODE FOOTER */}
            <Footer />

        </div>
    );
}

export default Contact;