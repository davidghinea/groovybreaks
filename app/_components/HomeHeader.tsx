"use client";

import React from "react";
import Logo from "@/public/transparentlogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu, User2 } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomeHeader(): JSX.Element {
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
                <Link href="/signin">
                  <Card className="flex h-[100%] w-[100%] items-center pl-8">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full outline outline-1 outline-muted">
                      <User2 className="h-[28px] w-[28px]" />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="ml-6 mr-6 h-7"
                    />

                    <CardHeader className="pl-0">
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Log in to view profile.</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Navigation menu for mobile */}
      </header>
    </div>
  );
}
