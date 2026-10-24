import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// Curated rotating hero banner background images
const HERO_IMAGES = [
    { url: "/images/hakasolution (1).jpg", alt: "Architectural Monoliths" },
    { url: "/images/hakasolution (2).jpg", alt: "Futuristic Geometric Structures" },
    { url: "/images/hakasolution (3).jpg", alt: "Corporate Modern Architecture" },
    { url: "/images/hakasolution (4).jpg", alt: "Digital Infrastructure & Tech" },
    { url: "/images/hakasolution (5).jpg", alt: "Global Data Networks" }
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

function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Automatically transition hero background image every 4.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    // Detect scroll past hero banner for floating pill bar
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
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
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
                .delay-300 { transition-delay: 300ms; }

                .animate-dashboard-float { animation: floatSlow 6s ease-in-out infinite; }
                .animate-badge-float { animation: floatDelayed 5s ease-in-out 2s infinite; }
                .animate-network-line { stroke-dasharray: 8 8; animation: dashFlow 12s linear infinite; }
                .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
                .animate-blob { animation: blob 10s infinite alternate; }
                .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
                .text-outline:hover { -webkit-text-stroke: 1px #f97316; color: rgba(249,115,22,0.1); transition: all 0.5s ease; }
            `}</style>

            <Navbar isScrolled={isScrolled} activePage="home" />

            {/* ===================================================================== */}
            {/* HERO SECTION - REFINED PREMIUM LOOK                                   */}
            {/* ===================================================================== */}
            <section id="home" className="relative min-h-[100svh] w-full flex flex-col justify-center pt-28 pb-20 md:pb-28 overflow-hidden bg-[#0a0a0a]">

                {/* Rotating Background Images + Noise/Grain Texture */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {HERO_IMAGES.map((img, idx) => (
                        <img
                            key={idx}
                            src={img.url}
                            alt={img.alt}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${idx === currentImageIndex ? 'opacity-65 scale-105' : 'opacity-0 scale-100'
                                }`}
                        />
                    ))}
                    {/* Dark gradient overlay - lightened for clear image visibility with text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/35 to-[#0a0a0a]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-[#0a0a0a]/20 to-transparent"></div>
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
                                HAKA DIGITAL OPERATIONS
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-[80px] xl:text-[96px] font-instrument tracking-normal leading-[1.05] sm:leading-[1] mb-6">
                            Architecting <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600 italic pr-4">
                                Smarter Realities.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
                            We deliver enterprise-grade digital infrastructure, process automation, and intelligent operational frameworks to scale your vision.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
                            <a href="#solutions" className="group relative w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-orange-600 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase rounded-sm overflow-hidden flex items-center gap-3">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="relative z-10 w-full text-center">Discover Capabilities</span>
                                <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform shrink-0">→</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={() => {
                                    if (window.location.hash === '#contact') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else {
                                        window.location.hash = '#contact';
                                        window.dispatchEvent(new Event('hashchange'));
                                    }
                                }}
                                className="group w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-transparent border border-white/20 hover:border-orange-500 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-3"
                            >
                                <span className="w-full text-center">Initiate Contact</span>
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
                                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400">Node Status</span>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-white tracking-wide">Optimized</div>
                        </div>

                        <div className="absolute bottom-[5%] sm:bottom-[15%] right-0 sm:-right-4 lg:right-0 z-20 p-4 sm:p-5 w-44 sm:w-52 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl animate-badge-float scale-90 sm:scale-100 origin-right">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-orange-400 mb-2 sm:mb-3">Throughput</p>
                            <div className="flex items-end gap-1 sm:gap-1.5 h-8 sm:h-10 mb-2">
                                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-600/50 to-orange-400 rounded-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="text-right text-[10px] sm:text-xs text-white font-mono">98.4 TB/s</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 1: UNIQUE BENTO BOX GRID (Solutions)                          */}
            {/* ===================================================================== */}
            <section id="solutions" className="py-20 sm:py-24 lg:py-32 bg-[#080808] border-t border-white/10 px-4 sm:px-6 overflow-hidden">
                <div className="max-w-[1380px] mx-auto mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 reveal-element">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 sm:w-12 bg-orange-500"></div>
                            <p className="text-orange-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">Architecture</p>
                        </div>
                        <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-instrument text-white leading-[0.9]">
                            Next-Gen <br className="hidden sm:block" />
                            <span className="text-neutral-400 italic">Capabilities.</span>
                        </h2>
                    </div>
                    <p className="text-neutral-400 max-w-md text-base sm:text-lg">
                        We deploy modular, hyper-scalable solutions tailored for complex enterprise ecosystems.
                    </p>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">

                    {/* Large Featured Box */}
                    <div className="md:col-span-2 md:row-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden group min-h-[350px] md:min-h-0 border border-white/10 reveal-element">
                        <img src="/images/about3.jpg" alt="Digital Workforce" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-600 flex items-center justify-center mb-4 sm:mb-6 transform group-hover:-translate-y-2 transition-transform shadow-lg shadow-orange-600/30">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-2 sm:mb-3">Intelligent Automation</h3>
                            <p className="text-neutral-300 max-w-md text-sm sm:text-lg">End-to-end operational robotics and digital workforce deployment to eliminate workflow bottlenecks.</p>
                        </div>
                    </div>

                    {/* Small Box 1 */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group bg-[#111111] border border-white/10 min-h-[250px] md:min-h-0 reveal-element delay-100">
                        <img src="/images/hakasolution (7).jpg" alt="Cloud" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                            <h3 className="text-3xl sm:text-4xl font-instrument text-white mb-2">Cloud Native</h3>
                            <p className="text-neutral-400 text-xs sm:text-sm">Serverless architectures built for infinite horizontal scale.</p>
                        </div>
                    </div>

                    {/* Small Box 2 */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group bg-gradient-to-br from-[#140e0a] to-[#0d0907] flex flex-col justify-end p-6 sm:p-8 border border-orange-500/20 min-h-[250px] md:min-h-0 reveal-element delay-200">
                        <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-orange-500/20">
                            <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-instrument text-white mb-2 relative z-10">Data Pipelines</h3>
                        <p className="text-neutral-400 text-xs sm:text-sm relative z-10">Real-time telemetry and massive-scale data orchestration.</p>
                    </div>

                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 2: ABSTRACT GEOMETRIC SPLIT SCREEN (Technology)               */}
            {/* ===================================================================== */}
            <section id="technology" className="bg-[#050505] border-t border-white/10 py-20 sm:py-24 lg:py-0 lg:min-h-[80vh] flex flex-col lg:flex-row items-center relative overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-orange-600/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:pl-[10%] lg:pr-16 relative z-10 reveal-element">
                    <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-instrument text-white leading-tight mb-6 sm:mb-8">
                        Precision Engineering <br />
                        <span className="text-orange-500 italic">meets raw performance.</span>
                    </h2>

                    <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-12">
                        {[
                            { title: 'Zero-Trust Security', desc: 'Military-grade encryption for data at rest and in transit.' },
                            { title: 'Sub-Millisecond Latency', desc: 'Edge-computed logic networks for real-time applications.' },
                            { title: 'Adaptive Scaling', desc: 'AI-driven infrastructure elasticity based on live load.' }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 sm:gap-6 group">
                                <div className="mt-1 font-mono text-orange-400 font-bold text-xs sm:text-sm">0{i + 1}</div>
                                <div>
                                    <h4 className="text-xl sm:text-2xl font-instrument text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors">{feature.title}</h4>
                                    <p className="text-sm sm:text-base text-neutral-400">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[80vh] relative p-4 sm:p-6 lg:p-0 mt-8 lg:mt-0 flex items-center justify-center reveal-element delay-200">
                    {/* Layered Image + Overlay Card Container */}
                    <div className="relative w-[90%] sm:w-[85%] h-[90%] sm:h-[85%]">
                        {/* Layered Image Effect */}
                        <div className="w-full h-full bg-[#111111] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative">
                            <img src="/images/hakasolution (8).jpg" alt="Workspace" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-orange-600/10 mix-blend-color"></div>
                        </div>

                        {/* Floating Tech Card - Centered horizontally at the bottom */}
                        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 bg-black/80 backdrop-blur-xl p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-white/10 w-64 sm:w-72 max-w-[90%]">
                            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mb-1 sm:mb-2">System Load</div>
                            <div className="text-2xl sm:text-3xl font-instrument text-white mb-1">12.4ms</div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 sm:mt-4 overflow-hidden">
                                <div className="bg-orange-500 w-1/3 h-full rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 3: DARK CONTRAST METRICS & TECH (Industries)                  */}
            {/* ===================================================================== */}
            <section id="industries" className="py-20 sm:py-24 lg:py-32 bg-[#080808] border-t border-white/10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(234,88,12,0.1),transparent_50%)]"></div>

                <div className="max-w-[1380px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

                    {/* Massive Outline Metrics - Responsive Grid & Text */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 sm:gap-y-16 gap-x-8 reveal-element">
                        {[['99.99%', 'Uptime SLA'], ['250+', 'Global Nodes'], ['10M+', 'API Requests/sec'], ['<5ms', 'Edge Latency']].map(([val, label], i) => (
                            <div key={i} className="flex flex-col">
                                <div className="text-6xl sm:text-6xl md:text-7xl lg:text-[80px] font-instrument mb-2 text-outline whitespace-nowrap">{val}</div>
                                <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-orange-500">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Floating Tech Stack Tags */}
                    <div className="flex flex-col justify-center reveal-element delay-200">
                        <h3 className="text-3xl sm:text-4xl font-instrument italic text-slate-300 mb-6 sm:mb-8">Powered by modern primitives.</h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Kubernetes', 'Docker', 'GraphQL', 'Kafka', 'Terraform'].map((tech, i) => (
                                <span key={i} className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-slate-300 text-xs sm:text-sm hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all cursor-crosshair">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 4: INFINITE SCROLLING MARQUEE (Clients)                       */}
            {/* ===================================================================== */}
            <section className="py-16 sm:py-24 bg-[#0a0a0a] border-t border-b border-white/10 overflow-hidden reveal-element">
                <div className="text-center mb-8 sm:mb-12 px-4">
                    <p className="text-neutral-400 font-bold tracking-[0.15em] sm:tracking-widest text-[10px] sm:text-xs uppercase">Trusted by industry leaders globally</p>
                </div>

                {/* CSS Infinite Marquee */}
                <div className="relative w-full flex overflow-x-hidden">
                    {/* Fading Edges */}
                    <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

                    <div className="animate-marquee gap-16 sm:gap-24 items-center">
                        {/* Render twice for seamless looping */}
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="flex gap-16 sm:gap-24 items-center pl-16 sm:pl-24">
                                <span className="text-3xl sm:text-4xl font-black text-neutral-500 hover:text-white transition-colors cursor-default">ACME<span className="text-orange-500">.</span></span>
                                <span className="text-2xl sm:text-3xl font-black tracking-[0.2em] sm:tracking-[0.3em] text-neutral-500 hover:text-white transition-colors cursor-default">NEXUS</span>
                                <span className="text-4xl sm:text-5xl font-instrument italic text-neutral-500 hover:text-white transition-colors cursor-default">Globex</span>
                                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-neutral-500 hover:text-white transition-colors cursor-default">STARK</span>
                                <span className="text-3xl sm:text-4xl font-light text-neutral-500 hover:text-white transition-colors cursor-default">VANGUARD</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 5: IMMERSIVE DARK CTA (Careers / Contact)                     */}
            {/* ===================================================================== */}
            <section id="careers" className="relative h-[60vh] sm:h-[80vh] min-h-[500px] sm:min-h-[600px] flex items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-[#0a0a0a]">
                {/* Animated Glowing Orbs Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-[80vw] sm:w-[50vw] h-[80vw] sm:h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-r from-orange-600 to-amber-500 rounded-full blur-[80px] sm:blur-[100px] animate-blob"></div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] sm:bg-[size:64px_64px]"></div>

                <div className="relative z-10 max-w-4xl w-full bg-black/20 backdrop-blur-md border border-white/10 p-8 sm:p-12 md:p-24 rounded-[2rem] md:rounded-[3rem] reveal-element">
                    <h2 className="text-5xl sm:text-6xl md:text-[80px] font-instrument mb-4 sm:mb-6 text-white leading-tight">
                        Ready to <span className="italic text-orange-400">Scale?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 mb-8 sm:mb-12 max-w-xl mx-auto font-light">
                        Join the next generation of digital infrastructure. Let's architect a solution that propels your operations forward.
                    </p>
                    <a href="#contact" className="inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-bold tracking-widest text-xs sm:text-sm hover:bg-orange-500 hover:text-white transition-colors duration-300 gap-3">
                        <span>INITIATE DEPLOYMENT</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </section>

            {/* DARK MODE FOOTER */}
            <Footer />

        </div>
    );
}

export default Home;