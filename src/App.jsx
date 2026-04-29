import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-kora-black text-kora-cream">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border border-kora-gold/30 border-t-kora-gold" />
        <p className="font-body text-sm uppercase tracking-[0.35em] text-kora-muted">
          Chargement
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CatalogPage />} />
          <Route path="/produit/:slug" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
