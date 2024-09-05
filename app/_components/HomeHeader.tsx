import React from "react";
import Logo from "@/public/transparentlogo.svg";
import Image from "next/image";
import Link from "next/link";

function HomeHeader() {
  return (
    <div className="absolute mb-8 mt-8 flex w-full justify-center overflow-hidden">
      <header className="flex w-[814px] items-center justify-between">
        <Image src={Logo} alt="Logo" height={56}></Image>

        <nav className="flex items-center gap-8">
          <Link href="/">
            <h3>Home</h3>
          </Link>
          <Link href="/about">
            <h3>About</h3>
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default HomeHeader;
