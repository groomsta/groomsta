import "./globals.css";
import { Metadata, Viewport } from 'next';
import { Poppins, Montserrat } from "next/font/google";
import Providers from "@/components/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Groomsta - Premium Grooming',
    default: 'Groomsta - Premium Grooming. Anytime. Anywhere.',
  },
  description: 'Experience luxury grooming services at your home or in our premium salons. Professional stylists, verified partners, and seamless booking.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0C3C85',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} font - sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
