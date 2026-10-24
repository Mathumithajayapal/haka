import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// Curated rotating hero banner background images tailored for a "Portfolio" page
const PORTFOLIO_HERO_IMAGES = [
    { url: "/images/hakasolution (13).jpg", alt: "Digital Interface & Design" },
    { url: "/images/hakasolution (14).jpg", alt: "Creative Workspace" },
    { url: "/images/hakasolution (15).jpg", alt: "Data Dashboard" },
    { url: "/images/hakasolution (1).jpg", alt: "Analytics & Growth" }
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

function Portfolio() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Section 1: Project Matrix & Device Viewport State
    const [activeProject, setActiveProject] = useState('fashion');
    const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

    // Section 2: Before vs After Transformation State
    const [viewMode, setViewMode] = useState('after'); // 'before' | 'after'

    // Section 3: Impact Stories State
    const [activeStory, setActiveStory] = useState(0);

    // Section 4: Project Scope & Velocity Estimator State
    const [projectType, setProjectType] = useState('enterprise');
    const [projectScale, setProjectScale] = useState('enterprise');
    const [selectedAddons, setSelectedAddons] = useState({ aiAgents: true, multiRegion: true, soc2: false });

    // Section 5: Global Edge Region Filter State
    const [selectedRegion, setSelectedRegion] = useState('all');

    // Automatically transition hero background image every 4.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % PORTFOLIO_HERO_IMAGES.length);
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

            <Navbar isScrolled={isScrolled} activePage="portfolio" />

            {/* ===================================================================== */}
            {/* PORTFOLIO HERO SECTION                                                */}
            {/* ===================================================================== */}
            <section id="hero" className="relative min-h-[100svh] w-full flex flex-col justify-center pt-28 pb-20 md:pb-28 overflow-hidden bg-[#0a0a0a] reveal-element">

                {/* Rotating Background Images + Noise/Grain Texture */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {PORTFOLIO_HERO_IMAGES.map((img, idx) => (
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
                                FEATURED WORK
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-[80px] xl:text-[96px] font-instrument tracking-normal leading-[1.05] sm:leading-[1] mb-6">
                            Showcasing <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600 italic pr-4">
                                Digital Brilliance.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
                            Explore our curated collection of enterprise solutions, seamless digital transformations, and hyper-scalable platforms engineered for global industry leaders.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
                            <a href="#case-studies" className="group relative w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-orange-600 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase rounded-sm overflow-hidden flex items-center gap-3">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="relative z-10 w-full text-center">View Case Studies</span>
                                <span className="relative z-10 text-lg group-hover:translate-y-1 transition-transform shrink-0">↓</span>
                            </a>
                            <a href="#contact" className="group w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-transparent border border-white/20 hover:border-orange-500 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-3">
                                <span className="w-full text-center">Start a Project</span>
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
                                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400">Client Success</span>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-white tracking-wide">100% Delivered</div>
                        </div>

                        <div className="absolute bottom-[5%] sm:bottom-[15%] right-0 sm:-right-4 lg:right-0 z-20 p-4 sm:p-5 w-44 sm:w-52 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl animate-badge-float scale-90 sm:scale-100 origin-right">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-orange-400 mb-2 sm:mb-3">Projects Shipped</p>
                            <div className="flex items-end gap-1 sm:gap-1.5 h-8 sm:h-10 mb-2">
                                {[40, 70, 55, 90, 65, 100, 85].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-600/50 to-orange-400 rounded-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="text-right text-[10px] sm:text-xs text-white font-mono">200+ Deployments</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 1: PROJECT MATRIX & INTERACTIVE DEVICE SANDBOX                */}
            {/* ===================================================================== */}
            <section id="case-studies" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase">01 / FEATURED SHOWCASE</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white leading-tight">
                                Live Systems & <span className="italic text-orange-500">Interactive Device Inspector</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 self-start lg:self-end">
                            <span className="text-[11px] text-slate-400 font-mono px-2 uppercase">Viewport:</span>
                            {['desktop', 'tablet', 'mobile'].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setDeviceMode(m)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${deviceMode === m ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Project Switcher Bar */}
                    <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/10 mb-10">
                        {[
                            { id: 'fashion', label: 'Luxury E-Commerce', metric: '+340% Conversions' },
                            { id: 'construction', label: 'Civil Earthworks & Field Ops', metric: '40+ Field Sites' },
                            { id: 'healthcare', label: 'PulseCore Health Network', metric: '65 Clinics Synced' },
                            { id: 'fintech', label: 'Apex Global Trading Fabric', metric: '18ms Tx Latency' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveProject(item.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 border ${activeProject === item.id ? 'bg-orange-600/15 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                            >
                                <span className={`w-2 h-2 rounded-full ${activeProject === item.id ? 'bg-orange-500 animate-ping' : 'bg-slate-600'}`} />
                                <span>{item.label}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-orange-400 border border-orange-500/20">{item.metric}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Project Sandbox Frame */}
                    {(() => {
                        const projectData = {
                            fashion: {
                                title: 'AURA Haute Couture & European Runway Showcase',
                                client: 'Maison de Luxe Paris',
                                desc: 'Interactive 3D runway previews, headless multi-currency checkout, and real-time European boutique synchronization with sub-second page transitions.',
                                image: '/images/hakasolution (2).jpg',
                                stack: ['Next.js 15', 'Three.js / WebGL', 'Shopify Plus', 'Stripe Global', 'Cloudflare Workers'],
                                stats: [{ l: 'Conversion Rate', v: '+340%' }, { l: 'Page Load', v: '0.4s' }, { l: 'Boutique Sync', v: 'Instant' }]
                            },
                            construction: {
                                title: 'TS Heavy Earthworks & Drone Topographic Portal',
                                client: 'TS Infrastructure Group',
                                desc: 'Autonomous civil construction operations portal with automated drone contour mapping, crew GPS dispatch, and live equipment telemetry.',
                                image: '/images/hakasolution (3).jpg',
                                stack: ['React 19', 'Mapbox GL 3D', 'Node.js', 'PostgreSQL PostGIS', 'IoT WebSockets'],
                                stats: [{ l: 'Active Sites', v: '40+' }, { l: 'GPS Tracking', v: '100Hz' }, { l: 'Cost Savings', v: '-28%' }]
                            },
                            healthcare: {
                                title: 'PulseCore Clinic Network & Telehealth Telemetry',
                                client: 'PulseCore Health Systems',
                                desc: 'HIPAA & SOC2 certified unified electronic health record exchange connecting 65 diagnostic centers with encrypted video consultation corridors.',
                                image: '/images/hakasolution (4).jpg',
                                stack: ['Next.js App Router', 'FHIR API', 'WebRTC Mesh', 'HashiCorp Vault', 'AWS HealthLake'],
                                stats: [{ l: 'Clinics Connected', v: '65' }, { l: 'Compliance', v: '100% HIPAA' }, { l: 'Uptime SLA', v: '99.999%' }]
                            },
                            fintech: {
                                title: 'Apex Trading Engine & Distributed Settlement Core',
                                client: 'Apex Capital London',
                                desc: 'Sub-millisecond foreign exchange algorithmic matching engine with fault-tolerant Raft consensus and automated risk surveillance.',
                                image: '/images/hakasolution (5).jpg',
                                stack: ['Go Fiber', 'Apache Kafka', 'Redis Cluster', 'Kubernetes HA', 'gRPC Microservices'],
                                stats: [{ l: 'Tx Validation', v: '18ms' }, { l: 'Throughput', v: '500k ops/sec' }, { l: 'Packet Loss', v: '0%' }]
                            }
                        };
                        const p = projectData[activeProject] || projectData.fashion;

                        return (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                                {/* Left: Device Mockup (7 Cols) */}
                                <div className="lg:col-span-7 flex justify-center">
                                    <div
                                        className={`transition-all duration-500 rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 shadow-2xl relative overflow-hidden ${deviceMode === 'mobile' ? 'w-[320px] sm:w-[360px] h-[520px]' : deviceMode === 'tablet' ? 'w-[520px] sm:w-[600px] h-[480px]' : 'w-full h-[380px] sm:h-[460px]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-3 px-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                                            <div className="ml-3 px-3 py-0.5 rounded-full bg-black/40 text-[10px] font-mono text-slate-400 flex-1 truncate text-center">
                                                https://live.hakasolutions.com/{activeProject}
                                            </div>
                                        </div>
                                        <div className="relative rounded-2xl overflow-hidden h-[calc(100%-36px)] group">
                                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-orange-400 border border-orange-500/30">
                                                    Interactive Live Production
                                                </span>
                                                <span className="text-[11px] font-mono text-emerald-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30">
                                                    Status: 100% Online
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Project Telemetry & Specs (5 Cols) */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div>
                                        <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block mb-2">{p.client}</span>
                                        <h3 className="text-2xl sm:text-3xl font-instrument text-white mb-3">{p.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
                                        {p.stats.map((s, idx) => (
                                            <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                <div className="text-xl font-instrument text-orange-500 mb-0.5">{s.v}</div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{s.l}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-mono">Engineered With</div>
                                        <div className="flex flex-wrap gap-2">
                                            {p.stack.map((t, idx) => (
                                                <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-2 flex items-center gap-4">
                                        <a href="#transformation" className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider">
                                            <span>Inspect Architecture Transformation</span>
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 2: ARCHITECTURE MODERNIZATION BENCHMARK (BEFORE VS AFTER)      */}
            {/* ===================================================================== */}
            <section id="transformation" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400">02 / BENCHMARK LAB</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">
                            Architecture Transformation: <span className="italic text-orange-500">Legacy vs Modernized</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-normal">
                            Toggle between the inherited legacy stack and the HAKA re-architected cloud topology to see hard benchmark gains.
                        </p>

                        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#121212] border border-white/10">
                            <button
                                type="button"
                                onClick={() => setViewMode('before')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'before' ? 'bg-rose-600/80 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                            >
                                Legacy Monolith (Before)
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('after')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === 'after' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                            >
                                HAKA Cloud-Native (After)
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">+480% FASTER</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Comparison Diagnostic Specs (7 Cols) */}
                        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0d0d0d] border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                                    <div>
                                        <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block mb-1">Active Topology Profile</span>
                                        <h3 className="text-xl font-bold text-white">
                                            {viewMode === 'before' ? 'Monolithic Single-Server PHP/MySQL' : 'Distributed Multi-Region Edge Mesh (HAKA)'}
                                        </h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${viewMode === 'before' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                        {viewMode === 'before' ? 'High Technical Debt' : 'Verified Production'}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { metric: 'Page Load Speed (LCP)', before: '4.8s (Failing Google CWV)', after: '0.35s (Top 1% Global Tier)', desc: 'Sub-second edge caching rendered directly from nearest Cloudflare POP.' },
                                        { metric: 'Monthly Cloud Infrastructure Bill', before: '$18,400 / month', after: '$5,900 / month (-68% savings)', desc: 'Consolidated oversized idle EC2 instances into auto-scaling micro-containers.' },
                                        { metric: 'Deployment Incident Rate', before: '42 Outages / Year', after: '0 Downtime Outages (99.999%)', desc: 'Canary Blue/Green deployments with automated synthetic rollback gates.' },
                                        { metric: 'Database Concurrency Ceiling', before: '1,200 concurrent users (Crashes)', after: '100,000+ concurrent users', desc: 'Raft distributed read replicas and Redis in-memory pub-sub cache.' }
                                    ].map((row, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                                                <span className="text-xs font-bold text-slate-300">{row.metric}</span>
                                                <span className={`text-xs font-mono font-bold ${viewMode === 'before' ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                    {viewMode === 'before' ? row.before : row.after}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-400">{row.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                                <span>Audited by Independent SRE Benchmarks</span>
                                <span className="font-mono text-orange-400">Verified Lighthouse 99/100</span>
                            </div>
                        </div>

                        {/* Interactive SRE Telemetry Log Terminal (5 Cols) */}
                        <div className="lg:col-span-5 p-6 rounded-3xl bg-black border border-white/10 font-mono text-xs flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-slate-400 text-[11px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span>sre-telemetry-agent v2.4</span>
                                    </div>
                                    <span>REGION: GLOBAL-ALL</span>
                                </div>

                                <div className="space-y-2 text-slate-300 leading-relaxed font-mono text-[11px]">
                                    <div className="text-slate-500">// Simulating live packet routing trace...</div>
                                    <div>[00:00.012] GET /api/v2/checkout/init ... 200 OK (18ms)</div>
                                    <div className="text-emerald-400">[00:00.045] Cache-Control: s-maxage=31536000 (HIT: Edge-Frankfurt)</div>
                                    <div>[00:00.078] Database Connection Pool: 24/500 allocated (Healthy)</div>
                                    <div>[00:00.110] Memory Consumption: 14% of 64GB cluster pool</div>
                                    <div className="text-orange-400">[00:00.150] Health check synthetic probe: 28/28 POPs responding</div>
                                    <div className="text-slate-500 pt-2">// Zero unhandled exceptions in past 4,800,000 cycles</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[11px] text-slate-400">Want this performance?</span>
                                <a href="#calculator" className="text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider">
                                    Calculate ROI →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 3: CLIENT IMPACT STORIES & VERIFIED OUTCOMES                  */}
            {/* ===================================================================== */}
            <section id="impact" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase">03 / VERIFIED IMPACT</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white leading-tight">
                                Voices of Scale: <span className="italic text-orange-500">Executive Testimonials</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm max-w-md font-normal leading-relaxed">
                            Measurable outcomes from engineering leaders who entrusted HAKA with mission-critical digital operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Story Navigation Tabs (4 Cols) */}
                        <div className="lg:col-span-4 space-y-3">
                            {[
                                { name: 'Elena Rostova', role: 'VP of Digital, AURA Luxury Group', tag: 'Luxury E-Commerce' },
                                { name: 'Marcus Vance', role: 'Managing Director, TS Heavy Earthworks', tag: 'Civil Engineering' },
                                { name: 'Dr. Julian Morales', role: 'Chief Information Officer, PulseCore', tag: 'HealthTech Network' }
                            ].map((story, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveStory(idx)}
                                    className={`cursor-pointer p-5 rounded-2xl border transition-all text-left ${activeStory === idx ? 'bg-orange-950/20 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.15)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-white">{story.name}</span>
                                        <span className="text-[10px] font-mono text-orange-400 uppercase">{story.tag}</span>
                                    </div>
                                    <div className="text-xs text-slate-400">{story.role}</div>
                                </div>
                            ))}
                        </div>

                        {/* Story Spotlight Showcase (8 Cols) */}
                        {(() => {
                            const stories = [
                                {
                                    quote: "HAKA rebuilt our international shopping architecture in 6 weeks ahead of Black Friday. We sustained 10M concurrent visitors with zero downtime, and our mobile checkout velocity quadrupled.",
                                    author: "Elena Rostova",
                                    role: "VP of Digital • Maison AURA Paris",
                                    photo: "/images/author (1).jpg",
                                    kpis: [{ v: "10M+", l: "Black Friday Visits" }, { v: "0 ms", l: "Downtime" }, { v: "+340%", l: "Mobile Checkout" }]
                                },
                                {
                                    quote: "The drone topography and equipment dispatch portal engineered by HAKA eliminated over 1,400 hours of manual surveyor backlog across our civil sites in Ontario and Alberta.",
                                    author: "Marcus Vance",
                                    role: "Managing Director • TS Heavy Earthworks",
                                    photo: "/images/author (2).jpg",
                                    kpis: [{ v: "1,400h", l: "Field Hours Saved" }, { v: "40+", l: "Sites Telemetry" }, { v: "-28%", l: "Fuel Burn Rate" }]
                                },
                                {
                                    quote: "Deploying a unified telemedicine and electronic record exchange across 65 clinics while maintaining strict HIPAA compliance seemed impossible until HAKA deployed their zero-trust vault.",
                                    author: "Dr. Julian Morales",
                                    role: "CIO • PulseCore Health Systems",
                                    photo: "/images/author (3).jpg",
                                    kpis: [{ v: "65", l: "Clinics Synced" }, { v: "100%", l: "HIPAA Compliant" }, { v: "18ms", l: "Record Exchange" }]
                                }
                            ];
                            const s = stories[activeStory];

                            return (
                                <div className="lg:col-span-8 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#121212] to-[#0c0c0c] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[90px] pointer-events-none" />
                                    <div>
                                        <div className="text-4xl font-instrument text-orange-500 mb-4">“</div>
                                        <p className="text-white text-base sm:text-xl font-instrument italic leading-relaxed mb-8">
                                            {s.quote}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-4">
                                            <img src={s.photo} alt={s.author} className="w-14 h-14 rounded-full object-cover border-2 border-orange-500/50" />
                                            <div>
                                                <div className="text-sm font-bold text-white">{s.author}</div>
                                                <div className="text-xs text-slate-400">{s.role}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-around text-center">
                                            {s.kpis.map((k, idx) => (
                                                <div key={idx}>
                                                    <div className="text-lg font-instrument text-orange-400">{k.v}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{k.l}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 4: INTERACTIVE PROJECT SCOPE CONFIGURATOR & ESTIMATOR         */}
            {/* ===================================================================== */}
            <section id="calculator" className="py-24 bg-[#070707] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400">04 / ARCHITECTURE BUILDER</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">
                            Configure Your <span className="italic text-orange-500">Project Scope</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-normal">
                            Customize your intended system archetype, sprint velocity, and security requirements for an instant scope blueprint.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left: Customizer Controls (7 Cols) */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Step 1: Archetype */}
                            <div>
                                <label className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block mb-3">1. Select Digital Archetype</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { id: 'ecommerce', label: 'Luxury E-Com', time: '3-4 Sprints' },
                                        { id: 'ai', label: 'AI Agent Workflows', time: '2-3 Sprints' },
                                        { id: 'enterprise', label: 'Enterprise Core', time: '4-6 Sprints' },
                                        { id: 'mobile', label: 'Mobile Mesh App', time: '3-5 Sprints' }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setProjectType(t.id)}
                                            className={`p-3.5 rounded-xl border text-left transition-all ${projectType === t.id ? 'bg-orange-950/30 border-orange-500 text-white shadow' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                                        >
                                            <div className="text-xs font-bold mb-1">{t.label}</div>
                                            <div className="text-[10px] font-mono text-slate-400">{t.time}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Deployment Velocity */}
                            <div>
                                <label className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block mb-3">2. Target Delivery Velocity</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { id: 'mvp', label: 'Rapid Prototype POC', eta: '4 Weeks', squad: '2-3 Principal Engineers' },
                                        { id: 'enterprise', label: 'Enterprise Rollout', eta: '8 Weeks', squad: '4-5 Full-Stack Engineers' },
                                        { id: 'global', label: 'Hyper-Scale Tier', eta: '12+ Weeks', squad: 'Dedicated Cross-Functional Squad' }
                                    ].map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setProjectScale(s.id)}
                                            className={`p-4 rounded-xl border text-left transition-all ${projectScale === s.id ? 'bg-orange-950/30 border-orange-500 text-white shadow' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold">{s.label}</span>
                                                <span className="text-[10px] font-mono text-orange-400">{s.eta}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-400">{s.squad}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Add-on Capabilities */}
                            <div>
                                <label className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block mb-3">3. Specialized Architecture Add-Ons</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { key: 'aiAgents', label: 'Autonomous LLM Agent Bot', desc: 'Custom domain assistant' },
                                        { key: 'multiRegion', label: 'Active-Active Multi-Cloud', desc: 'AWS + Azure zero lock-in' },
                                        { key: 'soc2', label: 'SOC2 / HIPAA Compliance', desc: 'Continuous automated audit' }
                                    ].map((add) => {
                                        const checked = !!selectedAddons[add.key];
                                        return (
                                            <div
                                                key={add.key}
                                                onClick={() => setSelectedAddons(prev => ({ ...prev, [add.key]: !prev[add.key] }))}
                                                className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left ${checked ? 'bg-orange-950/20 border-orange-500/60' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-bold text-white">{add.label}</span>
                                                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${checked ? 'bg-orange-500 text-black font-bold' : 'border border-slate-600'}`}>{checked ? '✓' : ''}</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400">{add.desc}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right: Dynamic Summary Card (5 Cols) */}
                        <div className="lg:col-span-5 sticky top-28">
                            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-orange-500/30 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />
                                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                                    <div>
                                        <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block mb-1">Architecture Summary</span>
                                        <h4 className="text-xl font-bold text-white">Custom Engineering Blueprint</h4>
                                    </div>
                                    <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 text-xs font-mono">Ready to Ship</span>
                                </div>

                                <div className="space-y-3 mb-6 text-xs text-slate-300">
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Chosen Archetype:</span>
                                        <span className="font-bold text-white uppercase">{projectType}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Sprint Cadence:</span>
                                        <span className="font-mono text-emerald-400 font-bold">{projectScale === 'mvp' ? '4 Weeks Sprint' : projectScale === 'enterprise' ? '8 Weeks Production' : '12+ Weeks Scale'}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Selected Add-Ons:</span>
                                        <span className="font-mono text-orange-400">{Object.values(selectedAddons).filter(Boolean).length} Modules Active</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Code Ownership:</span>
                                        <span className="text-white font-medium">100% Client IP Owned</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-black/60 border border-white/10 mb-6 text-center">
                                    <div className="text-[10px] uppercase font-mono text-slate-400 mb-1">Guaranteed Delivery SLA</div>
                                    <div className="text-2xl font-instrument text-white">Zero-Downtime Deployment</div>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href="#contact"
                                        className="group relative w-full text-center py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-xl overflow-hidden transition-all shadow-[0_0_25px_rgba(249,115,22,0.3)] block"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Lock In This Project Scope
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 5: GLOBAL DEPLOYMENT MESH & ACTIVE EDGE STATUS                */}
            {/* ===================================================================== */}
            <section id="deployments-globe" className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase">05 / WORLDWIDE FABRIC</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white leading-tight">
                                Global Edge Presence & <span className="italic text-orange-500">Active Node Status</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 self-start lg:self-end">
                            <span className="text-[11px] text-slate-400 font-mono px-2 uppercase">Region Filter:</span>
                            {[
                                { id: 'all', label: 'All Regions' },
                                { id: 'na', label: 'Americas' },
                                { id: 'eu', label: 'Europe' },
                                { id: 'apac', label: 'Asia-Pacific' }
                            ].map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setSelectedRegion(r.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedRegion === r.id ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Edge Nodes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {[
                            { name: 'Frankfurt Central (fra1)', region: 'eu', ping: '11ms', load: '14%', status: 'Operational' },
                            { name: 'London Docklands (lon2)', region: 'eu', ping: '13ms', load: '19%', status: 'Operational' },
                            { name: 'US-East Virginia (iad1)', region: 'na', ping: '8ms', load: '28%', status: 'Operational' },
                            { name: 'US-West Silicon Valley (sjc1)', region: 'na', ping: '15ms', load: '22%', status: 'Operational' },
                            { name: 'Tokyo Equinix (tyo1)', region: 'apac', ping: '18ms', load: '16%', status: 'Operational' },
                            { name: 'Singapore Marina (sin1)', region: 'apac', ping: '14ms', load: '25%', status: 'Operational' }
                        ].filter(node => selectedRegion === 'all' || node.region === selectedRegion).map((node, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-[#0b0b0b] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span className="text-xs font-bold text-white">{node.name}</span>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{node.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 font-mono text-xs">
                                    <div>
                                        <span className="text-slate-500 text-[10px] uppercase block">Latency</span>
                                        <span className="text-orange-400 font-bold">{node.ping}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 text-[10px] uppercase block">Cluster Load</span>
                                        <span className="text-white">{node.load}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Flagship Launchpad CTA */}
                    <div className="relative rounded-3xl bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#141414] border border-orange-500/30 p-8 sm:p-14 text-center overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
                        <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.25em] block mb-3">HAKA ENGINEERING PARTNERSHIPS</span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-6 max-w-2xl mx-auto leading-tight">
                            Ready to Ship Your Next <br /><span className="text-orange-500 italic">Breakthrough Platform?</span>
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                            Partner with our distributed systems team to architect, stage, and deploy resilient digital infrastructure tailored to your industry.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#contact" className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-[0.15em] uppercase rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                                Initiate Project Consultation →
                            </a>
                            <a href="#case-studies" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs tracking-[0.15em] uppercase rounded-xl transition-all">
                                Explore Live Case Studies
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* DARK MODE FOOTER */}
            <Footer />

        </div>
    );
}

export default Portfolio