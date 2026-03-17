import { AuthProvider } from "@/hooks/useAuth";
import { ClientOnly } from "@/components/layout/ClientOnly";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { NotificationPrompt } from "@/components/pwa/NotificationPrompt";
import { PwaRegistry } from "@/components/pwa/PwaRegistry";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f766e",
};

export const metadata: Metadata = {
  title: "Best Gynecologist in Wakad | Dr. Aparna Kalekar | Kalekar's Star Ortho & Women Care Clinic",
  description:
    "Best Gynecologist in Wakad, Pune - Dr. Aparna Kalekar (MBBS, MS OBGY). Expert in pregnancy care, PCOD treatment, infertility, high-risk pregnancy, menstrual disorders. Orthopaedic care by Dr. Rahul Kalekar. Book appointment: 8073311622",
  keywords: [
    "gynecologist in Wakad",
    "best gynecologist Wakad Pune",
    "PCOD treatment Wakad",
    "PCOS treatment Wakad Pune",
    "pregnancy doctor Wakad",
    "pregnancy care Wakad Pune",
    "infertility doctor Wakad Pune",
    "women care clinic Wakad",
    "Dr. Aparna Kalekar gynecologist",
    "high-risk pregnancy care Wakad",
    "menstrual disorder treatment Wakad",
    "irregular period treatment Wakad",
    "obstetrician Wakad",
    "laparoscopic surgeon Wakad",
    "laparoscopic surgery Wakad Pune",
    "antenatal care Wakad",
    "gynaec doctor near me",
    "best obstetrician near me",
    "women's health clinic Wakad",
    "orthopedic doctor Wakad",
    "orthopedic doctor in Wakad Pune",
    "joint pain treatment Wakad",
    "knee pain treatment Wakad",
    "knee pain doctor Wakad Pune",
    "spine specialist Wakad",
    "back pain treatment Wakad Pune",
    "sciatica treatment Wakad",
    "sports injury treatment Wakad",
    "ACL injury treatment Wakad",
    "shoulder pain treatment Wakad",
    "frozen shoulder doctor Wakad",
    "Dr. Rahul Kalekar orthopedic",
    "Kalekar's Star Ortho Women Care Clinic Wakad"
  ],
  authors: [{ name: "Kalekar's Star Ortho & Women Care Clinic" }],
  creator: "Kalekar's Star Ortho & Women Care Clinic",
  publisher: "Kalekar's Star Ortho & Women Care Clinic",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL('https://drkalekarstarclinic.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: { url: '/logo.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://drkalekarstarclinic.com',
    siteName: 'Kalekar\'s Star Ortho & Women Care Clinic',
    title: 'Best Gynecologist in Wakad | Dr. Aparna Kalekar | Women\'s Healthcare',
    description: 'Best Gynecologist in Wakad, Pune - Dr. Aparna Kalekar. Expert in pregnancy care, PCOD treatment, infertility, high-risk pregnancy. Orthopaedic care by Dr. Rahul Kalekar. Call: 8073311622',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Kalekar\'s Star Ortho & Women Care Clinic - Best Gynecologist in Wakad, Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Gynecologist in Wakad | Dr. Aparna Kalekar',
    description: 'Best Gynecologist in Wakad, Pune - Dr. Aparna Kalekar. Pregnancy care, PCOD treatment, infertility consultation. Call: 8073311622',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "411441516583-bjoh4r8c74js28hmj2crjp17ckp6chbf.apps.googleusercontent.com";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Wakad, Pune" />
        <meta name="geo.position" content="18.6123;73.7654" />
        <meta name="ICBM" content="18.6123, 73.7654" />
      </head>
      <body className={`${nunito.className} overflow-x-hidden`} suppressHydrationWarning>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ClientOnly>
            <AuthProvider>{children}</AuthProvider>
            <InstallPrompt />
            <NotificationPrompt />
            <PwaRegistry />
          </ClientOnly>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
