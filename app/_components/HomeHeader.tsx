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

        <div>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85dvw]">
              <SheetHeader>
                <nav className="mt-12 flex flex-col items-center gap-8">
                  {navLinks.map(({ href, label }) => (
                    <SheetClose key={href}>
                      <Link
                        href={href}
                        className={`text-left text-2xl ${
                          pathname === href ? "" : "text-muted-foreground"
                        } hover:text-primary-foreground`}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetHeader>
              <div className="absolute bottom-0 left-0 m-[24px] h-[100px] w-[calc(100%-48px)]">
                {name && image ? (
                  <ProfileCard img={image} username={name} />
                ) : (
                  <Link href="/dashboard/auth">
                    <ProfileCard img={image} username={name} />
                  </Link>
                )}
                {/* To Do: If there is a session - a name and a profile picture,
                display a popover with the email and sign out button */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}
