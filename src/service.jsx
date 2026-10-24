import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

// Curated rotating hero banner background images tailored for a "Services" page
const SERVICE_HERO_IMAGES = [
    { url: "/images/hakasolution (9).jpg", alt: "Data Analytics & Processing" },
    { url: "/images/hakasolution (10).jpg", alt: "Cloud Infrastructure" },
    { url: "/images/hakasolution (11).jpg", alt: "Automated Systems" },
    { url: "/images/hakasolution (12).jpg", alt: "Server & Hardware Maintenance" }
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

function Services() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Customizable SLA Sales Calculator State
    const [slaPlan, setSlaPlan] = useState('enterprise'); // 'scale' | 'enterprise' | 'mission'
    const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
    const [addons, setAddons] = useState({ sreBridge: true, multiCloud: true, complianceShield: false });

    // Customizable Capabilities State (Box-Free)
    const [selectedCapability, setSelectedCapability] = useState('cloud');
    const [serviceScale, setServiceScale] = useState('10M-100M req/day');

    // Automatically transition hero background image every 4.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % SERVICE_HERO_IMAGES.length);
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

            <Navbar isScrolled={isScrolled} activePage="services" />

            {/* ===================================================================== */}
            {/* SERVICES HERO SECTION                                                 */}
            {/* ===================================================================== */}
            <section id="hero" className="relative min-h-[100svh] w-full flex flex-col justify-center pt-28 pb-20 md:pb-28 overflow-hidden bg-[#0a0a0a] reveal-element">

                {/* Rotating Background Images + Noise/Grain Texture */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {SERVICE_HERO_IMAGES.map((img, idx) => (
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
                                ENTERPRISE SOLUTIONS
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-[80px] xl:text-[96px] font-instrument tracking-normal leading-[1.05] sm:leading-[1] mb-6">
                            Comprehensive <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-600 italic pr-4">
                                Digital Services.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
                            From cloud-native infrastructure and intelligent process automation to zero-trust security. We engineer robust, end-to-end capabilities tailored specifically for your organizational growth.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
                            <a href="#services-list" className="group relative w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-orange-600 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase rounded-sm overflow-hidden flex items-center gap-3">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="relative z-10 w-full text-center">Explore Offerings</span>
                                <span className="relative z-10 text-lg group-hover:translate-y-1 transition-transform shrink-0">↓</span>
                            </a>
                            <a href="#contact" className="group w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-4 bg-transparent border border-white/20 hover:border-orange-500 text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-3">
                                <span className="w-full text-center">Discuss Your Project</span>
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
                                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400">SLA Guarantee</span>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-white tracking-wide">99.99% Uptime</div>
                        </div>

                        <div className="absolute bottom-[5%] sm:bottom-[15%] right-0 sm:-right-4 lg:right-0 z-20 p-4 sm:p-5 w-44 sm:w-52 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl animate-badge-float scale-90 sm:scale-100 origin-right">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-orange-400 mb-2 sm:mb-3">Live Processing</p>
                            <div className="flex items-end gap-1 sm:gap-1.5 h-8 sm:h-10 mb-2">
                                {[60, 40, 75, 90, 65, 100, 85].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-600/50 to-orange-400 rounded-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="text-right text-[10px] sm:text-xs text-white font-mono">10M+ API /sec</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 1: CUSTOMIZABLE CAPABILITIES (BOX-FREE) (~80 lines)           */}
            {/* ===================================================================== */}
            <section id="services-list" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase">01 / CUSTOMIZABLE SERVICES</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white leading-tight">
                                Architected to Order: <span className="italic text-orange-500">Custom Engineering Scope</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm max-w-md font-normal leading-relaxed">
                            No rigid boxed templates. Configure your infrastructure tier, throughput volume, and technical deliverables dynamically.
                        </p>
                    </div>

                    {/* Open Borderless Service Selector Tabs (No Boxes) */}
                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 pb-6 border-b border-white/10 mb-12">
                        {[
                            { id: 'cloud', num: '01', title: 'Multi-Cloud Fabric' },
                            { id: 'aiops', num: '02', title: 'Autonomous AI Workflows' },
                            { id: 'streaming', num: '03', title: 'Real-Time Event Meshes' },
                            { id: 'secops', num: '04', title: 'Zero-Trust DevSecOps' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedCapability(tab.id)}
                                className={`text-left transition-all py-2 group flex items-center gap-3 ${selectedCapability === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <span className={`font-mono text-xs ${selectedCapability === tab.id ? 'text-orange-500 font-bold' : 'text-slate-600'}`}>{tab.num}</span>
                                <span className="text-base sm:text-lg font-bold tracking-tight">{tab.title}</span>
                                {selectedCapability === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>}
                            </button>
                        ))}
                    </div>

                    {/* Main Open Content Layout (Without Boxes / Card Containers) */}
                    {(() => {
                        const capabilityMap = {
                            cloud: {
                                headline: 'Resilient Multi-Region Cloud & Kubernetes',
                                desc: 'Bespoke topology design deploying self-healing clusters across AWS, GCP, and Azure with unified Terraform state orchestration.',
                                deliverables: [
                                    { name: 'Multi-Region Terraform IaC Blueprint', eta: 'Sprint 01', tag: 'Terraform / AWS' },
                                    { name: 'Zero-Downtime Blue/Green K8s Pipeline', eta: 'Sprint 02', tag: 'ArgoCD / Helm' },
                                    { name: 'Global Cloudflare Anycast CDN Routing', eta: 'Sprint 03', tag: 'Edge Compute' }
                                ]
                            },
                            aiops: {
                                headline: 'Autonomous AI Agents & Enterprise Orchestration',
                                desc: 'Custom LLM inference microservices and event-triggered agentic pipelines eliminating repetitive human operational toil.',
                                deliverables: [
                                    { name: 'Fine-Tuned Domain LLM Inference Gateway', eta: 'Sprint 01', tag: 'PyTorch / vLLM' },
                                    { name: 'Autonomous Self-Healing Incident Bot', eta: 'Sprint 02', tag: 'Slack / PagerDuty' },
                                    { name: 'Semantic Vector Memory & Real-Time RAG', eta: 'Sprint 03', tag: 'pgvector / Redis' }
                                ]
                            },
                            streaming: {
                                headline: 'Sub-Second Event-Driven Kafka Pipelines',
                                desc: 'High-throughput real-time telemetry streaming handling millions of concurrent payloads with guaranteed exactly-once delivery.',
                                deliverables: [
                                    { name: 'Distributed Apache Kafka Cluster Topologies', eta: 'Sprint 01', tag: 'Confluent / K8s' },
                                    { name: 'Real-Time Materialized CDC Data Lake', eta: 'Sprint 02', tag: 'ClickHouse / Debezium' },
                                    { name: 'Sub-15ms WebSocket Event Broadcast Gateway', eta: 'Sprint 03', tag: 'Go Fiber / Redis' }
                                ]
                            },
                            secops: {
                                headline: 'Zero-Trust Encryption & Automated SOC2 Proofs',
                                desc: 'End-to-end cryptographic shielding, ephemeral secret management, and continuous DevSecOps pipeline verification.',
                                deliverables: [
                                    { name: 'Dynamic Vault Identity & Secret Rotation Engine', eta: 'Sprint 01', tag: 'HashiCorp Vault' },
                                    { name: 'Automated CI/CD Vulnerability & SBOM Gating', eta: 'Sprint 02', tag: 'Trivy / OWASP' },
                                    { name: 'Continuous SOC2 Type II Telemetry Logger', eta: 'Sprint 03', tag: 'Datadog / OpenTelemetry' }
                                ]
                            }
                        };
                        const active = capabilityMap[selectedCapability] || capabilityMap.cloud;

                        return (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                {/* Left Side: Details & Throughput Scale Selector (5 Cols) */}
                                <div className="lg:col-span-5">
                                    <h3 className="text-2xl sm:text-3xl font-instrument text-white mb-4 leading-snug">{active.headline}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8">{active.desc}</p>

                                    <div className="py-6 border-y border-white/10 mb-8">
                                        <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-3">Custom Throughput Scale</div>
                                        <div className="flex flex-wrap gap-3 text-xs">
                                            {['1M-10M req/day', '10M-100M req/day', '1B+ req/day'].map((scale) => (
                                                <button
                                                    key={scale}
                                                    onClick={() => setServiceScale(scale)}
                                                    className={`py-1.5 px-3 rounded-full border transition-all ${serviceScale === scale ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-white/10 text-slate-400 hover:text-white'}`}
                                                >
                                                    {scale}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <a href="#contact" className="inline-flex items-center gap-3 text-orange-400 hover:text-orange-300 font-bold text-xs uppercase tracking-widest group">
                                        <span>Request Tailored Blueprint for this Scope</span>
                                        <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                                    </a>
                                </div>

                                {/* Right Side: Open Deliverables List (7 Cols) */}
                                <div className="lg:col-span-7 divide-y divide-white/10">
                                    <div className="pb-3 text-xs uppercase tracking-widest text-slate-500 font-mono flex justify-between">
                                        <span>Deliverable Scope ({serviceScale})</span>
                                        <span>Milestone & Stack</span>
                                    </div>
                                    {active.deliverables.map((item, idx) => (
                                        <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                            <div>
                                                <span className="text-orange-500 font-mono text-xs mr-3">0{idx + 1}</span>
                                                <span className="text-white font-medium text-sm sm:text-base group-hover:text-orange-400 transition-colors">{item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-mono shrink-0 pl-7 sm:pl-0">
                                                <span className="text-slate-400">{item.eta}</span>
                                                <span className="text-emerald-400">{item.tag}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 2: DELIVERY LIFECYCLE & METHODOLOGY (~50 lines)               */}
            {/* ===================================================================== */}
            <section id="methodology" className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400">02 / ROADMAP</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">
                            From Discovery to <span className="italic text-orange-500">Autonomous Execution</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-normal">A structured four-phase cadence ensuring zero disruption, high velocity, and predictable outcomes.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Systems Audit", time: "Week 01", desc: "Comprehensive profiling of existing infrastructure, security bottlenecks, and scalability vectors." },
                            { step: "02", title: "Architecture Blueprint", time: "Weeks 02-03", desc: "Designing target topologies, data flow schemas, API contracts, and automated CI/CD gating." },
                            { step: "03", title: "Sprint Staging & POC", time: "Weeks 04-06", desc: "Iterative deployment into isolated sandboxes with load validation and benchmark telemetry." },
                            { step: "04", title: "Zero-Downtime Cutover", time: "Continuous", desc: "Blue-green deployment transition accompanied by 24/7 site reliability engineering supervision." }
                        ].map((phase, idx) => (
                            <div key={idx} className="relative p-6 sm:p-8 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-orange-500/40 transition-all duration-300">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-3xl font-instrument text-orange-500">{phase.step}</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">{phase.time}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{phase.desc}</p>
                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-orange-600 to-amber-400 h-full rounded-full" style={{ width: `${(idx + 1) * 25}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div><div className="text-2xl font-instrument text-white">100%</div><div className="text-[11px] text-slate-400 uppercase tracking-wider">Test Coverage</div></div>
                        <div><div className="text-2xl font-instrument text-orange-500">0 ms</div><div className="text-[11px] text-slate-400 uppercase tracking-wider">Cutover Disruption</div></div>
                        <div><div className="text-2xl font-instrument text-white">24/7</div><div className="text-[11px] text-slate-400 uppercase tracking-wider">Telemetry SRE</div></div>
                        <div><div className="text-2xl font-instrument text-orange-500">Tier-1</div><div className="text-[11px] text-slate-400 uppercase tracking-wider">Enterprise SLA</div></div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 3: TECH ECOSYSTEM & CLOUD INTEGRATIONS (~50 lines)            */}
            {/* ===================================================================== */}
            <section id="technologies" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase">03 / ECOSYSTEM</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white leading-tight">
                                Battle-Tested <br /><span className="text-orange-500 italic">Technology Fabric</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm max-w-md font-normal leading-relaxed">
                            Deep integrations across modern multi-cloud primitives, container runtimes, event brokers, and intelligent ML microservices.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { category: "Cloud & Compute", stack: ["AWS ECS / EKS", "Google Cloud Run", "Azure Arc", "Terraform Cloud"] },
                            { category: "Frameworks & Apps", stack: ["React 19 / Vite", "Next.js 15 App Router", "Node.js / Express", "GraphQL / gRPC"] },
                            { category: "Data & Telemetry", stack: ["PostgreSQL HA", "Redis Clusters", "Apache Kafka", "Prometheus & Grafana"] },
                            { category: "Security & Mesh", stack: ["Istio Service Mesh", "HashiCorp Vault", "Auth0 & Okta SSO", "Cloud Armor"] }
                        ].map((cat, idx) => (
                            <div key={idx} className="p-7 rounded-2xl bg-[#0f0f0f] border border-white/10 hover:border-orange-500/40 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">{cat.category}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {cat.stack.map((item, sIdx) => (
                                        <li key={sIdx} className="flex items-center justify-between text-xs text-slate-300 py-1.5 border-b border-white/5 last:border-0">
                                            <span>{item}</span>
                                            <span className="text-[10px] font-mono text-emerald-400">Ready</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] to-orange-500/[0.05] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-instrument text-2xl font-bold">∞</div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Full Stack Vendor-Agnostic Freedom</h4>
                                <p className="text-xs text-slate-400">Zero lock-in architecture with open standards, portable Docker containers, and clean abstractions.</p>
                            </div>
                        </div>
                        <a href="#guarantees" className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-orange-600 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-200 transition-all shrink-0">View SLAs →</a>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 4: MISSION-CRITICAL SLAS & CUSTOMIZABLE SALES (~100 lines)    */}
            {/* ===================================================================== */}
            <section id="guarantees" className="py-24 bg-[#070707] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400">04 / CUSTOMIZABLE SLA & SALES</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">
                            Mission-Critical SLAs & <span className="italic text-orange-500">Custom Sales Configurator</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-normal">
                            Tailor your deployment's contractual uptime guarantees, response latencies, and dedicated SRE engineering tier.
                        </p>
                        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#121212] border border-white/10">
                            <button
                                type="button"
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                Monthly Billing
                            </button>
                            <button
                                type="button"
                                onClick={() => setBillingCycle('annual')}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${billingCycle === 'annual' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                Annual Billing
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">SAVE 20%</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left: SLA Tier Selection Cards (7 Cols) */}
                        <div className="lg:col-span-7 space-y-4">
                            {[
                                {
                                    id: 'scale',
                                    name: 'Scale Architecture SLA',
                                    uptime: '99.9%',
                                    response: '< 60 Min Response',
                                    basePrice: 1999,
                                    annualPrice: 1599,
                                    desc: 'Ideal for rapidly growing digital platforms requiring reliable automated failover.',
                                    features: ['Multi-region DNS failover', 'Automated health pings every 30s', 'Standard Slack support channel']
                                },
                                {
                                    id: 'enterprise',
                                    name: 'Enterprise Mission SLA',
                                    uptime: '99.99%',
                                    response: '< 15 Min Priority SRE',
                                    basePrice: 4999,
                                    annualPrice: 3999,
                                    popular: true,
                                    desc: 'Designed for high-transaction commerce and financial pipelines where downtime is unacceptable.',
                                    features: ['Active-active multi-zone clusters', 'Direct P1 PagerDuty engineer bridge', '100% financial SLA refund credit clause']
                                },
                                {
                                    id: 'mission',
                                    name: 'Mission-Critical Ultra',
                                    uptime: '99.999%',
                                    response: '< 5 Min SRE War Room',
                                    basePrice: 9999,
                                    annualPrice: 7999,
                                    desc: 'Dedicated round-the-clock site reliability team with real-time distributed telemetry.',
                                    features: ['Zero-failover state sync across 3 clouds', 'Dedicated Principal Architect assigned', 'Custom quarterly penetration testing']
                                }
                            ].map((tier) => {
                                const isSelected = slaPlan === tier.id;
                                const price = billingCycle === 'annual' ? tier.annualPrice : tier.basePrice;
                                return (
                                    <div
                                        key={tier.id}
                                        onClick={() => setSlaPlan(tier.id)}
                                        className={`cursor-pointer p-6 rounded-2xl transition-all border relative ${isSelected ? 'bg-orange-950/20 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.15)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                                    >
                                        {tier.popular && (
                                            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow">
                                                Most Selected
                                            </span>
                                        )}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-500'}`}>
                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-orange-400 font-mono">
                                                    <span>{tier.uptime} Guaranteed Uptime</span>
                                                    <span>•</span>
                                                    <span>{tier.response}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-instrument text-white">${price.toLocaleString()}<span className="text-xs text-slate-400 font-sans">/mo</span></div>
                                                <div className="text-[10px] text-slate-400 font-mono">Billed {billingCycle}</div>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-xs mb-3">{tier.desc}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-white/5">
                                            {tier.features.map((f, fi) => (
                                                <div key={fi} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                                                    <span className="text-orange-500">✓</span> {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Customizable Add-on Modules */}
                            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 mt-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4">Customize Add-On Infrastructure Modules</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { key: 'sreBridge', name: '24/7 SRE Phone Bridge', price: 650, desc: 'Direct dial incident war room' },
                                        { key: 'multiCloud', name: 'Multi-Cloud AWS + Azure', price: 1100, desc: 'Zero cloud vendor lock-in' },
                                        { key: 'complianceShield', name: 'SOC2 / HIPAA Audit Shield', price: 450, desc: 'Automated continuous proofs' }
                                    ].map((add) => {
                                        const checked = !!addons[add.key];
                                        return (
                                            <div
                                                key={add.key}
                                                onClick={() => setAddons(prev => ({ ...prev, [add.key]: !prev[add.key] }))}
                                                className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left ${checked ? 'bg-orange-950/20 border-orange-500/60' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-bold text-white">{add.name}</span>
                                                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${checked ? 'bg-orange-500 text-black font-bold' : 'border border-slate-600'}`}>{checked ? '✓' : ''}</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400 mb-2">{add.desc}</div>
                                                <div className="text-xs font-mono text-orange-400">+${add.price}/mo</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right: Dynamic Sales Proposal & Order Summary (5 Cols) */}
                        <div className="lg:col-span-5 sticky top-28">
                            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#131313] to-[#0a0a0a] border border-orange-500/30 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />
                                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 block mb-1">Sales Configurator</span>
                                        <h4 className="text-xl font-bold text-white">Custom SLA Contract</h4>
                                    </div>
                                    <div className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
                                        Active Quote
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 text-xs text-slate-300">
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Selected SLA Tier:</span>
                                        <span className="font-bold text-white uppercase">{slaPlan} Tier</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Target Uptime Guarantee:</span>
                                        <span className="font-mono text-emerald-400 font-bold">{slaPlan === 'mission' ? '99.999%' : slaPlan === 'enterprise' ? '99.99%' : '99.9%'}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Billing Cadence:</span>
                                        <span className="font-medium text-white capitalize">{billingCycle} (with discounts)</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-400">Add-On Modules:</span>
                                        <span className="font-mono text-orange-400">{Object.values(addons).filter(Boolean).length} Active</span>
                                    </div>
                                </div>

                                {/* Live Price Calculation */}
                                {(() => {
                                    const baseRates = { scale: 1999, enterprise: 4999, mission: 9999 };
                                    const annualRates = { scale: 1599, enterprise: 3999, mission: 7999 };
                                    const tierBase = billingCycle === 'annual' ? annualRates[slaPlan] : baseRates[slaPlan];
                                    const addSum = (addons.sreBridge ? 650 : 0) + (addons.multiCloud ? 1100 : 0) + (addons.complianceShield ? 450 : 0);
                                    const monthlyTotal = tierBase + addSum;
                                    const totalAnnualValue = monthlyTotal * 12;

                                    return (
                                        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 mb-6 text-center">
                                            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Custom Package Value</div>
                                            <div className="text-4xl sm:text-5xl font-instrument text-white mb-1">
                                                ${monthlyTotal.toLocaleString()}
                                                <span className="text-xs text-slate-400 font-sans font-normal"> / mo</span>
                                            </div>
                                            <div className="text-[11px] text-emerald-400 font-mono">
                                                {billingCycle === 'annual' ? `Estimated $${totalAnnualValue.toLocaleString()} billed annually` : 'Flexible month-to-month terms'}
                                            </div>
                                        </div>
                                    );
                                })()}

                                <div className="space-y-3">
                                    <a
                                        href="#contact"
                                        className="group relative w-full text-center py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-xl overflow-hidden transition-all shadow-[0_0_25px_rgba(249,115,22,0.3)] block"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Lock In This SLA Quote
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </span>
                                    </a>
                                    <a
                                        href="#services-list"
                                        className="w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs tracking-[0.1em] uppercase rounded-xl transition-all block"
                                    >
                                        Talk With Sales Specialist
                                    </a>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                    <p className="text-[11px] text-slate-400">
                                        Includes legally binding SLA terms with automatic financial credits if uptime drops below contract.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 5: DEPLOYMENT ADVISORY & CONSULTATION (~50 lines)             */}
            {/* ===================================================================== */}
            <section id="consultation" className="py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="relative rounded-3xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-white/15 p-8 sm:p-14 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                            <div className="lg:col-span-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">05 / GET STARTED</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-6 leading-tight">
                                    Ready to Elevate Your <br />
                                    <span className="text-orange-500 italic">Enterprise Architecture?</span>
                                </h2>
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                                    Book a zero-obligation 45-minute technical audit with our lead systems architects. We analyze your throughput metrics, cloud spend, and deliver an actionable modernization blueprint.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10"><div className="text-white text-xs font-bold mb-1">Architecture Diagnostic</div><div className="text-[11px] text-slate-400">Bottlenecks & latency mapping</div></div>
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10"><div className="text-white text-xs font-bold mb-1">Cost Optimization Plan</div><div className="text-[11px] text-slate-400">Average 35% cloud saving</div></div>
                                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10"><div className="text-white text-xs font-bold mb-1">Sprint Roadmap</div><div className="text-[11px] text-slate-400">Clear deliverables & scope</div></div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 flex flex-col gap-4">
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
                                    className="group relative w-full text-center px-8 py-5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-xl overflow-hidden transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        Schedule Architecture Audit
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </a>
                                <a href="#services-list" className="w-full text-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-bold text-xs tracking-[0.15em] uppercase rounded-xl transition-all">
                                    Review All Capabilities
                                </a>
                                <div className="text-center text-[11px] text-slate-400 mt-2">
                                    Confidential • NDA Protected • No credit card required
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 6: CLIENT DEPLOYMENT SHOWCASE & CASE STUDIES (IMAGE-DRIVEN)   */}
            {/* ===================================================================== */}
            <section id="deployments" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-[1px] w-12 bg-orange-500"></div>
                                <span className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase">06 / PROVEN IMPACT</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white leading-tight">
                                Production Deployments <br /><span className="text-orange-500 italic">In Real-World Environments</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm max-w-md font-normal leading-relaxed">
                            Examine how our cloud and automation architectures perform under intense real-world traffic, strict security compliance, and petabyte-scale loads.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Deployment 1 */}
                        <div className="group relative rounded-3xl overflow-hidden bg-[#0e0e0e] border border-white/10 hover:border-orange-500/50 transition-all duration-500 flex flex-col justify-between">
                            <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
                                <img
                                    src="/images/hakasolution (6).jpg"
                                    alt="Fintech Infrastructure Overhaul"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">Live Cluster</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-md bg-orange-600/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold">FinTech / Tier-1 Bank</span>
                                    <span className="text-xs font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30">99.999% SLA Uptime</span>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                                    Ultra-Low Latency Banking & Settlement Fabric
                                </h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                                    Re-architected core multi-region settlement ledger with active-active Kubernetes clusters on AWS & Bare Metal, reducing payment validation latency from 450ms down to 18ms.
                                </p>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                                    <div>
                                        <div className="text-xl font-instrument text-white">-68%</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Cloud Overheads</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-instrument text-orange-500">18ms</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Tx Validation</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-instrument text-white">Zero</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Packet Drops</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deployment 2 */}
                        <div className="group relative rounded-3xl overflow-hidden bg-[#0e0e0e] border border-white/10 hover:border-orange-500/50 transition-all duration-500 flex flex-col justify-between">
                            <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
                                <img
                                    src="/images/hakasolution (7).jpg"
                                    alt="Smart Logistics & Autonomous Systems"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">Edge Fleet</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-md bg-orange-600/90 text-white font-mono text-[10px] uppercase tracking-widest font-bold">Global Logistics</span>
                                    <span className="text-xs font-mono text-orange-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-orange-500/30">14M Events / Min</span>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                                    Autonomous Edge Telemetry & Robotics Fleet
                                </h3>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                                    Engineered edge Kafka streaming clusters across 40+ international distribution hubs to coordinate automated warehouse drones and robotic sorting units in sub-second response times.
                                </p>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                                    <div>
                                        <div className="text-xl font-instrument text-white">40+</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Active Hubs</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-instrument text-orange-500">14M/m</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Stream Events</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-instrument text-white">99.98%</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Fleet Reliability</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* SECTION 7: GLOBAL COMMAND NETWORK & HARDWARE LABS (IMAGE GALLERY)    */}
            {/* ===================================================================== */}
            <section id="infrastructure" className="py-24 bg-[#060606] border-t border-white/10 relative overflow-hidden reveal-element">
                <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400">07 / INFRASTRUCTURE</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-instrument text-white mb-4">
                            Global Command & <span className="italic text-orange-500">Hardware Network</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base font-normal">
                            Direct peering across 28 availability regions with carrier-neutral interconnects, hardware security modules, and 24/7 dedicated SOC facilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        {/* Main Featured Image: 24/7 Mission Control */}
                        <div className="lg:col-span-7 group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] min-h-[350px] lg:min-h-[480px]">
                            <img
                                src="/images/hakasolution (8).jpg"
                                alt="Global Network Operations Center"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-85 group-hover:brightness-95"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                            <div className="absolute top-6 left-6 p-3 px-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Mission Control SOC</span>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">24/7 Network Operations & SRE Supervision</h3>
                                <p className="text-slate-300 text-xs sm:text-sm font-normal">
                                    Real-time automated failover routing with round-the-clock incident response across Asia, Europe, and the Americas.
                                </p>
                            </div>
                        </div>

                        {/* Secondary Stacked Images */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Card 1: Server corridor */}
                            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] h-[230px]">
                                <img
                                    src="/images/hakasolution (13).jpg"
                                    alt="Supercomputing Clusters"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">Tier-4 Standards</span>
                                    <h4 className="text-lg font-bold text-white">Liquid-Cooled Compute Pods</h4>
                                    <p className="text-slate-300 text-xs mt-1">High-density GPU clusters optimized for distributed AI inference.</p>
                                </div>
                            </div>

                            {/* Card 2: Security & Hardware Enclaves */}
                            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] h-[230px]">
                                <img
                                    src="/images/hakasolution (14).jpg"
                                    alt="Zero Trust Cryptographic Vaults"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">Hardware Security Modules</span>
                                    <h4 className="text-lg font-bold text-white">Zero-Trust Cryptographic Enclaves</h4>
                                    <p className="text-slate-300 text-xs mt-1">FIPS 140-2 Level 3 physical isolation for enterprise key management.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Telemetry Bar */}
                    <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl sm:text-3xl font-instrument text-white">28</div>
                            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Global Data Regions</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-instrument text-orange-500">&lt; 14ms</div>
                            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Average Edge Latency</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-instrument text-white">100 Tbps</div>
                            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">DDoS Scrubbing Capacity</div>
                        </div>
                        <div>
                            <div className="text-2xl sm:text-3xl font-instrument text-orange-500">Zero</div>
                            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Physical Breaches</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DARK MODE FOOTER */}
            <Footer />

        </div>
    );
}

export default Services;