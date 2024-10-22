import React from "react";
import Logo from "@/public/transparentlogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85dvw]">
              <SheetHeader>
                <nav className="mt-12 flex flex-col items-center gap-8">
                  <SheetDescription className="text-left text-2xl hover:text-primary-foreground">
                    <Link href="/">Home</Link>
                  </SheetDescription>
                  <SheetDescription className="text-left text-2xl hover:text-primary-foreground">
                    <Link href="/about">About</Link>
                  </SheetDescription>
                  <SheetDescription className="text-left text-2xl hover:text-primary-foreground">
                    <Link href="/dashboard">Dashboard</Link>
                  </SheetDescription>
                </nav>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}

// Hamburger menu is unfunctional atm - TO DO
// https://ui.shadcn.com/docs/components/sheet

//I have a Cambridge C2 English Proficiency certificate
