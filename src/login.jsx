import { useState, useEffect } from 'react';
import './App.css';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    // Prevent body and html scrollbars while on the Login page
    useEffect(() => {
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
        };
    }, []);

    return (
        <div className="h-screen max-h-screen w-screen max-w-[100vw] overflow-hidden bg-[#0a0a0a] font-sans text-white selection:bg-orange-500 selection:text-white flex flex-col lg:flex-row">

            {/* INJECTED CSS FOR FONTS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

                .font-instrument {
                    font-family: 'Instrument Serif', serif;
                    font-weight: 400;
                }
            `}</style>

            {/* ===================================================================== */}
            {/* LEFT SIDE: FIXED IMAGE (Full viewport height, no scroll)               */}
            {/* ===================================================================== */}
            <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden bg-[#0d0d0d]">
                <img 
                    src="/images/hakasolution (1).jpg" 
                    alt="Haka Solutions Enterprise Architecture" 
                    className="w-full h-full object-cover object-center" 
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]"></div>

                {/* Top Brand Logo Link */}
                <div className="absolute top-6 left-6 z-20">
                    <a 
                        href="#home" 
                        onClick={() => {
                            window.location.hash = '#home';
                            window.dispatchEvent(new Event('hashchange'));
                        }}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
                            H
                        </div>
                        <span className="text-base font-bold tracking-[0.18em] uppercase text-white">
                            HAKA<span className="text-orange-500">SOLUTIONS</span>
                        </span>
                    </a>
                </div>

                {/* Bottom Tagline / Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 z-20 p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] font-bold tracking-widest uppercase mb-1.5">
                        ENTERPRISE PORTAL
                    </div>
                    <p className="text-base sm:text-lg text-white font-light leading-snug mb-1">
                        Architecting Smarter Realities.
                    </p>
                    <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                        Secure access to enterprise cloud deployments, automated workflows, and system analytics.
                    </p>
                </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT SIDE: COMPACT AUTHENTICATION CARD (Strictly fits viewport)      */}
            {/* ===================================================================== */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-3 relative bg-[#0a0a0a] overflow-hidden">
                
                {/* Top Back-To-Home Link */}
                <div className="w-full max-w-[400px] flex items-center justify-between mb-3">
                    <a 
                        href="#home" 
                        onClick={() => {
                            window.location.hash = '#home';
                            window.dispatchEvent(new Event('hashchange'));
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-orange-400 transition-colors"
                    >
                        <span>←</span>
                        <span>Back to Home</span>
                    </a>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest lg:hidden">
                        HAKA SOLUTIONS
                    </span>
                </div>

                {/* Card Container */}
                <div className="w-full max-w-[400px] bg-[#0e0e0e]/95 border border-white/10 rounded-2xl px-5 sm:px-7 py-5 sm:py-6 backdrop-blur-2xl shadow-2xl relative">
                    
                    {/* Custom Login / Signup Toggle Pill */}
                    <div className="flex bg-white/[0.04] p-1 rounded-lg mb-3.5 w-max border border-white/10">
                        <button 
                            onClick={() => setIsSignUp(false)} 
                            className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${!isSignUp ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.3)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Log In
                        </button>
                        <button 
                            onClick={() => setIsSignUp(true)} 
                            className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${isSignUp ? 'bg-orange-600 text-white shadow-[0_0_12px_rgba(234,88,12,0.3)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Headings */}
                    <h1 className="text-3xl sm:text-[36px] font-instrument mb-1 text-white leading-tight">
                        {isSignUp ? "Create an " : "Welcome "}
                        <span className="italic text-orange-400">{isSignUp ? "Account." : "Back."}</span>
                    </h1>
                    <p className="text-neutral-400 text-xs mb-3.5 font-light leading-relaxed">
                        {isSignUp 
                            ? "Join our platform to deploy modular digital infrastructure." 
                            : "Sign in to access your enterprise dashboard and deployments."}
                    </p>

                    {/* Interactive Form */}
                    <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Animated reveal for Sign Up fields */}
                        <div className={`space-y-2.5 transition-all duration-300 overflow-hidden ${isSignUp ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. John Doe" 
                                    className="w-full bg-[#ffffff05] border border-white/10 rounded-lg px-3.5 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:bg-[#ffffff0a] focus:ring-1 focus:ring-orange-500 transition-all" 
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase ml-1">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@company.com" 
                                className="w-full bg-[#ffffff05] border border-white/10 rounded-lg px-3.5 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:bg-[#ffffff0a] focus:ring-1 focus:ring-orange-500 transition-all" 
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase">Password</label>
                                {!isSignUp && (
                                    <a href="#forgot" className="text-[10px] text-orange-500 hover:text-orange-400 transition-colors font-medium">
                                        Forgot password?
                                    </a>
                                )}
                            </div>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full bg-[#ffffff05] border border-white/10 rounded-lg px-3.5 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:bg-[#ffffff0a] focus:ring-1 focus:ring-orange-500 transition-all" 
                            />
                        </div>

                        <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-[0.14em] uppercase py-2.5 rounded-lg transition-all mt-3 shadow-[0_0_15px_rgba(234,88,12,0.25)] hover:shadow-[0_0_25px_rgba(234,88,12,0.4)]">
                            {isSignUp ? "Create Account" : "Sign In to Portal"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-3 flex items-center gap-3">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Or continue with</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                    </div>

                    {/* Social Auth Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all group">
                            <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[11px] font-bold tracking-wide text-slate-300 group-hover:text-white transition-colors">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all group">
                            <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.69 3.52 1.84-3.08 1.77-2.54 5.86.32 7.04-.69 1.69-1.63 3.32-2.42 4.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span className="text-[11px] font-bold tracking-wide text-slate-300 group-hover:text-white transition-colors">Apple</span>
                        </button>
                    </div>

                    <div className="mt-3 text-center text-[9px] text-neutral-500 font-mono">
                        Protected by 256-bit TLS encryption • HAKA Systems
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;