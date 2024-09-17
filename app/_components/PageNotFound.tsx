"use client";

import React from "react";
import Link from "next/link";
import notFoundImage from "@/public/illustrations/notFound.svg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function PageNotFound() {
  const pathname = usePathname();
  return (
    <section className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center md:flex-row">
      <Image
        src={notFoundImage}
        alt="Log-in Image"
        className="w-[250px] md:mb-0 md:mr-16"
      />
      <div className="flex flex-col">
        <h1 className="mb-3 max-w-[400px] text-center text-2xl font-medium md:max-w-[500px] md:text-left md:text-4xl">
          Could not find page:{" "}
          <span className="block max-w-[320px] overflow-hidden truncate text-ellipsis whitespace-nowrap text-primary">
            "{pathname}".
          </span>
        </h1>
        <Link
          href="/"
          className="flex items-center justify-center text-center text-muted-foreground underline md:justify-start md:text-left"
        >
          <span>
            {" "}
            <ArrowRight className="mr-2 inline size-3" />
            Go to Home Page
          </span>
        </Link>
      </div>
    </section>
  );
}
