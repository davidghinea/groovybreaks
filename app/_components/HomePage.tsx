import Image from "next/image";
import { Button } from "@/components/ui/button";
import creativeImage from "@/public/why ilustration.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function HomePage(): Promise<JSX.Element> {
  const session = await getServerSession(options);
  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center md:flex-row">
      <Image
        src={creativeImage}
        alt="creative"
        className="mb-8 w-[250px] md:mb-0 md:mr-16"
      ></Image>{" "}
      <main className="flex flex-col items-center md:items-start">
        <h1 className="mb-4 max-w-[400px] text-center text-4xl font-semibold md:max-w-[500px] md:text-left md:text-5xl md:font-bold">
          Connect Through Music and enhance your{" "}
          <span className="text-primary">Study Breaks</span>.
        </h1>
        <p className="mb-8 max-w-[350px] text-center text-muted-foreground md:max-w-[300px] md:text-left">
          Stream a handpicked selection of music during your study breaks.
        </p>

        <Button className="w-[250px] p-4 md:w-fit" asChild>
          <Link href="/dashboard/auth">
            {session?.user ? "View Dashboard" : "Log In"}
            <ArrowRight className="ml-4 size-4" />
          </Link>
        </Button>
      </main>
    </div>
  );
}
