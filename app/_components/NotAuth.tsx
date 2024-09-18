import React from "react";
import Link from "next/link";
import logInImage from "@/public/illustrations/logIn.svg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
export default function NotAuth() {
  return (
    <section className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center md:flex-row">
      <Image
        src={logInImage}
        alt="Log-in Image"
        className="w-[250px] md:mb-0 md:mr-16"
      />
      <div className="flex flex-col">
        <h1 className="mb-3 max-w-[400px] text-center text-2xl font-medium md:max-w-[500px] md:text-left md:text-4xl">
          Please <span className="text-primary">Log In</span> to view this page.
        </h1>
        <Link
          href="dashboard/auth"
          className="flex items-center justify-center text-center text-muted-foreground underline md:justify-start md:text-left"
        >
          <span>
            {" "}
            <ArrowRight className="mr-2 inline size-3" />
            Click here
          </span>
        </Link>
      </div>
    </section>
  );
}
