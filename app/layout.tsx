import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import HomeHeader from "./_components/HomeHeader";

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Groovy Breaks",
  description:
    "Stream a handpicked selection of music during your study breaks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HomeHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
