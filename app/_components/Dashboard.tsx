"use server";

import React from "react";
import { getUserPlaylists } from "@/lib/userFunctions";
import { Session } from "next-auth";

import Combobox from "./PlaylistCombobox";
import { SearchParamsType } from "@/lib/types";
import { playlistDataType, UserPlaylistType } from "@/lib/types";

export default async function Dashboard({
  session,
  searchParams,
}: {
  session: Session;
  searchParams: SearchParamsType;
}): Promise<JSX.Element> {
  // added searchParams here which gets passed down from the page
  const accessToken = session?.user?.accessToken ?? null;
  const fetchPlaylists = (await getUserPlaylists(accessToken)) ?? null;

  if ("status" in fetchPlaylists) {
    throw new Error(`Failed to fetch playlists: ${fetchPlaylists.message}`);
  }

  const selectedPlaylistId = searchParams?.id; // gets the id of the selected playlist from the combobox using the search params

  const playlistData: playlistDataType[] = [];
  fetchPlaylists.items.forEach((playlist: UserPlaylistType) => {
    playlistData.push({
      name: playlist.name,
      id: playlist.id,
      image: playlist.images?.[0]?.url ?? "", // to add a default playlist image in the public to access here
    });
  });

  return (
    <div className="relative top-[200px] flex w-full flex-col items-center justify-center">
      <Combobox playlistData={playlistData} />
      <h1 className="mt-8 max-w-[350px] text-center text-2xl font-normal md:max-w-[425px] md:text-4xl">
        {selectedPlaylistId}
      </h1>
    </div>
  );
}
