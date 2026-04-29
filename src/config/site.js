export const siteConfig = {
  brandName: "KORA IMPORT",
  tagline: "L'import direct à votre portée",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "228XXXXXXXX",
  email: import.meta.env.VITE_CONTACT_EMAIL || "contact@kora-import.com",
  city: "Lomé, Togo",
};

export function getDisplayWhatsApp(number = siteConfig.whatsappNumber) {
  if (number.includes("X")) {
    return "+228XXXXXXXX";
  }

  return number.startsWith("+") ? number : `+${number}`;
}
