"use server";

import { getPlaylistById } from "@/lib/userFunctions";

import { PlaylistItemsType, ApiError } from "@/lib/types";

import { CircleOffIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PlayButton from "./PlayButton";

import Image from "next/image";

export default async function Playlist({
  playlistId,
  accessToken,
}: {
  playlistId: string;
  accessToken: string;
}): Promise<JSX.Element> {
  const playlistData = await getPlaylistById(accessToken, playlistId);
  return (
    <Table className="mt-8">
      {/* <TableCaption className="mb-8 mt-1">Load more...</TableCaption> */}
      {/* not functional yet */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {playlistData.items
          .filter((item) => item.track !== null) // i encountered the track being null myself, although the spotify docs don't mention it.
          .map((item) => (
            <TableRow key={item.track!.id}>
              <TableCell>
                <div className="relative flex h-[56px] w-[56px] items-center justify-center">
                  <div className="absolute z-10 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-300 hover:bg-black hover:bg-opacity-50 hover:opacity-100">
                    {typeof item.track!.preview_url === "string" &&
                    item.track!.preview_url ? (
                      <PlayButton previewurl={item.track!.preview_url} />
                    ) : (
                      <CircleOffIcon className="cursor-not-allowed" />
                    )}
                  </div>
                  <Image
                    src={item.track!.album.images[0].url}
                    alt="playlist img"
                    width={128}
                    height={128}
                    className="absolute h-full w-full"
                  />
                </div>
              </TableCell>
              <TableCell>{item.track!.name}</TableCell>
              <TableCell>
                {item.track!.artists.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell className="text-right">
                {Math.floor(item.track!.duration_ms / 60000)}:
                {(item.track!.duration_ms % 60000) / 1000 < 10 ? "0" : ""}
                {((item.track!.duration_ms % 60000) / 1000).toFixed(0)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
