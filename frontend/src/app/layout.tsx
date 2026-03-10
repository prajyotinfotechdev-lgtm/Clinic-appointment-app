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
  title: "Star Ortho & Women Care — Appointment Management",
  description:
    "Modern clinic appointment management system for patients, doctors, and receptionists.",
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
