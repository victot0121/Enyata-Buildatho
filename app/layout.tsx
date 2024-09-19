// app/layout.tsx
"use client";

import "./globals.css";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { PrivyProvider } from "@privy-io/react-auth";

// Load fonts with appropriate weights
const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const ibmPlexSerifFont = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interFont.variable} ${ibmPlexSerifFont.variable}`}>
      <PrivyProvider
        appId="cm188vbtd03rax4lj8r4yqzef"
        config={{
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "https://your-logo-url",
          },
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}
      >
        <body>{children}</body>
      </PrivyProvider>
    </html>
  );
}
