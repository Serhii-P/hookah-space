import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import AppContext from "@/components/AppContext";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  // weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Hookah space",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const session = getServerSession();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <AppContext session={session}>
            <Toaster />

            <Header />
            <main>{children}</main>
            <Footer />
          </AppContext>
        </Providers>
      </body>
    </html>
  );
}
