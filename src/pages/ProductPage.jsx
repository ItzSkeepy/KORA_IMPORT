import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductViewerCanvas } from "../components/FloatingCanvas";
import SectionHeading from "../components/SectionHeading";
import { products } from "../data/products";
import { useDeviceCapability } from "../hooks/useDeviceCapability";
import { formatMoney, getBulkPrice } from "../utils/currency";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export default function ProductPage() {
  const { slug } = useParams();
  const { isLowEnd } = useDeviceCapability();
  const product = products.find((entry) => entry.slug === slug) ?? products[0];
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [qty, setQty] = useState(20);
  const [city, setCity] = useState("Lomé");
  const [currency, setCurrency] = useState("FCFA");

  const total = useMemo(() => getBulkPrice(product, qty, currency), [currency, product, qty]);
  const totalFcfa = useMemo(() => getBulkPrice(product, qty, "FCFA"), [product, qty]);

  const whatsappUrl = buildWhatsAppUrl({
    productName: product.name,
    qty,
    total: formatMoney(totalFcfa, "FCFA"),
    city,
  });

  return (
    <div className="px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/catalogue" className="text-sm uppercase tracking-[0.3em] text-kora-muted">
          Retour catalogue
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-kora-cream/10 bg-white/5">
              <img src={activeImage} alt={product.name} className="h-[38rem] w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  className={`overflow-hidden rounded-[1.4rem] border ${activeImage === image ? "border-kora-gold" : "border-kora-cream/10"}`}
                  onClick={() => setActiveImage(image)}
                >
                  <img src={image} alt={product.name} className="h-44 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading kicker={product.category} title={product.name} body={product.description} />

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="glass-panel rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-kora-muted">Prix unitaire</p>
                <p className="mt-4 font-display text-5xl uppercase text-kora-gold">
                  {formatMoney(product.unitPrice.FCFA, "FCFA")} FCFA
                </p>
                <div className="mt-4 flex gap-2">
                  {["FCFA", "USD", "GNF"].map((code) => (
                    <button
                      key={code}
                      type="button"
                      className={`button-press rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] ${
                        currency === code ? "bg-kora-gold text-black" : "border border-kora-cream/10 text-kora-cream"
                      }`}
                      onClick={() => setCurrency(code)}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-kora-muted">Viewer 3D</p>
                <div className="mt-4 h-56 overflow-hidden rounded-[1.5rem] border border-kora-cream/10 bg-black/30">
                  {!isLowEnd ? (
                    <ProductViewerCanvas category={product.category} />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-24 w-24 rounded-full bg-kora-gold/30 blur-3xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-panel mt-8 rounded-[2rem] p-6">
              <h3 className="font-display text-4xl uppercase">Calculateur</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="field-wrap">
                  <input value={qty} onChange={(event) => setQty(Number(event.target.value) || 1)} type="number" min="1" className="field-input" placeholder="Quantité" />
                  <label className="field-label">Quantité</label>
                </div>
                <div className="field-wrap">
                  <input value={city} onChange={(event) => setCity(event.target.value)} type="text" className="field-input" placeholder="Ville" />
                  <label className="field-label">Ville</label>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-kora-gold/20 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-kora-muted">Total live</p>
                <p className="mt-2 font-display text-5xl uppercase text-kora-cream">
                  {formatMoney(total, currency)} {currency}
                </p>
                <p className="mt-3 text-sm leading-7 text-kora-cream/65">
                  Le message WhatsApp est prérempli avec le produit, la quantité, le total estimé et votre ville.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="button-press mt-6 inline-flex rounded-full bg-kora-gold px-7 py-4 text-sm uppercase tracking-[0.32em] text-black"
              >
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
