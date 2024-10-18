"use client";

import ErrorComponent from "@/app/_components/ErrorPage";

export default function ErrorPage({ error }: { error: Error }) {
  const defaultErrorMessage = "A really unexpected error occurred.";

  const [rawStatus, rawMessage] = error.message.includes("|s:m|")
    ? error.message.split("|s:m|")
    : [500, defaultErrorMessage];

  const status = isNaN(Number(rawStatus)) ? 500 : Number(rawStatus);

  const message =
    typeof rawMessage === "string" ? rawMessage : defaultErrorMessage;

  return <ErrorComponent message={message} status={status} />;
}
