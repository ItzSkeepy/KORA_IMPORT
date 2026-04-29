import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getDisplayWhatsApp, siteConfig } from "../config/site";
import SectionHeading from "../components/SectionHeading";

function SuccessBurst() {
  const particles = useMemo(
    () => Array.from({ length: 16 }, (_, index) => ({ id: index, left: 50 + (Math.random() - 0.5) * 28 })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute top-1/2 h-2 w-2 rounded-full bg-kora-gold"
          style={{ left: `${particle.left}%` }}
          initial={{ y: 0, opacity: 0.9, scale: 1 }}
          animate={{ y: -180 - particle.id * 5, opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        />
      ))}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    request: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `Bonjour ${siteConfig.brandName} 👋
Nom: ${form.name}
Ville: ${form.city}
Téléphone: ${form.phone}
Besoin: ${form.request}`,
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, "_blank");
  }

  return (
    <div className="px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker="Contact"
          title="Parlons de votre prochain lot"
          body="Forme minimale, ambiance cinématique, puis redirection directe vers WhatsApp. EmailJS peut être branché ici ensuite sans changer l’UI."
          align="center"
        />
        <p className="mt-6 text-center text-sm uppercase tracking-[0.22em] text-kora-muted">
          WhatsApp direct: {getDisplayWhatsApp()}
        </p>

        <div className="glass-panel relative mt-12 overflow-hidden rounded-[2.5rem] p-6 md:p-10">
          {submitted ? <SuccessBurst /> : null}
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="field-wrap">
                <input name="name" value={form.name} onChange={handleChange} className="field-input" placeholder="Nom" required />
                <label className="field-label">Nom / Boutique</label>
              </div>
              <div className="field-wrap">
                <input name="city" value={form.city} onChange={handleChange} className="field-input" placeholder="Ville" required />
                <label className="field-label">Ville</label>
              </div>
            </div>

            <div className="field-wrap">
              <input name="phone" value={form.phone} onChange={handleChange} className="field-input" placeholder="Téléphone" required />
              <label className="field-label">Téléphone</label>
            </div>

            <div className="field-wrap">
              <textarea
                name="request"
                value={form.request}
                onChange={handleChange}
                rows="5"
                className="field-input resize-none"
                placeholder="Votre besoin"
                required
              />
              <label className="field-label">Votre besoin</label>
            </div>

            <button
              type="submit"
              className="button-press inline-flex justify-center rounded-full bg-kora-gold px-7 py-4 text-sm uppercase tracking-[0.34em] text-black"
            >
              Envoyer la demande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
