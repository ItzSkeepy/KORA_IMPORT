import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/currency";

export default function ProductCard({ product, onOrder }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 14 });

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function resetTilt() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
      className="masonry-item glass-panel gold-outline overflow-hidden rounded-[2rem]"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link to={`/produit/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[1.8rem]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-[25rem] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-kora-gold px-3 py-1 text-xs uppercase tracking-[0.28em] text-black">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-kora-muted">{product.category}</p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-none">{product.name}</h3>
          </div>
          <p className="text-right text-sm text-kora-cream/70">{product.origin}</p>
        </div>

        <p className="text-sm leading-7 text-kora-cream/68">{product.description}</p>

        <div className="flex items-center justify-between">
          <p className="font-display text-3xl uppercase text-kora-gold">
            {formatMoney(product.unitPrice.FCFA, "FCFA")} FCFA
          </p>
          <button
            type="button"
            className="button-press rounded-full border border-kora-gold/40 px-4 py-2 text-xs uppercase tracking-[0.24em] text-kora-cream"
            onClick={() => onOrder(product)}
          >
            Commander
          </button>
        </div>
      </div>
    </motion.article>
  );
}
