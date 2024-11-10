import Image from "next/image";
import { Button } from "@/components/ui/button";
import creativeImage from "@/public/illustrations/whyIllustration.svg";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { Badge } from "@/components/ui/badge";

import { Music, Settings, Sparkles } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

export default async function HomePage(): Promise<JSX.Element> {
  const session = await getServerSession(options);
  return (
    <>
      <section className="mb-12 flex min-h-[650px] w-[100dvw] flex-col items-center justify-center md:mb-0 md:h-[85dvh] md:min-h-[500px] md:flex-row">
        <Image
          src={creativeImage}
          alt="creative"
          className="mb-4 mt-12 w-[250px] duration-1000 animate-in fade-in slide-in-from-left-3 md:mb-0 md:mr-16"
        />

        <main className="flex flex-col items-center md:items-start">
          <h1 className="mb-3 max-w-[400px] text-center text-4xl font-semibold duration-1000 animate-in fade-in slide-in-from-bottom-3 md:max-w-[500px] md:text-left md:text-5xl md:font-bold">
            Connect Through Music and enhance your{" "}
            <span className="text-primary">Study Breaks</span>.
          </h1>
          <p className="mb-6 max-w-[350px] text-center text-muted-foreground duration-1000 animate-in fade-in slide-in-from-bottom-4 md:max-w-[300px] md:text-left">
            Stream a handpicked selection of music during your study breaks.
          </p>

          <Button
            className="w-[250px] p-4 duration-1000 animate-in fade-in slide-in-from-bottom-5 md:w-fit"
            asChild
          >
            <Link href="/dashboard/auth">
              {session?.user ? "View Dashboard" : "Log In"}
              <ArrowRight className="ml-4 size-4" />
            </Link>
          </Button>
        </main>
      </section>
      <section className="flex w-[100dvw] justify-center pb-12">
        <div className="grid max-w-[400px] gap-6 md:max-w-[814px] md:grid-cols-3">
          <Card className="group relative overflow-hidden transition-transform duration-1000 ease-out animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-2 hover:shadow-lg hover:duration-150 group-hover:duration-150">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Music className="size-6 text-primary" />
                <span className="text-foreground">What We Do</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground transition-transform ease-out group-hover:scale-[1.02]">
                Play your favorite music during school breaks and help you stay
                focused.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden transition-transform duration-1000 ease-out animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-2 hover:shadow-lg hover:duration-150 group-hover:duration-150">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Settings className="size-6 text-primary" />
                <span className="text-foreground">How It Works</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground transition-transform ease-out group-hover:scale-[1.02]">
                Pick a playlist and set break times. We play your music during
                breaks automatically.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden transition-transform duration-1000 ease-out animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-2 hover:shadow-lg hover:duration-150 group-hover:duration-150">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Sparkles className="size-6 text-primary" />
                <span className="text-foreground">Why Use It</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground transition-transform ease-out group-hover:scale-[1.02]">
                Music connects people, makes breaks fun, and creates lasting
                memories.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="my-12 flex w-[100dvw] justify-center">
        <div className="bg-blue flex w-full max-w-[400px] md:max-w-[814px]">
          <div className="hidden h-full items-end py-8 pr-4 md:flex">
            <ArrowRight className="text-border" />
          </div>
          <Separator orientation="vertical" />
          <div className="w-full space-y-6 p-8">
            <div className="flex flex-col items-start">
              <h1 className="mb-3 text-left text-5xl font-bold tracking-tight text-foreground">
                Let's Get Your{" "}
                <span className="text-primary">Music Playing</span>.
              </h1>
              <p className="mb-6 text-left text-sm text-muted-foreground">
                <Clock size={16} className="inline-block align-text-bottom" /> 5
                min
              </p>
              <p className="max-w-[600px] pb-6 text-left text-base text-muted-foreground">
                To get started, you'll need a{" "}
                <span className="text-primary">Spotify Premium</span> account
                and a
                <span className="text-primary">
                  {" "}
                  connection to your hallway speakers
                </span>
                . Once you're set up, you can enjoy a seamless music experience
                during your study breaks.
              </p>
              <div className="flex flex-wrap items-start justify-start gap-3">
                <Badge
                  variant="outline"
                  className="bg-accent/10 text-sm font-medium"
                >
                  Spotify Premium
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-accent/10 text-sm font-medium"
                >
                  Speakers
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-accent/10 text-sm font-medium"
                >
                  Music
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* here will be a step by step instruction on how to use the app with pictures when the project is finished */}

      <section className="mb-4 mt-24 flex w-[100dvw] justify-center">
        <div className="w-full max-w-[400px] text-right md:max-w-[814px]">
          <p className="mt-2 text-xs text-muted-foreground">
            The illustrations used in this project are provided by{" "}
            <Link
              href="https://www.streamlinehq.com/illustrations"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Streamline
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
