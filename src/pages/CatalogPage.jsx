import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import OrderDrawer from "../components/OrderDrawer";
import SectionHeading from "../components/SectionHeading";
import { categories, products } from "../data/products";

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [priceLimit, setPriceLimit] = useState(50000);
  const [stockOnly, setStockOnly] = useState(true);
  const [drawerProduct, setDrawerProduct] = useState(null);

  const origins = useMemo(() => ["all", ...new Set(products.map((product) => product.origin))], []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesOrigin = selectedOrigin === "all" || product.origin === selectedOrigin;
        const matchesPrice = product.unitPrice.FCFA <= priceLimit;
        const matchesStock = !stockOnly || product.inStock;
        return matchesCategory && matchesOrigin && matchesPrice && matchesStock;
      }),
    [priceLimit, selectedCategory, selectedOrigin, stockOnly],
  );

  return (
    <div className="px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Catalogue"
          title="Des lots prêts à convertir"
          body="Masonry grid, filtres utiles et commande en drawer sans casser le rythme du parcours."
        />

        <div className="glass-panel mt-10 grid gap-5 rounded-[2rem] p-5 md:grid-cols-4">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-kora-muted">Catégorie</span>
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="field-input">
              <option value="all">Toutes</option>
              {categories.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-kora-muted">Origine</span>
            <select value={selectedOrigin} onChange={(event) => setSelectedOrigin(event.target.value)} className="field-input">
              {origins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin === "all" ? "Toutes" : origin}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-kora-muted">Prix max ({priceLimit} FCFA)</span>
            <input
              type="range"
              min="2000"
              max="50000"
              step="500"
              value={priceLimit}
              onChange={(event) => setPriceLimit(Number(event.target.value))}
              className="w-full accent-kora-gold"
            />
          </label>

          <label className="flex items-end gap-3 rounded-[1.4rem] border border-kora-cream/10 bg-black/20 p-4">
            <input type="checkbox" checked={stockOnly} onChange={() => setStockOnly((current) => !current)} className="mt-1 accent-kora-gold" />
            <span className="text-sm uppercase tracking-[0.22em] text-kora-cream/80">Afficher uniquement le stock disponible</span>
          </label>
        </div>

        <div className="masonry-columns mt-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOrder={setDrawerProduct} />
          ))}
        </div>
      </div>

      <OrderDrawer product={drawerProduct} open={Boolean(drawerProduct)} onClose={() => setDrawerProduct(null)} />
    </div>
  );
}
