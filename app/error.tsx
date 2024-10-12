"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error }: { error: Error }) {
  const defaultErrorMessage = "An unexpected error occurred.";

  const getErrorContent = () => {
    const [errStatus, errMessage] = error.message.includes("|s:m|")
      ? error.message.split("|s:m|")
      : [500, defaultErrorMessage];
    if (errStatus === "401") {
      return {
        status: errStatus,
        message: "Your session expired.",
        buttonAction: () => signOut({ callbackUrl: "/dashboard/auth" }),
        buttonText: "Log In",
      };
    }
    return {
      status: errStatus,
      message: errMessage,
      buttonAction: () => window.location.reload(),
      buttonText: "Try Again",
    };
  };
  const { status, message, buttonAction, buttonText } = getErrorContent();

  return (
    <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
      <div className="flex flex-col gap-4">
        {message}
        <Button className="w-[100px] p-4" onClick={buttonAction}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
