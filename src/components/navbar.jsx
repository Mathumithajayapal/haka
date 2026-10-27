import { useState, useEffect } from 'react';

// Interactive Mega Menu Data for ABOUT US and SERVICES
const NAV_DATA = {
  'ABOUT US': {
    leftHeader: "COMPANY & LEARN",
    items: [
      {
        name: "About HAKA",
        title: "About HAKA Solutions",
        desc: "Learn about our mission, vision, core values, and commitment to building reliable digital solutions worldwide.",
        tags: ["Who We Are", "Our Mission", "Core Values", "Leadership", "Global Presence", "Culture"],
        image: "/images/about4.jpg"
      },
      {
        name: "Case Studies",
        title: "Verified Case Studies",
        desc: "Explore real projects, implementation architectures, and verified business outcomes delivered for our clients.",
        tags: ["Data Transformation", "Automation ROI", "Cloud Scale", "Enterprise Support", "Workflow Redesign", "Client Stories"],
        image: "/images/hakasolution (1).jpg"
      },
      {
        name: "Careers at HAKA",
        title: "Build Your Future With HAKA",
        desc: "Join a culture of discipline, continuous learning, and teamwork. Explore verified job openings across our teams.",
        tags: ["Open Positions", "Engineering Roles", "Operations Roles", "Company Culture", "Application Process", "Work Modes"],
        image: "/images/about5.jpg"
      },
      {
        name: "Security & Trust",
        title: "Enterprise Security",
        desc: "Data protection, role-based access management, and secure operational workflows built into every engagement.",
        tags: ["Access Control", "Data Protection", "Secure Uploads", "Audit Logs", "Backup Protocols", "Compliance"],
        image: "/images/hakasolution (2).jpg"
      }
    ]
  },
  'SERVICES': {
    leftHeader: "CORE SERVICES & SOLUTIONS",
    items: [
      {
        name: "Data & Digital Operations",
        title: "Data & Digital Operations",
        desc: "Streamline high-volume data processing, verification, documentation, and digital operational workflows with precision.",
        tags: ["Data Processing", "Verification", "Documentation", "Quality Assurance", "Back-Office Support", "Data Entry"],
        image: "/images/hakasolution (3).jpg"
      },
      {
        name: "Technology Solutions",
        title: "Technology Solutions",
        desc: "Custom technology-enabled platforms and architectures designed to improve business processes and operational efficiency.",
        tags: ["Custom Software", "Web Applications", "Cloud Migration", "API Integration", "System Architecture", "DevOps"],
        image: "/images/hakasolution (4).jpg"
      },
      {
        name: "Business Process Support",
        title: "Business Process Support",
        desc: "Structured operational support for organizations looking to streamline repetitive processes and scale effortlessly.",
        tags: ["Workflow Audits", "Process Mapping", "Dedicated Teams", "SLA Management", "24/7 Operations", "Cost Optimization"],
        image: "/images/about6.jpg"
      },
      {
        name: "Digital Workforce & Automation",
        title: "Digital Workforce & Automation",
        desc: "Turn operational challenges into scalable results with intelligent automated pipelines, smart routing, and remote tech specialists.",
        tags: ["Remote Teams", "Tech Analysts", "Data Specialists", "RPA", "Trigger Pipelines", "Auto-Reporting"],
        image: "/images/hakasolution (5).jpg"
      },
      {
        name: "Custom Solutions",
        title: "Custom Solutions",
        desc: "Bespoke operational and technical solutions engineered specifically around your unique business requirements.",
        tags: ["Bespoke Engineering", "Enterprise Architecture", "Custom AI", "Legacy Modernization", "R&D", "Consulting"],
        image: "/images/hakasolution (6).jpg"
      }
    ]
  }
};

