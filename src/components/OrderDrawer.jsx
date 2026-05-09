import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { formatMoney, getBulkPrice } from "../utils/currency";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export default function OrderDrawer({ product, open, onClose }) {
  const [qty, setQty] = useState(20);
  const [city, setCity] = useState("Lomé");

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const totalFcfa = useMemo(() => {
    if (!product) {
      return 0;
    }
    return getBulkPrice(product, qty, "FCFA");
  }, [product, qty]);

  const whatsappUrl = product
    ? buildWhatsAppUrl({
        productName: product.name,
        qty,
        total: formatMoney(totalFcfa, "FCFA"),
        city,
      })
    : "#";

  return (
    <AnimatePresence>
      {open && product ? (
        <>
          <motion.button
            type="button"
            aria-label="Fermer"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col overflow-y-auto border-l border-kora-cream/10 bg-[#0d0b09]/96 p-5 backdrop-blur-xl md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="gold-kicker">Commande rapide</p>
                <h3 className="mt-4 font-display text-4xl uppercase leading-none md:text-5xl">{product.name}</h3>
              </div>
              <button type="button" className="button-press rounded-full border border-kora-cream/20 px-4 py-2 text-sm" onClick={onClose}>
                Fermer
              </button>
            </div>

            <div className="mt-8 rounded-[2rem] border border-kora-gold/15 bg-white/5 p-4">
              <img src={product.images[0]} alt={product.name} className="h-64 w-full rounded-[1.5rem] object-cover md:h-72" loading="lazy" />
            </div>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm uppercase tracking-[0.22em] text-kora-muted">Quantité</span>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(event) => setQty(Number(event.target.value) || 1)}
                  className="field-input"
                  placeholder="Quantité"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm uppercase tracking-[0.22em] text-kora-muted">Ville</span>
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="field-input"
                  placeholder="Ville"
                />
              </label>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-kora-cream/10 bg-black/30 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-kora-muted">Total estimé</p>
              <p className="mt-2 font-display text-4xl uppercase text-kora-gold md:text-5xl">
                {formatMoney(totalFcfa, "FCFA")} FCFA
              </p>
            </div>

            <div className="mt-8 pb-4 md:pb-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="button-press inline-flex w-full items-center justify-center rounded-full bg-kora-gold px-6 py-4 text-center text-sm uppercase tracking-[0.28em] text-black"
              >
                Commander via WhatsApp
              </a>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
