import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onDone }) {
  const [visible, setVisible] = useState(true);
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 420,
        y: (Math.random() - 0.5) * 220,
      })),
    [],
  );

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        setVisible(false);
        onDone?.();
      },
    });

    tl.fromTo(
      ".loader-particle",
      { x: (_, target) => target.dataset.x, y: (_, target) => target.dataset.y, opacity: 0, scale: 0.4 },
      { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.02 },
    )
      .fromTo(".loader-ring", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35 }, "<0.05")
      .to(".loader-overlay", { opacity: 0, duration: 0.38, delay: 0.08 });

    return () => tl.kill();
  }, [onDone]);

  if (!visible) {
    return null;
  }

  return (
    <div className="loader-overlay fixed inset-0 z-50 flex items-center justify-center bg-kora-black">
      <div className="relative flex h-52 w-52 items-center justify-center">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="loader-particle absolute h-2 w-2 rounded-full bg-kora-gold shadow-[0_0_20px_rgba(201,152,42,0.9)]"
            data-x={particle.x}
            data-y={particle.y}
          />
        ))}
        <div className="loader-ring flex h-32 w-32 items-center justify-center rounded-full border border-kora-gold/40 bg-kora-gold/5 shadow-glow">
          <span className="font-display text-5xl tracking-[0.2em] text-kora-cream">K</span>
        </div>
      </div>
    </div>
  );
}
