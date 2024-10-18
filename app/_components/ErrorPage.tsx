import React from "react";

import errorImage from "@/public/illustrations/error.svg";
import Image from "next/image";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

export default function ErrorPage({
  message,
  status,
}: {
  message: string;
  status: number;
}) {
  const getErrorContent = () => {
    if (status === 401) {
      return {
        buttonAction: () => signOut({ callbackUrl: "/dashboard/auth" }),
        buttonText: "Log In",
      };
    }
    return {
      buttonAction: () => window.location.reload(),
      buttonText: "Try Again",
    };
  };

  const { buttonAction, buttonText } = getErrorContent();
  return (
    <section className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center md:flex-row">
      <Image
        src={errorImage}
        alt="Log-in Image"
        className="w-[250px] md:mb-0 md:mr-16"
      />
      <div className="flex flex-col items-center justify-center md:items-start">
        <h1 className="mb-2 max-w-[400px] text-center text-2xl font-medium md:max-w-[500px] md:text-left md:text-4xl">
          Oops! An <span className="text-primary">error</span> occured.
        </h1>

        <h2 className="mb-4 max-w-[250px] text-center text-muted-foreground md:max-w-[300px] md:text-left">
          {message}
        </h2>
        {status !== 429 && (
          <Button className="w-[125px] p-4 md:w-fit" onClick={buttonAction}>
            {buttonText}
            <ArrowRight className="ml-4 size-4" />
          </Button>
        )}
      </div>
    </section>
  );
}
