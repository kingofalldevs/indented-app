import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indented FastLaunch — Launch Everywhere in Minutes",
  description: "Automated launch sequence for high-velocity founders. Submit your startup to 20+ premium directories like SaaSHub, Uneed, and AlternativeTo instantly.",
  keywords: [
    "startup directory submission",
    "fastlaunch",
    "indented",
    "submit startup",
    "saas directories",
    "saashub",
    "uneed",
    "alternativeto",
    "seo backlinks",
    "indie hacker launch",
    "submit tools",
    "startup seo automation"
  ],
  authors: [{ name: "Indented Team" }],
  openGraph: {
    title: "Indented FastLaunch — Launch Everywhere in Minutes",
    description: "Submit your startup to 20+ premium directories automatically. Boost your SEO, traffic, and domain authority instantly.",
    url: "https://indented.app/fastlaunch",
    siteName: "Indented",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://indented.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indented FastLaunch"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Indented FastLaunch — Launch Everywhere in Minutes",
    description: "Automate your product launch to 20+ directories in one click. Elevate your startup SEO.",
    creator: "@indentedapp",
    images: ["https://indented.app/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich SEO schema markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Indented FastLaunch",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": "Automated launch sequence for startups. Submit your product to 20+ top-tier directories (SaaSHub, Uneed, AlternativeTo) instantly to build backlinks and drive initial users.",
    "offers": [
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Trial — 1 Launch"
      },
      {
        "@type": "Offer",
        "price": "30.00",
        "priceCurrency": "USD",
        "name": "Pay Per Launch — 30+ High-Authority Sites"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://indented.app/fastlaunch" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
