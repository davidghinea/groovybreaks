import React from "react";
import Logo from "@/public/transparentlogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function HomeHeader(): JSX.Element {
  return (
    <div className="absolute mb-8 mt-8 flex w-full justify-center overflow-hidden">
      <header className="flex w-[910px] items-center justify-between pl-[48px] pr-[48px]">
        <Image src={Logo} alt="Logo" height={56}></Image>

        <nav className="hidden sm:flex sm:items-center sm:gap-8">
          <Link href="/">
            <h3>Home</h3>
          </Link>
          <Link href="/about">
            <h3>About</h3>
          </Link>
        </nav>
        <nav className="sm:hidden">
          <Menu />
        </nav>
      </header>
    </div>
  );
}

// Hamburger menu is unfunctional atm - TO DO
// https://ui.shadcn.com/docs/components/sheet
