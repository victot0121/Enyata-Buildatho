export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";


const inter = {
  fontFamily: 'Inter, sans-serif',
  src: 'url(/fonts/Inter-Regular.ttf) format("truetype")',
};

const ibmPlexSerif = {
  fontFamily: 'IBM Plex Serif, serif',
  src: 'url(/fonts/IBMPlexSerif-Regular.ttf) format("truetype")',
};


export const metadata: Metadata = {
  title: "FreshtechInnovationsLtd",
  description: "Freshtech Innovations Ltd",
  icons: {
    icon: '../assets/Logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.fontFamily || 'sans-serif'} ${ibmPlexSerif.fontFamily || 'serif'}`}>{children}</body>
    </html>
  );
}
