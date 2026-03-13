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
  title: "Dr. Kalekar Star Clinic - Best Orthopedic & Gynecologist in Wakad, Pune | Expert Healthcare",
  description:
    "Leading orthopedic surgeon & gynecologist in Wakad, Pune. Dr. Rahul Kalekar (Orthopedic) & Dr. Aparna Kalekar (Gynecology). Expert treatment for joint pain, PCOS, pregnancy care, fractures. Book appointment online.",
  keywords: [
    "orthopedic doctor Wakad",
    "gynecologist Wakad Pune",
    "Dr. Rahul Kalekar orthopedic surgeon",
    "Dr. Aparna Kalekar gynecologist",
    "best orthopedic clinic Wakad",
    "women's health clinic Pune",
    "joint pain treatment Wakad",
    "PCOS treatment Pune",
    "pregnancy care Wakad",
    "fracture treatment Pune",
    "knee pain specialist Wakad",
    "laparoscopic surgeon Pune",
    "sports injury doctor Wakad",
    "gynecology consultation Pune",
    "orthopedic hospital near me",
    "best gynecologist near Wakad"
  ],
  authors: [{ name: "Dr. Kalekar Star Clinic" }],
  creator: "Dr. Kalekar Star Clinic",
  publisher: "Dr. Kalekar Star Clinic",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL('https://drkalekarstarclinic.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://drkalekarstarclinic.com',
    siteName: 'Dr. Kalekar Star Clinic',
    title: 'Dr. Kalekar Star Clinic - Best Orthopedic & Gynecologist in Wakad, Pune',
    description: 'Expert orthopedic & gynecology care in Wakad, Pune. Dr. Rahul Kalekar (Orthopedic Surgeon) & Dr. Aparna Kalekar (Gynecologist). Book appointment online.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Kalekar Star Clinic - Orthopedic & Gynecology Specialists in Wakad, Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Kalekar Star Clinic - Best Orthopedic & Gynecologist in Wakad',
    description: 'Expert orthopedic & gynecology care in Wakad, Pune. Book appointment with Dr. Rahul Kalekar & Dr. Aparna Kalekar.',
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
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
