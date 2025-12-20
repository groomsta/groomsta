import "./globals.css";
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

export const metadata = {
  title: "Groomsta - Premium Grooming. Anytime. Anywhere.",
  description: "Book expert home grooming or visit trusted partner salons across Delhi NCR.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
