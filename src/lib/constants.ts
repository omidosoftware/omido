export const COMPANY = {
  name: "Omido Software",
  tagline: "End-to-end software development",
  email: "info@omido.nl",
  phone: "+31 (0)6 1234 5678",
  location: "Regio Zuid-Holland, Nederland",
  url: "https://omido.nl",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Over Ons", href: "/over-ons" },
  { label: "Ons Werk", href: "/portfolio" },
  { label: "Diensten", href: "/diensten" },
  { label: "Contact", href: "/contact" },
] as const;
