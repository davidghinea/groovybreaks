"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

type PlaylistType = { name: string; id: string; image: string };

export default function Combobox({
  playlistData,
}: {
  playlistData: PlaylistType[];
}) {
  // gets passed this fetched playlist data to populate the combobox
  // we don't fetch the data here directly since this is a client component
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[76px] w-[350px] justify-between md:w-[600px]"
        >
          {id
            ? playlistData.find((playlist: PlaylistType) => playlist.id === id)
                ?.name
            : "Select playlist..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[272px] w-[350px] p-0 md:w-[600px]">
        <Command>
          <CommandInput placeholder="Search playlist..." />
          <CommandList>
            <CommandEmpty>No playlist found.</CommandEmpty>
            <CommandGroup>
              {playlistData.map((playlist: PlaylistType) => (
                <CommandItem
                  key={playlist.id}
                  className="text-lg md:text-base"
                  onSelect={() => {
                    setId(playlist.id);
                    setOpen(false);
                    router.push(
                      pathname +
                        "?" +
                        createQueryString("id", `${playlist.id}`),
                    );
                    // push the playlist id into the search parameters so we can access that value in the server-side parent
                    router.refresh();
                    // revalidate the path so the selection is updated in the server-side parent
                  }}
                >
                  <Image
                    src={playlist.image}
                    alt={`Image of the playlist ${playlist.name}`}
                    width={64}
                    height={64}
                    className="mr-4"
                  />
                  {playlist.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Not much to explain about this code, it's mostly the basic combobox from shadcn.
// https://ui.shadcn.com/docs/components/combobox
