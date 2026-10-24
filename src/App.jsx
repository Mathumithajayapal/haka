import { useState, useEffect } from 'react'
import Home from './home'
import About from './about'
import Services from './service'
import Portfolio from './portfolio'
import Contact from './contact'
import Login from './login'

function App() {
  const isLoginRoute = (hash, path) =>
    hash === '#login' ||
    hash === '#/login' ||
    path === '/login';

  const isContactRoute = (hash, path) =>
    hash === '#contact' ||
    hash === '#/contact' ||
    path === '/contact';

  const isPortfolioRoute = (hash, path) =>
    hash === '#portfolio' ||
    hash === '#/portfolio' ||
    hash === '#portfolious' ||
    hash === '#/portfolious' ||
    path === '/portfolio' ||
    path === '/portfolious';

  const isServicesRoute = (hash, path) =>
    hash === '#service' ||
    hash === '#/service' ||
    hash === '#services' ||
    hash === '#/services' ||
    path === '/service' ||
    path === '/services';

  const isAboutRoute = (hash, path) =>
    hash === '#about' ||
    hash === '#/about' ||
    path === '/about';

  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (isLoginRoute(hash, path)) {
      return 'login';
    }
    if (isContactRoute(hash, path)) {
      return 'contact';
    }
    if (isServicesRoute(hash, path)) {
      return 'services';
    }
    if (isPortfolioRoute(hash, path)) {
      return 'portfolio';
    }
    if (isAboutRoute(hash, path)) {
      return 'about';
    }
    return 'home';
  });

  useEffect(() => {
    const updateRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (isLoginRoute(hash, path)) {
        setCurrentRoute('login');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (isContactRoute(hash, path)) {
        setCurrentRoute('contact');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (isServicesRoute(hash, path)) {
        setCurrentRoute('services');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (isPortfolioRoute(hash, path)) {
        setCurrentRoute('portfolio');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (isAboutRoute(hash, path)) {
        setCurrentRoute('about');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        setCurrentRoute('home');
        if (hash === '#home' || hash === '' || hash === '#/') {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        } else if (hash) {
          // If navigating from other pages to an anchor on home (e.g. #solutions)
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', updateRoute);
    window.addEventListener('popstate', updateRoute);

    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);

  return (
    <main>
      {currentRoute === 'about' ? (
        <About />
      ) : currentRoute === 'services' ? (
        <Services />
      ) : currentRoute === 'portfolio' ? (
        <Portfolio />
      ) : currentRoute === 'contact' ? (
        <Contact />
      ) : currentRoute === 'login' ? (
        <Login />
      ) : (
        <Home />
      )}
    </main>
  );
}

export default App
