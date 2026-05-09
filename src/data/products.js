const assetBase = import.meta.env.BASE_URL;
const productAsset = (path) => `${assetBase}${path}`;

const mediaLibrary = {
  chaussures: [productAsset("products/photos/shoes-premium.jpg"), productAsset("products/shoes-luxe.svg")],
  vêtements: [productAsset("products/photos/clothing-model.jpg"), productAsset("products/apparel-riviera.svg")],
  électronique: [productAsset("products/photos/phone-minimal.jpg"), productAsset("products/electronics-orbit.svg")],
  accessoires: [productAsset("products/photos/accessories-flatlay.jpg"), productAsset("products/accessories-aura.svg")],
};

function createProduct(id, name, category, origin, prices, badge, description) {
  const slug = `${name}-${id}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id,
    slug,
    name,
    category,
    origin,
    unitPrice: prices.unitPrice,
    bulkPrices: prices.bulkPrices,
    images: mediaLibrary[category],
    inStock: true,
    badge,
    description,
  };
}

export const products = [
  createProduct(
    1,
    "Sneaker Atlas",
    "chaussures",
    "Turquie",
    {
      unitPrice: { FCFA: 3401, USD: 5.6, GNF: 48300 },
      bulkPrices: [
        { qty: 20, FCFA: 54000, USD: 89 },
        { qty: 50, FCFA: 128000, USD: 210 },
      ],
    },
    "Promo",
    "Sneaker urbaine, finitions dorées et semelle légère pour revente rapide.",
  ),
  createProduct(
    2,
    "Derby Kasa",
    "chaussures",
    "Turquie",
    {
      unitPrice: { FCFA: 6800, USD: 11.2, GNF: 96400 },
      bulkPrices: [
        { qty: 20, FCFA: 108000, USD: 178 },
        { qty: 50, FCFA: 258000, USD: 425 },
      ],
    },
    null,
    "Chaussure habillée au rendu premium, idéale pour boutiques masculines.",
  ),
  createProduct(
    3,
    "Sandale Mina",
    "chaussures",
    "Chine",
    {
      unitPrice: { FCFA: 2800, USD: 4.6, GNF: 39800 },
      bulkPrices: [
        { qty: 20, FCFA: 45000, USD: 74 },
        { qty: 50, FCFA: 108000, USD: 178 },
      ],
    },
    "Nouveau",
    "Sandale légère, coloris faciles à écouler pendant les saisons chaudes.",
  ),
  createProduct(
    4,
    "Ensemble Ankara Soft",
    "vêtements",
    "Togo",
    {
      unitPrice: { FCFA: 7200, USD: 11.9, GNF: 102000 },
      bulkPrices: [
        { qty: 20, FCFA: 118000, USD: 194 },
        { qty: 50, FCFA: 288000, USD: 474 },
      ],
    },
    "Promo",
    "Set prêt-à-vendre au tombé fluide, pensé pour stock boutique multitailles.",
  ),
  createProduct(
    5,
    "Chemise Bosphore",
    "vêtements",
    "Turquie",
    {
      unitPrice: { FCFA: 5900, USD: 9.7, GNF: 83600 },
      bulkPrices: [
        { qty: 20, FCFA: 95000, USD: 156 },
        { qty: 50, FCFA: 228000, USD: 376 },
      ],
    },
    null,
    "Chemise coupe moderne, matière respirante et coloris premium.",
  ),
  createProduct(
    6,
    "Robe Amina",
    "vêtements",
    "Chine",
    {
      unitPrice: { FCFA: 8100, USD: 13.3, GNF: 114800 },
      bulkPrices: [
        { qty: 20, FCFA: 129000, USD: 212 },
        { qty: 50, FCFA: 312000, USD: 513 },
      ],
    },
    "Nouveau",
    "Robe festive au visuel fort, parfaite pour collections événementielles.",
  ),
  createProduct(
    7,
    "Smartphone Nova 6",
    "électronique",
    "Chine",
    {
      unitPrice: { FCFA: 48900, USD: 80.4, GNF: 693000 },
      bulkPrices: [
        { qty: 20, FCFA: 912000, USD: 1500 },
        { qty: 50, FCFA: 2210000, USD: 3630 },
      ],
    },
    "Promo",
    "Téléphone entrée/milieu de gamme au packaging retail prêt à l’export.",
  ),
  createProduct(
    8,
    "Écouteurs Halo",
    "électronique",
    "Chine",
    {
      unitPrice: { FCFA: 5200, USD: 8.6, GNF: 73700 },
      bulkPrices: [
        { qty: 20, FCFA: 83000, USD: 136 },
        { qty: 50, FCFA: 198000, USD: 326 },
      ],
    },
    null,
    "Écouteurs sans fil, forte rotation et forte marge sur comptoir.",
  ),
  createProduct(
    9,
    "Montre LED Orbit",
    "électronique",
    "Dubai",
    {
      unitPrice: { FCFA: 4400, USD: 7.2, GNF: 62300 },
      bulkPrices: [
        { qty: 20, FCFA: 70000, USD: 115 },
        { qty: 50, FCFA: 169000, USD: 278 },
      ],
    },
    "Nouveau",
    "Montre connectée accessible, look premium et emballage cadeau.",
  ),
  createProduct(
    10,
    "Sac Kora Carry",
    "accessoires",
    "Turquie",
    {
      unitPrice: { FCFA: 6300, USD: 10.4, GNF: 89300 },
      bulkPrices: [
        { qty: 20, FCFA: 102000, USD: 168 },
        { qty: 50, FCFA: 243000, USD: 400 },
      ],
    },
    "Promo",
    "Sac citadin polyvalent, finition simili premium pour points de vente urbains.",
  ),
  createProduct(
    11,
    "Ceinture Bronze",
    "accessoires",
    "Turquie",
    {
      unitPrice: { FCFA: 1900, USD: 3.1, GNF: 26900 },
      bulkPrices: [
        { qty: 20, FCFA: 30000, USD: 49 },
        { qty: 50, FCFA: 72000, USD: 118 },
      ],
    },
    null,
    "Ceinture classique mixte, achat d’impulsion parfait en caisse.",
  ),
  createProduct(
    12,
    "Lunettes Sahara",
    "accessoires",
    "Chine",
    {
      unitPrice: { FCFA: 3200, USD: 5.2, GNF: 45300 },
      bulkPrices: [
        { qty: 20, FCFA: 51000, USD: 84 },
        { qty: 50, FCFA: 124000, USD: 204 },
      ],
    },
    "Nouveau",
    "Lunettes mode avec bonne marge et multiples coloris.",
  ),
  createProduct(
    13,
    "Basket Pulse",
    "chaussures",
    "Chine",
    {
      unitPrice: { FCFA: 4100, USD: 6.7, GNF: 58100 },
      bulkPrices: [
        { qty: 20, FCFA: 65000, USD: 107 },
        { qty: 50, FCFA: 155000, USD: 255 },
      ],
    },
    null,
    "Modèle sport unisexe pour lots rapides et forte demande terrain.",
  ),
  createProduct(
    14,
    "Jogging Meridian",
    "vêtements",
    "Turquie",
    {
      unitPrice: { FCFA: 6700, USD: 11.0, GNF: 94900 },
      bulkPrices: [
        { qty: 20, FCFA: 106000, USD: 174 },
        { qty: 50, FCFA: 255000, USD: 419 },
      ],
    },
    null,
    "Ensemble casual premium, pensé pour revente boutique et live shopping.",
  ),
  createProduct(
    15,
    "Mini Speaker Kora Beat",
    "électronique",
    "Chine",
    {
      unitPrice: { FCFA: 7900, USD: 13.0, GNF: 111900 },
      bulkPrices: [
        { qty: 20, FCFA: 126000, USD: 207 },
        { qty: 50, FCFA: 302000, USD: 496 },
      ],
    },
    "Promo",
    "Enceinte compacte à forte attractivité visuelle, facile à exposer.",
  ),
  createProduct(
    16,
    "Bracelet Aura",
    "accessoires",
    "Dubai",
    {
      unitPrice: { FCFA: 1700, USD: 2.8, GNF: 24100 },
      bulkPrices: [
        { qty: 20, FCFA: 27000, USD: 44 },
        { qty: 50, FCFA: 64000, USD: 105 },
      ],
    },
    null,
    "Bracelet fashion pour ventes additionnelles et paniers mixtes.",
  ),
  createProduct(
    17,
    "Escarpin Lome Luxe",
    "chaussures",
    "Turquie",
    {
      unitPrice: { FCFA: 7600, USD: 12.5, GNF: 107800 },
      bulkPrices: [
        { qty: 20, FCFA: 120000, USD: 197 },
        { qty: 50, FCFA: 292000, USD: 480 },
      ],
    },
    "Nouveau",
    "Escarpin habillé pour collections cérémonies et boutiques féminines.",
  ),
  createProduct(
    18,
    "Polo Riviera",
    "vêtements",
    "Chine",
    {
      unitPrice: { FCFA: 3900, USD: 6.4, GNF: 55200 },
      bulkPrices: [
        { qty: 20, FCFA: 62000, USD: 102 },
        { qty: 50, FCFA: 149000, USD: 245 },
      ],
    },
    null,
    "Polo léger avec palette de couleurs rentable en pack grossiste.",
  ),
  createProduct(
    19,
    "Tablette Orion",
    "électronique",
    "Dubai",
    {
      unitPrice: { FCFA: 37800, USD: 62.2, GNF: 535600 },
      bulkPrices: [
        { qty: 20, FCFA: 704000, USD: 1158 },
        { qty: 50, FCFA: 1705000, USD: 2804 },
      ],
    },
    null,
    "Tablette multimédia, idéale pour lots semi-premium et revente régionale.",
  ),
  createProduct(
    20,
    "Portefeuille Mansa",
    "accessoires",
    "Turquie",
    {
      unitPrice: { FCFA: 2500, USD: 4.1, GNF: 35400 },
      bulkPrices: [
        { qty: 20, FCFA: 40000, USD: 66 },
        { qty: 50, FCFA: 96000, USD: 158 },
      ],
    },
    "Promo",
    "Portefeuille compact, bonne rotation en lots cadeaux et boutiques.",
  ),
];

export const categories = [
  { key: "chaussures", label: "Chaussures", count: 5, accent: "#C9982A" },
  { key: "vêtements", label: "Vêtements", count: 5, accent: "#D9B465" },
  { key: "électronique", label: "Électronique", count: 5, accent: "#9CC5D9" },
  { key: "accessoires", label: "Accessoires", count: 5, accent: "#D9A07D" },
];
