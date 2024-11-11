"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function SubmitPlaylist({
  playlistName,
}: {
  playlistName: string | null | undefined;
}) {
  return (
    <section className="my-8 flex min-w-[350px] max-w-[350px] items-center justify-between space-x-4 rounded-sm bg-secondary p-3 shadow-md md:min-w-[600px] md:max-w-[600px]">
      <span className="text-sm font-medium text-secondary-foreground">
        The playlist {playlistName ? `"${playlistName}"` : ""} has been selected
      </span>
      <Button className="flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Groovify my break
        <ArrowUpRight className="size-4" />
      </Button>
    </section>
  );
}
