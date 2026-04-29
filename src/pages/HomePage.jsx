import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "../components/LoadingScreen";
import SectionHeading from "../components/SectionHeading";
import { CategoryIconCanvas, HeroCanvas } from "../components/FloatingCanvas";
import { categories, products } from "../data/products";
import { useDeviceCapability } from "../hooks/useDeviceCapability";
import { formatMoney } from "../utils/currency";
import { buildWhatsAppUrl } from "../utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const whyStats = [
  { value: "Direct", label: "Import direct Turquie · Chine · Dubai" },
  { value: "3-4j", label: "Livraison express sur les meilleurs lots" },
  { value: "Grossiste", label: "Tarifs conçus pour la revente et la marge" },
  { value: "Varié", label: "Stock multi-catégories toute l’année" },
];

const showcaseProducts = products.slice(0, 6);

function ChapterFrame({ children, className = "" }) {
  return <section className={`chapter-shell ${className}`}>{children}</section>;
}

export default function HomePage() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const pricingRef = useRef(null);
  const whyRef = useRef(null);
  const showcaseRef = useRef(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeCurrency, setActiveCurrency] = useState("FCFA");
  const [loadingDone, setLoadingDone] = useState(false);
  const { isLowEnd } = useDeviceCapability();

  const titleWords = useMemo(() => ["L’import", "direct", "à", "votre", "portée"], []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadingDone(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!loadingDone) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(".hero-title-word", { yPercent: 110, opacity: 0 });
      gsap.set(".hero-subtitle", { y: 18, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".hero-title-word", { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1 })
        .to(".hero-subtitle", { y: 0, opacity: 1, duration: 1.2 }, "-=0.9");

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
        onUpdate: (self) => setHeroProgress(self.progress),
      });

      const categoryCards = gsap.utils.toArray(".category-card");
      const categoryTl = gsap.timeline({
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        },
      });
      categoryTl
        .fromTo(".category-word", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.25 })
        .to(".category-word", { opacity: 0.14, y: -80, duration: 0.25 })
        .fromTo(
          categoryCards,
          {
            opacity: 0,
            y: 100,
            x: (_, index) => (index % 2 === 0 ? -120 : 120),
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            stagger: 0.12,
            duration: 0.8,
          },
          "-=0.05",
        )
        .fromTo(".categories-cta", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      const pricingTl = gsap.timeline({
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
        },
      });
      pricingTl
        .fromTo(".price-start", { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.25, duration: 0.5 })
        .fromTo(".price-end", { opacity: 0, y: 60, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, "-=0.15")
        .fromTo(".currency-switch", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      const whyTl = gsap.timeline({
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true,
        },
      });
      whyTl.fromTo(".why-item", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.18 });
      whyTl.fromTo(".route-path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8 }, 0);

      const showcaseTrack = showcaseRef.current?.querySelector(".showcase-track");
      if (showcaseTrack) {
        gsap.to(showcaseTrack, {
          x: () => -(showcaseTrack.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
          },
        });
      }

      ScrollTrigger.create({
        trigger: showcaseRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        onUpdate: () => {
          gsap.utils.toArray(".showcase-card").forEach((card) => {
            const rect = card.getBoundingClientRect();
            const centerDelta = Math.abs(window.innerWidth / 2 - (rect.left + rect.width / 2));
            const focus = gsap.utils.clamp(0.85, 1, 1 - centerDelta / window.innerWidth);
            gsap.to(card, { scale: focus, duration: 0.6, overwrite: true });
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [loadingDone]);

  return (
    <div ref={rootRef} className="bg-kora-black">
      {!loadingDone ? <LoadingScreen onDone={() => setLoadingDone(true)} /> : null}

      <ChapterFrame>
        <div ref={heroRef} className="chapter-panel flex min-h-screen items-center">
          <div className="absolute inset-0 bg-gold-radial" />
          {!isLowEnd ? (
            <div className="absolute inset-0">
              <HeroCanvas progress={heroProgress} />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,152,42,0.18),transparent_28%)]" />
          )}

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-10 px-5 pb-14 pt-28 md:px-8">
            <div className="max-w-3xl">
              <p className="gold-kicker">KORA IMPORT</p>
              <h1 className="mt-5 font-display text-[4.8rem] uppercase leading-[0.86] tracking-[0.04em] text-kora-cream md:text-[10rem]">
                {titleWords.map((word, index) => (
                  <span key={index} className="hero-title-word mr-[0.18em] inline-block">
                    {word}
                  </span>
                ))}
              </h1>
              <p className="hero-subtitle mt-6 max-w-xl text-base leading-8 text-kora-cream/72 md:text-xl">
                Une expérience d’achat wholesale pensée comme un film: chaussures, vêtements, électronique et accessoires mis en scène avec des objets 3D flottants, un scroll lent, et un parcours de commande direct sur WhatsApp.
              </p>
            </div>

            <div className="hero-subtitle flex flex-wrap items-center gap-4">
              <Link
                to="/catalogue"
                className="button-press rounded-full bg-kora-gold px-6 py-4 text-sm uppercase tracking-[0.3em] text-black"
              >
                Voir le catalogue
              </Link>
              <a
                href={buildWhatsAppUrl({
                  productName: "Sélection wholesale",
                  qty: 20,
                  total: formatMoney(54000, "FCFA"),
                  city: "Lomé",
                })}
                target="_blank"
                rel="noreferrer"
                className="button-press rounded-full border border-kora-cream/20 px-6 py-4 text-sm uppercase tracking-[0.3em] text-kora-cream"
              >
                Commander maintenant
              </a>
            </div>
          </div>
        </div>
      </ChapterFrame>

      <ChapterFrame>
        <div ref={categoriesRef} className="chapter-panel flex min-h-screen items-center justify-center px-5 md:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,152,42,0.08),transparent_28%)]" />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="category-word pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[4rem] uppercase tracking-[0.2em] text-kora-cream/70 md:text-[8rem]">
              Chaussures
            </div>
            <div className="grid gap-6 pt-32 md:grid-cols-2">
              {categories.map((category) => (
                <motion.article key={category.key} className="category-card glass-panel grid min-h-[18rem] gap-4 rounded-[2rem] p-6 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="gold-kicker">Univers</p>
                      <h3 className="mt-4 font-display text-5xl uppercase leading-none">{category.label}</h3>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-kora-muted">{category.count} références prêtes au stock</p>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-kora-cream/72">
                        Cartes vitrées, mouvements lents, et un objet 3D flottant dédié pour faire sentir chaque catégorie avant même le clic.
                      </p>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30">
                    {!isLowEnd ? (
                      <CategoryIconCanvas type={category.key} />
                    ) : (
                      <div className="flex h-full min-h-[14rem] items-center justify-center">
                        <div className="h-24 w-24 rounded-full blur-3xl" style={{ background: category.accent, opacity: 0.6 }} />
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="categories-cta mt-10 flex justify-center">
              <Link
                to="/catalogue"
                className="button-press rounded-full border border-kora-gold/45 px-6 py-4 text-sm uppercase tracking-[0.34em] text-kora-cream"
              >
                Explorer les catégories
              </Link>
            </div>
          </div>
        </div>
      </ChapterFrame>

      <ChapterFrame>
        <div ref={pricingRef} className="chapter-panel flex min-h-screen items-center justify-center px-5 md:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,152,42,0.14),transparent_35%)]" />
          <div className="relative z-10 text-center">
            <p className="gold-kicker">Prix qui racontent la marge</p>
            <div className="price-start mt-8 font-display text-[4rem] uppercase leading-none text-kora-gold md:text-[10rem]">
              3 401 FCFA
            </div>
            <div className="price-end absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[3rem] uppercase leading-none text-kora-cream md:text-[7rem]">
              54 000 FCFA
              <span className="mt-3 block text-[1.5rem] text-kora-gold md:text-[2.4rem]">pour 20 pièces</span>
            </div>
            <div className="currency-switch mt-16 flex justify-center gap-3">
              {["FCFA", "USD", "GNF"].map((currency) => (
                <button
                  key={currency}
                  type="button"
                  onClick={() => setActiveCurrency(currency)}
                  className={`button-press rounded-full px-5 py-3 text-xs uppercase tracking-[0.3em] ${
                    activeCurrency === currency ? "bg-kora-gold text-black" : "border border-kora-cream/15 text-kora-cream"
                  }`}
                >
                  {currency}
                </button>
              ))}
            </div>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-kora-muted">
              Sneaker Atlas • {formatMoney(products[0].bulkPrices[0][activeCurrency] ?? products[0].unitPrice[activeCurrency], activeCurrency)} {activeCurrency}
            </p>
          </div>
        </div>
      </ChapterFrame>

      <ChapterFrame>
        <div ref={whyRef} className="chapter-panel flex min-h-screen items-center px-5 md:px-8">
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                kicker="Pourquoi Kora"
                title="Des routes claires. Des délais lisibles."
                body="On transforme la complexité d’approvisionnement en une narration simple: source, stock, coût, livraison, commande."
              />
              <div className="mt-12 space-y-5">
                {whyStats.map((stat) => (
                  <div key={stat.label} className="why-item rounded-[1.6rem] border border-kora-cream/10 bg-white/4 p-5">
                    <p className="font-display text-4xl uppercase text-kora-gold">{stat.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-kora-cream/80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel relative min-h-[32rem] overflow-hidden rounded-[2rem] p-6">
              <svg viewBox="0 0 900 650" className="h-full w-full">
                <defs>
                  <linearGradient id="routeStroke" x1="0%" x2="100%">
                    <stop offset="0%" stopColor="#C9982A" />
                    <stop offset="100%" stopColor="#F0EAD6" />
                  </linearGradient>
                </defs>
                <path d="M160 160 C300 60, 480 80, 620 200 S780 380, 700 520" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path
                  className="route-path"
                  d="M160 160 C300 60, 480 80, 620 200 S780 380, 700 520"
                  fill="none"
                  stroke="url(#routeStroke)"
                  strokeWidth="4"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
                <path d="M120 320 C240 290, 420 260, 570 330 S760 420, 690 540" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path
                  className="route-path"
                  d="M120 320 C240 290, 420 260, 570 330 S760 420, 690 540"
                  fill="none"
                  stroke="url(#routeStroke)"
                  strokeWidth="4"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
                <g fill="#F0EAD6">
                  <circle cx="160" cy="160" r="9" />
                  <circle cx="120" cy="320" r="9" />
                  <circle cx="700" cy="520" r="12" fill="#C9982A" />
                </g>
                <g fontSize="24" fill="#F0EAD6" fontFamily="DM Sans">
                  <text x="115" y="135">Turkey</text>
                  <text x="84" y="296">China</text>
                  <text x="720" y="524">Togo</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </ChapterFrame>

      <ChapterFrame>
        <div ref={showcaseRef} className="chapter-panel flex min-h-screen items-center overflow-hidden px-5 md:px-8">
          <div className="showcase-track flex gap-6 py-20">
            {showcaseProducts.map((product) => (
              <article
                key={product.id}
                className="showcase-card glass-panel flex h-[78vh] w-[82vw] max-w-[28rem] flex-shrink-0 flex-col overflow-hidden rounded-[2rem] md:w-[32rem]"
              >
                <img src={product.images[0]} alt={product.name} className="h-[68%] w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-kora-muted">{product.category}</p>
                    <h3 className="mt-3 font-display text-4xl uppercase leading-none">{product.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-kora-cream/70">{product.description}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-kora-gold/30 px-4 py-2 text-sm text-kora-gold">
                      {formatMoney(product.unitPrice.FCFA, "FCFA")} FCFA
                    </span>
                    <a
                      href={buildWhatsAppUrl({
                        productName: product.name,
                        qty: 20,
                        total: formatMoney(product.bulkPrices[0].FCFA, "FCFA"),
                        city: "Lomé",
                      })}
                      target="_blank"
                      rel="noreferrer"
                      className="button-press rounded-full bg-kora-gold px-4 py-3 text-xs uppercase tracking-[0.28em] text-black"
                    >
                      Commander
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ChapterFrame>

      <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,152,42,0.16),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-5xl rounded-[2.5rem] border border-kora-gold/20 bg-white/5 px-6 py-16 text-center backdrop-blur-xl md:px-14">
          <p className="gold-kicker">Finale</p>
          <h2 className="mt-5 font-display text-6xl uppercase leading-none text-kora-cream md:text-[7rem]">
            Prêt à commander ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-kora-cream/72 md:text-lg">
            Une sélection wholesale qui se découvre comme une histoire et se convertit en commande sans friction.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href={buildWhatsAppUrl({
                productName: "Panier KORA IMPORT",
                qty: 20,
                total: formatMoney(54000, "FCFA"),
                city: "Lomé",
              })}
              target="_blank"
              rel="noreferrer"
              className="button-press animate-pulse rounded-full bg-kora-gold px-8 py-5 text-sm uppercase tracking-[0.34em] text-black"
            >
              WhatsApp commande
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
