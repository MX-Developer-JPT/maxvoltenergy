import { SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";

// JSON-LD structured data for SEO + GEO (generative engine optimization).
// Helps Google rich results and AI answer engines understand the business.
export default function StructuredData() {
  const reviewCount = TESTIMONIALS.length;
  const ratingValue = (
    TESTIMONIALS.reduce((s, t) => s + (t.rating || 5), 0) / Math.max(1, reviewCount)
  ).toFixed(1);
  const reviews = TESTIMONIALS.map((t) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: String(t.rating || 5), bestRating: "5" },
    author: { "@type": "Person", name: t.name },
    reviewBody: t.content,
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: "Maxvolt Energy Industries Limited",
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/images/logo.webp`,
        description: SITE_CONFIG.description,
        foundingDate: "2019",
        email: SITE_CONFIG.email,
        telephone: "+91-120-4291595",
        sameAs: [
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.linkedin,
          SITE_CONFIG.social.youtube,
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "E 82, Bulandshahr Road Industrial Area",
          addressLocality: "Ghaziabad",
          addressRegion: "Uttar Pradesh",
          postalCode: "201009",
          addressCountry: "IN",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_CONFIG.url}/#localbusiness`,
        name: "Maxvolt Energy Industries Limited",
        image: `${SITE_CONFIG.url}/images/logo.webp`,
        url: SITE_CONFIG.url,
        telephone: "+91-120-4291595",
        priceRange: "₹₹",
        areaServed: "India",
        address: {
          "@type": "PostalAddress",
          streetAddress: "E 82, Bulandshahr Road Industrial Area",
          addressLocality: "Ghaziabad",
          addressRegion: "Uttar Pradesh",
          postalCode: "201009",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 28.67, longitude: 77.45 },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue,
          reviewCount: String(reviewCount),
          bestRating: "5",
        },
        review: reviews,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: "Maxvolt Energy",
        publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
