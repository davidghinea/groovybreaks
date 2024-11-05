"use client";

import React from "react";
import Logo from "@/public/transparentlogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import ProfileCard from "@/app/_components/ProfileCard";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HomeHeader({
  name,
  image,
  email,
}: {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
}): JSX.Element {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="absolute mb-8 mt-8 flex w-full justify-center overflow-hidden">
      <header className="flex w-[910px] items-center justify-between pl-[48px] pr-[48px]">
        <Image src={Logo} alt="Logo" height={56} />

        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-background">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map(({ href, label }) => (
                  <SheetClose key={href} asChild>
                    <Link
                      href={href}
                      className={`flex items-center rounded-md px-4 py-2 text-lg transition-colors hover:bg-accent ${
                        pathname === href
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetHeader>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {name && image ? (
                <ProfileCard img={image} username={name} />
              ) : (
                <Link href="/dashboard/auth" className="w-full">
                  <ProfileCard img={image} username="Sign In" />
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
