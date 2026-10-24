function Footer() {
  return (
    <footer id="site-footer" className="bg-black text-neutral-400 py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 rounded bg-orange-600 flex items-center justify-center text-white font-black text-sm">
              H
            </div>
            <span className="text-lg font-bold tracking-[0.18em] text-white uppercase">
              HAKA<span className="text-orange-500">SOLUTIONS</span>
            </span>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
            Technology • Digital Solutions • Business Growth. Helping organizations operate smarter and scale faster.
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Union Bank Back Side, Kattupudi Street,<br />
            Pallikonda 635809
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#about" onClick={() => { if (window.location.hash === '#about') { window.scrollTo({ top: 0, behavior: 'smooth' }); } else { window.location.hash = '#about'; window.dispatchEvent(new Event('hashchange')); } }} className="hover:text-orange-500 transition-colors">About Us</a></li>
            <li><a href="#portfolio" onClick={() => { if (window.location.hash === '#portfolio') { window.scrollTo({ top: 0, behavior: 'smooth' }); } else { window.location.hash = '#portfolio'; window.dispatchEvent(new Event('hashchange')); } }} className="hover:text-orange-500 transition-colors">Portfolio</a></li>
            <li><a href="#careers" className="hover:text-orange-500 transition-colors">Careers</a></li>
            <li><a href="#leadership" className="hover:text-orange-500 transition-colors">Leadership</a></li>
            <li><a href="#contact" onClick={() => { if (window.location.hash === '#contact') { window.scrollTo({ top: 0, behavior: 'smooth' }); } else { window.location.hash = '#contact'; window.dispatchEvent(new Event('hashchange')); } }} className="hover:text-orange-500 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">Solutions</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#services" className="hover:text-orange-500 transition-colors">Digital Operations</a></li>
            <li><a href="#services" className="hover:text-orange-500 transition-colors">Data Solutions</a></li>
            <li><a href="#services" className="hover:text-orange-500 transition-colors">Technology Solutions</a></li>
            <li><a href="#services" className="hover:text-orange-500 transition-colors">Business Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">Connect</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#linkedin" className="hover:text-orange-500 transition-colors">LinkedIn</a></li>
            <li><a href="#instagram" className="hover:text-orange-500 transition-colors">Instagram</a></li>
            <li><a href="#whatsapp" className="hover:text-orange-500 transition-colors">WhatsApp</a></li>
            <li><a href="mailto:contact@hakasolutions.com" className="hover:text-orange-500 transition-colors">Email Us</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>© {new Date().getFullYear()} HAKA SOLUTIONS. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
