export const categories = [
  { name: "Safety Helmet", icon: "⛑️" },
  { name: "Safety Shoes", icon: "👟" },
  { name: "Safety Gloves", icon: "🧤" },
  { name: "Reflective Vest", icon: "🦺" },
  { name: "Safety Goggles", icon: "🥽" },
  { name: "Respirator", icon: "😷" },
];

export const testimonials = [
  {
    text: "RevoShop has been our primary PPE supplier for 3 years. Quality is consistently excellent and delivery is always on time. Their corporate account management is outstanding.",
    name: "Budi Santoso",
    company: "PT Semen Indonesia – HSE Manager",
    initials: "BS",
  },
  {
    text: "The bulk pricing for our 800-person mining operation saves us significantly every quarter. Certified products give us confidence in compliance with K3 regulations.",
    name: "Sarah Wijaya",
    company: "PT Vale Indonesia – Safety Director",
    initials: "SW",
  },
  {
    text: "Fast response, genuine products, and competitive pricing. We equipped our entire 200-person construction crew through RevoShop. Highly recommended.",
    name: "Ahmad Fauzi",
    company: "Waskita Karya – Project Manager",
    initials: "AF",
  },
];

export const faqs: Record<string, { q: string; a: string }[]> = {
  Ordering: [
    {
      q: "How do I place a bulk/corporate order?",
      a: "Contact our corporate sales team via WhatsApp or email corporate@revoshop.co.id. We offer dedicated account management, custom quotes, and flexible payment terms for orders above Rp 10 juta.",
    },
    {
      q: "Can I order custom branded PPE?",
      a: "Yes! We offer logo printing and custom color options for most products with minimum order quantities.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept bank transfer, credit/debit cards, e-wallets, and COD for eligible areas. Corporate accounts can access NET-30 payment terms.",
    },
  ],
  Payment: [
    {
      q: "Is it safe to pay online on RevoShop?",
      a: "Yes. All transactions are secured with SSL encryption via PCI-DSS compliant payment partners.",
    },
    {
      q: "Do you offer corporate payment terms?",
      a: "Yes, verified corporate accounts with order history above Rp 50 juta can apply for NET-30 payment terms.",
    },
  ],
  Delivery: [
    {
      q: "How fast is shipping?",
      a: "Orders before 14:00 WIB are dispatched same day. Jabodetabek: 1-2 business days. Other cities: 2-5 business days.",
    },
    {
      q: "Do you ship nationally?",
      a: "Yes, we ship to all major cities across Indonesia using JNE, J&T, SiCepat, and others.",
    },
    {
      q: "Is free shipping available?",
      a: "Free shipping applies to orders above Rp 500,000 for standard delivery within Java.",
    },
  ],
  Returns: [
    {
      q: "What is your return policy?",
      a: "Products can be returned within 30 days if unused and in original packaging. Defective products: 90 days.",
    },
    {
      q: "How do I initiate a return?",
      a: "Contact customer service with your order number and photos of the item.",
    },
  ],
  Warranty: [
    {
      q: "What warranty comes with products?",
      a: "Most products carry a 1-year manufacturer warranty. Safety critical items carry 3-year warranty.",
    },
    {
      q: "How do I claim warranty?",
      a: "Contact our warranty team with order number and defect description.",
    },
  ],
};
