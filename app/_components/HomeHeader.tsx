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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, FileText, HelpCircle } from "lucide-react";
import { signOut } from "next-auth/react";

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
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div className="absolute mb-8 mt-8 flex w-full justify-center overflow-hidden">
      <header className="flex w-[910px] items-center justify-between pl-[48px] pr-[48px]">
        <Image src={Logo} alt="Logo" height={56} />

        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] bg-background"
            aria-describedby="navigation-sheet-description"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <p id="navigation-sheet-description" className="sr-only">
                Navigation menu for accessing different sections of the website
              </p>
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map(({ href, label }) => {
                  // skip rendering dashboard link if user is not logged in
                  if (href === "/dashboard" && !(name && image && email)) {
                    return null;
                  }

                  return (
                    <SheetClose key={href} asChild>
                      <Link
                        href={href}
                        className={`flex items-center rounded-md px-4 py-2 text-lg transition-colors hover:bg-accent ${
                          pathname === href ||
                          (href === "/dashboard" && pathname === "/autoplay")
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetHeader>
            <div className="absolute bottom-0 left-0 right-0">
              {name && image && email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full">
                    <div className="px-1 pb-4">
                      <ProfileCard img={image} username={name} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    className="w-[200px] bg-background"
                  >
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8 rounded-sm">
                        <AvatarImage src={image} alt="Profile Picture" />
                        <AvatarFallback className="rounded-sm">
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs text-muted-foreground">
                          {email}
                        </span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help</span>
                    </DropdownMenuItem>
                    <Link href="/policy">
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />{" "}
                        <span>Terms & Privacy</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/dashboard/auth" className="block px-1 pb-4">
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
