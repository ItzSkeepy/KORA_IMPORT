import { siteConfig } from "../config/site";

export function buildWhatsAppUrl({ productName, qty, total, city }) {
  const message = `Bonjour ${siteConfig.brandName} 👋
Je souhaite commander :
- Produit : ${productName}
- Quantité : ${qty}
- Total estimé : ${total} FCFA
- Ma ville : ${city}
Merci !`;

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
