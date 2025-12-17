import "./globals.css";
// import { Inter } from "next/font/google"; // Skipping font optimization (mocking font) to avoid download issues for now, or use system font.
// const inter = Inter({ subsets: ["latin"] }); 

export const metadata = {
  title: "Groomsta Partner & Admin",
  description: "Manage your grooming business",
};

import Providers from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
