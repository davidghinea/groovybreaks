"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import SignInButton from "@/app/_components/SignInButton";
import Link from "next/link";

export default async function SignIn() {
  const session = await getServerSession(options);

  if (session?.user) {
    redirect("/dashboard/auth");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-[350px] border-primary/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold text-foreground">
            Connect with Spotify
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Link your Spotify account to use this app
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInButton />
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-xs text-muted-foreground">
            By connecting, you agree to our{" "}
            <Link href="/policy" className="text-primary hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
