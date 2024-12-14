"use server";

import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Dashboard from "../_components/Dashboard";
import { SearchParamsType } from "@/lib/types";

import NotAuth from "../_components/NotAuth";

export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}): Promise<JSX.Element> {
  const session = await getServerSession(options);
  // gets a modified session object which includes the accessToken => see the modification in ../api/auth/[...nextauth]/options.ts
  if (!session?.user) {
    return <NotAuth />;
  }

  return <Dashboard session={session} searchParams={searchParams} />;
}
