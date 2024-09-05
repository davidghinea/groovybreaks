"use server";

import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Dashboard from "../_components/Dashboard";

import Link from "next/link";

const page = async () => {
  const session = await getServerSession(options);
  // gets a modified session object which includes the accessToken => see the modification in ./api/auth/[...nextauth]/options.ts

  return session?.user ? (
    <Dashboard session={session} />
  ) : (
    <h1>
      You are not authentified{" "}
      <Link href="dashboard/auth" className="block underline">
        {" "}
        Click here.
      </Link>
    </h1>
    // This page needs to be styled soon.
  );
};

export default page;