function Navbar({ isScrolled: propIsScrolled, theme = "dark", activePage }) {
  const isLight = theme === "light";
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const determineActiveRoute = () => {
    if (activePage) return activePage;
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === '#login' || hash === '#/login' || path === '/login') return 'login';
    if (hash === '#contact' || hash === '#/contact' || path === '/contact') return 'contact';
    if (hash === '#about' || hash === '#/about' || path === '/about') return 'about';
    if (hash === '#services' || hash === '#/services' || hash === '#service' || hash === '#/service' || path === '/services' || path === '/service') return 'services';
    if (hash === '#portfolio' || hash === '#/portfolio' || hash === '#portfolious' || hash === '#/portfolious' || path === '/portfolio') return 'portfolio';
    return 'home';
  };

  const [currentActive, setCurrentActive] = useState(determineActiveRoute);

  useEffect(() => {
    if (activePage) {
      setCurrentActive(activePage);
    }
  }, [activePage]);

  // Sync route and close mobile menu on hash/popstate navigation
  useEffect(() => {
    const handleRouteSync = () => {
      setCurrentActive(determineActiveRoute());
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);
    return () => {
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
    };
  }, [activePage]);

  // Lock background scroll when mobile hamburger menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on desktop viewport resize (1024px+)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const isHomeActive = currentActive === 'home';
  const isAboutActive = currentActive === 'about';
  const isServicesActive = currentActive === 'services' || currentActive === 'service';
  const isPortfolioActive = currentActive === 'portfolio';

  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalScrolled;

  useEffect(() => {
    if (propIsScrolled !== undefined) {
      if (propIsScrolled) {
        setActiveDropdown(null);
      }
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setInternalScrolled(true);
      } else {
        setInternalScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsScrolled]);

  const handleMenuEnter = (menuKey) => {
    setActiveDropdown(menuKey);
    setActiveSubIndex(0);
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* FIXED PERSISTENT TOP NAVBAR + FLOATING CENTERED MEGA-MENU             */}
      {/* (HOME, ABOUT US, SERVICES, PORTFOLIO)                                 */}
      {/* ===================================================================== */}
      <div
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* Top Bar: Always fixed & visible, with subtle blur backdrop when scrolled */}
        <header
          className={`w-full h-[80px] px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
            activeDropdown || isMobileMenuOpen
              ? (isLight ? 'bg-white shadow-md border-b border-slate-200' : 'bg-[#0a0a0a] border-b border-white/10')
              : isScrolled
                ? (isLight
                    ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm'
                    : 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl')
                : 'bg-transparent'
          }`}
        >
          {/* Left: Brand Logo */}
          <a
            href="#home"
            onClick={() => {
              setActiveDropdown(null);
              setCurrentActive('home');
              if (window.location.hash === '#home' || window.location.hash === '') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.location.hash = '#home';
                window.dispatchEvent(new Event('hashchange'));
              }
            }}
            className="flex items-center gap-3 z-10 cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              H
            </div>
            <span className={`text-[16px] font-bold tracking-[0.18em] uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              HAKA<span className="text-orange-500">SOLUTIONS</span>
            </span>
          </a>

          {/* Center: Fixed Top Navlinks (HOME, ABOUT US, SERVICES, PORTFOLIO) */}
          <nav className="hidden lg:flex items-center gap-10 h-full">
            {/* 1. HOME */}
            <div className="relative h-full flex items-center">
              <a
                href="#home"
                onMouseEnter={() => setActiveDropdown(null)}
                onClick={() => {
                  setActiveDropdown(null);
                  setCurrentActive('home');
                  if (window.location.hash === '#home' || window.location.hash === '') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.hash = '#home';
                    window.dispatchEvent(new Event('hashchange'));
                  }
                }}
                className={`relative h-full flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                  isHomeActive
                    ? 'text-orange-500 font-extrabold'
                    : isLight
                      ? 'text-slate-800 hover:text-orange-600 font-bold'
                      : 'text-neutral-300 hover:text-white font-bold'
                }`}
              >
                {isHomeActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse"></span>
                )}
                <span>HOME</span>
                {isHomeActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-orange-400 to-amber-400 rounded-t-full shadow-[0_0_12px_rgba(249,115,22,1)]"></span>
                )}
              </a>
            </div>

            {/* 2. ABOUT US (Dropdown Trigger & Direct Link) */}
            <div className="relative h-full flex items-center">
              <a
                href="#about"
                onMouseEnter={() => handleMenuEnter('ABOUT US')}
                onClick={() => {
                  setActiveDropdown(null);
                  setCurrentActive('about');
                  if (window.location.hash === '#about') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.hash = '#about';
                    window.dispatchEvent(new Event('hashchange'));
                  }
                }}
                className={`relative h-full flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase transition-all duration-200 focus:outline-none cursor-pointer ${
                  isAboutActive
                    ? 'text-orange-500 font-extrabold'
                    : isLight
                      ? 'text-slate-800 hover:text-orange-600 font-bold'
                      : 'text-neutral-300 hover:text-white font-bold'
                }`}
              >
                {isAboutActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse"></span>
                )}
                <span>ABOUT US</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'ABOUT US'
                      ? 'rotate-180 text-orange-500'
                      : isAboutActive
                        ? 'text-orange-500'
                        : isLight
                          ? 'text-slate-600'
                          : 'text-white/80'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isAboutActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-orange-400 to-amber-400 rounded-t-full shadow-[0_0_12px_rgba(249,115,22,1)]"></span>
                )}
              </a>
            </div>

            {/* 3. SERVICES (Dropdown Trigger & Direct Link) */}
            <div className="relative h-full flex items-center">
              <a
                href="#services"
                onMouseEnter={() => handleMenuEnter('SERVICES')}
                onClick={() => {
                  setActiveDropdown(null);
                  setCurrentActive('services');
                  if (window.location.hash === '#services' || window.location.hash === '#service') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.hash = '#services';
                    window.dispatchEvent(new Event('hashchange'));
                  }
                }}
                className={`relative h-full flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase transition-all duration-200 focus:outline-none cursor-pointer ${
                  isServicesActive
                    ? 'text-orange-500 font-extrabold'
                    : isLight
                      ? 'text-slate-800 hover:text-orange-600 font-bold'
                      : 'text-neutral-300 hover:text-white font-bold'
                }`}
              >
                {isServicesActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse"></span>
                )}
                <span>SERVICES</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'SERVICES'
                      ? 'rotate-180 text-orange-500'
                      : isServicesActive
                        ? 'text-orange-500'
                        : isLight
                          ? 'text-slate-600'
                          : 'text-white/80'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isServicesActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-orange-400 to-amber-400 rounded-t-full shadow-[0_0_12px_rgba(249,115,22,1)]"></span>
                )}
              </a>
            </div>

            {/* 4. PORTFOLIO */}
            <div className="relative h-full flex items-center">
              <a
                href="#portfolio"
                onMouseEnter={() => setActiveDropdown(null)}
                onClick={() => {
                  setActiveDropdown(null);
                  setCurrentActive('portfolio');
                  if (window.location.hash === '#portfolio' || window.location.hash === '#portfolious') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.hash = '#portfolio';
                    window.dispatchEvent(new Event('hashchange'));
                  }
                }}
                className={`relative h-full flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                  isPortfolioActive
                    ? 'text-orange-500 font-extrabold'
                    : isLight
                      ? 'text-slate-800 hover:text-orange-600 font-bold'
                      : 'text-neutral-300 hover:text-white font-bold'
                }`}
              >
                {isPortfolioActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse"></span>
                )}
                <span>PORTFOLIO</span>
                {isPortfolioActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-orange-400 to-amber-400 rounded-t-full shadow-[0_0_12px_rgba(249,115,22,1)]"></span>
                )}
              </a>
            </div>
          </nav>

          {/* Right: LOG IN + Solid Rectangular GET STARTED Button */}
          <div className="hidden lg:flex items-center gap-8" onMouseEnter={() => setActiveDropdown(null)}>
            <a
              href="#login"
              onClick={() => {
                setActiveDropdown(null);
                setCurrentActive('login');
                if (window.location.hash === '#login') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.location.hash = '#login';
                  window.dispatchEvent(new Event('hashchange'));
                }
              }}
              className={`text-[12px] font-bold tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                currentActive === 'login'
                  ? 'text-orange-500 font-extrabold'
                  : isLight
                    ? 'text-slate-800 hover:text-orange-600'
                    : 'text-white hover:text-orange-400'
              }`}
            >
              LOG IN
            </a>
            <a
              href="#contact"
              onClick={() => {
                setActiveDropdown(null);
                setCurrentActive('contact');
                if (window.location.hash === '#contact') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.location.hash = '#contact';
                  window.dispatchEvent(new Event('hashchange'));
                }
              }}
              className={`${
                currentActive === 'contact'
                  ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.5)]'
                  : isLight
                    ? 'bg-slate-900 text-white hover:bg-orange-600'
                    : 'bg-white text-black hover:bg-orange-500 hover:text-white'
              } px-7 py-3.5 text-[12px] font-bold tracking-[0.14em] uppercase transition-all rounded-none cursor-pointer`}
            >
              GET STARTED
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-slate-900 hover:text-orange-600 hover:bg-slate-100' : 'text-white hover:text-orange-400 hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </header>

        {/* ===================================================================== */}
        {/* STATE 2: FLOATING CENTERED MEGA-MENU BOX                              */}
        {/* ===================================================================== */}
        {activeDropdown && NAV_DATA[activeDropdown] && (
          <div className="hidden lg:flex justify-center w-full pt-3 pb-8 px-6 animate-fadeIn">
            <div
              className={`relative w-full max-w-[980px] rounded-xl p-10 ${
                isLight
                  ? 'bg-white border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.15)] text-slate-900'
                  : 'bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] text-white'
              }`}
            >
              {/* Top Pointer Triangle */}
              <div
                className={`absolute -top-2 w-4 h-4 rotate-45 transition-all duration-300 ${
                  isLight
                    ? 'bg-white border-t border-l border-slate-200'
                    : 'bg-black border-t border-l border-white/10'
                } ${activeDropdown === 'ABOUT US' ? 'left-[46%]' : 'left-[55%]'}`}
              ></div>

              <div className="grid grid-cols-12 gap-8 items-stretch">
                {/* Column 1: Left Category List */}
                <div className={`col-span-4 pr-6 flex flex-col justify-between border-r ${isLight ? 'border-slate-200' : 'border-white/15'}`}>
                  <div>
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      {NAV_DATA[activeDropdown].leftHeader}
                    </p>
                    <ul className="space-y-2.5">
                      {NAV_DATA[activeDropdown].items.map((item, idx) => {
                        const isSelected = idx === activeSubIndex;
                        return (
                          <li key={idx}>
                            <a
                              href={activeDropdown === 'ABOUT US' ? '#about' : '#services'}
                              onMouseEnter={() => setActiveSubIndex(idx)}
                              onClick={() => {
                                setActiveDropdown(null);
                                window.location.hash = activeDropdown === 'ABOUT US' ? '#about' : '#services';
                              }}
                              className={`block w-full text-left text-[15px] py-1 transition-colors ${
                                isSelected
                                  ? (isLight ? 'text-orange-600 font-semibold' : 'text-white font-semibold')
                                  : (isLight ? 'text-slate-600 hover:text-slate-900 font-normal' : 'text-neutral-400 hover:text-white font-normal')
                              }`}
                            >
                              {item.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Column 2: Middle "EXPLORE" Details & Pill Tags */}
                <div className="col-span-5 px-2 flex flex-col justify-between">
                  <div>
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      EXPLORE
                    </p>
                    <a
                      href={activeDropdown === 'ABOUT US' ? '#about' : '#services'}
                      onClick={() => {
                        setActiveDropdown(null);
                        window.location.hash = activeDropdown === 'ABOUT US' ? '#about' : '#services';
                      }}
                      className={`inline-flex items-center gap-2 text-[17px] font-semibold transition-colors mb-3 group ${
                        isLight ? 'text-slate-900 hover:text-orange-600' : 'text-white hover:text-orange-400'
                      }`}
                    >
                      <span>{NAV_DATA[activeDropdown].items[activeSubIndex].title}</span>
                      <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <p className={`text-[14px] leading-relaxed mb-8 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                      {NAV_DATA[activeDropdown].items[activeSubIndex].desc}
                    </p>
                  </div>

                  {/* Pill Tags Grid at Bottom of Middle Column */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {NAV_DATA[activeDropdown].items[activeSubIndex].tags.map((tag, tIdx) => (
                      <a
                        key={tIdx}
                        href="#services"
                        onClick={() => {
                          setActiveDropdown(null);
                          window.location.hash = '#services';
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                          isLight
                            ? 'bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-700 border border-slate-200/80'
                            : 'bg-[#1A1A1A] hover:bg-orange-600 hover:text-white text-neutral-200'
                        }`}
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Column 3: Right Featured Vertical Image */}
                <div className="col-span-3 flex items-center">
                  <div className={`w-full h-[320px] rounded-lg overflow-hidden relative group ${isLight ? 'bg-slate-100' : 'bg-neutral-900'}`}>
                    <img
                      src={NAV_DATA[activeDropdown].items[activeSubIndex].image}
                      alt={NAV_DATA[activeDropdown].items[activeSubIndex].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Full-Screen Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden fixed top-[80px] left-0 right-0 bottom-0 z-50 flex flex-col justify-between overflow-y-auto overscroll-contain transition-all duration-300 ${
              isLight
                ? 'bg-white text-slate-900 border-t border-slate-200 shadow-2xl'
                : 'bg-[#0a0a0a] text-white border-t border-white/10 shadow-2xl'
            }`}
            style={{
              WebkitOverflowScrolling: 'touch',
              height: 'calc(100dvh - 80px)'
            }}
          >
            {/* Scrollable Nav Links Section */}
            <div className="px-6 py-6 space-y-6 flex-1">
              {/* HOME */}
              <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <a
                  href="#home"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentActive('home');
                    if (window.location.hash === '#home' || window.location.hash === '') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.location.hash = '#home';
                      window.dispatchEvent(new Event('hashchange'));
                    }
                  }}
                  className={`flex items-center justify-between text-sm font-bold tracking-[0.2em] uppercase py-2.5 px-3 rounded-lg transition-all ${
                    isHomeActive
                      ? 'text-orange-400 bg-orange-500/15 border border-orange-500/30'
                      : isLight ? 'text-slate-800 hover:text-orange-500' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isHomeActive && <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>}
                    HOME
                  </span>
                  {isHomeActive && <span className="text-[10px] font-mono tracking-widest text-orange-400 font-bold uppercase">ACTIVE</span>}
                </a>
              </div>

              {/* ABOUT US & SERVICES */}
              {['ABOUT US', 'SERVICES'].map((section) => {
                const isSectionActive = section === 'ABOUT US' ? isAboutActive : isServicesActive;
                return (
                  <div key={section} className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                    <a
                      href={section === 'ABOUT US' ? '#about' : '#services'}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setCurrentActive(section === 'ABOUT US' ? 'about' : 'services');
                        window.location.hash = section === 'ABOUT US' ? '#about' : '#services';
                        window.dispatchEvent(new Event('hashchange'));
                      }}
                      className={`flex items-center justify-between text-xs font-bold tracking-[0.2em] uppercase mb-3 py-2 px-3 rounded-lg transition-all ${
                        isSectionActive
                          ? 'text-orange-400 bg-orange-500/15 border border-orange-500/30'
                          : 'text-orange-500 hover:text-orange-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isSectionActive && <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>}
                        {section}
                      </span>
                      {isSectionActive && <span className="text-[10px] font-mono tracking-widest text-orange-400 font-bold uppercase">ACTIVE</span>}
                    </a>
                    <div className="grid grid-cols-1 gap-2 pl-3">
                      {NAV_DATA[section].items.map((item, i) => (
                        <a
                          key={i}
                          href={section === 'ABOUT US' ? '#about' : '#services'}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setCurrentActive(section === 'ABOUT US' ? 'about' : 'services');
                            window.location.hash = section === 'ABOUT US' ? '#about' : '#services';
                            window.dispatchEvent(new Event('hashchange'));
                          }}
                          className={`text-sm py-1.5 transition-colors flex items-center justify-between group ${
                            isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className="text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* PORTFOLIO */}
              <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <a
                  href="#portfolio"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentActive('portfolio');
                    window.location.hash = '#portfolio';
                    window.dispatchEvent(new Event('hashchange'));
                  }}
                  className={`flex items-center justify-between text-sm font-bold tracking-[0.2em] uppercase py-2.5 px-3 rounded-lg transition-all ${
                    isPortfolioActive
                      ? 'text-orange-400 bg-orange-500/15 border border-orange-500/30'
                      : isLight ? 'text-slate-800 hover:text-orange-500' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isPortfolioActive && <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>}
                    PORTFOLIO
                  </span>
                  {isPortfolioActive && <span className="text-[10px] font-mono tracking-widest text-orange-400 font-bold uppercase">ACTIVE</span>}
                </a>
              </div>
            </div>

            {/* Pinned Bottom Actions: [LOG IN] and [GET STARTED] */}
            <div className={`sticky bottom-0 p-5 sm:p-6 backdrop-blur-2xl border-t z-10 ${
              isLight
                ? 'bg-white/95 border-slate-200 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]'
                : 'bg-[#0a0a0a]/95 border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.6)]'
            }`}>
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                <a
                  href="#login"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentActive('login');
                    if (window.location.hash === '#login') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.location.hash = '#login';
                      window.dispatchEvent(new Event('hashchange'));
                    }
                  }}
                  className={`py-3.5 px-4 text-center text-xs font-bold uppercase tracking-[0.16em] border transition-all cursor-pointer flex items-center justify-center ${
                    currentActive === 'login'
                      ? 'border-orange-500 text-orange-400 bg-orange-500/15 font-extrabold'
                      : isLight
                        ? 'border-slate-300 text-slate-900 hover:border-orange-500 hover:text-orange-600 bg-slate-50'
                        : 'border-white/20 text-white hover:border-orange-500 hover:text-orange-400 bg-white/[0.04]'
                  }`}
                >
                  LOG IN
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentActive('contact');
                    if (window.location.hash === '#contact') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.location.hash = '#contact';
                      window.dispatchEvent(new Event('hashchange'));
                    }
                  }}
                  className={`py-3.5 px-4 text-center text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer flex items-center justify-center ${
                    currentActive === 'contact'
                      ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.5)]'
                      : isLight
                        ? 'bg-slate-900 text-white hover:bg-orange-600'
                        : 'bg-white text-black hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  GET STARTED
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
