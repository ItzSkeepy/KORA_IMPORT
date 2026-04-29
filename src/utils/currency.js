export const currencies = ["FCFA", "USD", "GNF"];

export function formatMoney(value, currency) {
  const locales = {
    FCFA: "fr-FR",
    USD: "en-US",
    GNF: "fr-FR",
  };

  return new Intl.NumberFormat(locales[currency], {
    maximumFractionDigits: currency === "USD" ? 1 : 0,
  }).format(value);
}

export function getBulkPrice(product, qty, currency) {
  const sorted = [...product.bulkPrices].sort((a, b) => b.qty - a.qty);
  const tier = sorted.find((entry) => qty >= entry.qty);
  if (tier && tier[currency] != null) {
    return tier[currency];
  }
  return product.unitPrice[currency] * qty;
}
