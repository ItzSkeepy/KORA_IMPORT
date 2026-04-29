import { Outlet, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenisScroll } from "../hooks/useLenisScroll";
import { getDisplayWhatsApp, siteConfig } from "../config/site";

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/catalogue", label: "Catalogue" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <NavLink to="/" className="font-display text-3xl tracking-[0.22em] text-kora-cream">
          {siteConfig.brandName}
        </NavLink>
        <nav className="glass-panel hidden rounded-full px-2 py-2 md:flex md:gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `button-press rounded-full px-5 py-2 text-sm uppercase tracking-[0.28em] ${
                  isActive ? "bg-kora-gold text-black" : "text-kora-cream/82 hover:text-kora-cream"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="glass-panel flex h-12 w-12 items-center justify-center rounded-full md:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="font-display text-2xl text-kora-cream">{open ? "×" : "+"}</span>
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="mx-5 mt-1 rounded-[1.75rem] border border-kora-cream/10 bg-[#0d0b09]/94 p-4 backdrop-blur-xl md:hidden"
          >
            <div className="grid gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.28em] ${
                      isActive ? "bg-kora-gold text-black" : "text-kora-cream/82"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default function Layout() {
  const location = useLocation();
  useLenisScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const titles = {
      "/": `${siteConfig.brandName} | ${siteConfig.tagline}`,
      "/catalogue": `Catalogue | ${siteConfig.brandName}`,
      "/contact": `Contact | ${siteConfig.brandName}`,
    };

    document.title = titles[location.pathname] || siteConfig.brandName;
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-kora-black">
      <div className="noise-overlay" />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <footer className="border-t border-kora-cream/10 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-kora-cream/68 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.18em] text-kora-cream">{siteConfig.brandName}</p>
            <p className="mt-2 uppercase tracking-[0.2em] text-kora-muted">{siteConfig.tagline}</p>
          </div>
          <div className="space-y-1 text-left md:text-right">
            <p>{siteConfig.city}</p>
            <p>{siteConfig.email}</p>
            <p>WhatsApp: {getDisplayWhatsApp()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
