import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import HomeHeader from "./_components/HomeHeader";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Toaster } from "@/components/ui/toaster";

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Groovy Breaks",
  description:
    "Stream a handpicked selection of music during your study breaks.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <HomeHeader
            name={session?.user?.name}
            image={session?.user?.image}
            email={session?.user?.email}
          />
          {/* Passing session details to Header for the User Profile Card */}
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
