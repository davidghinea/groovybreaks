"use server";

import React from "react";
import { getUserPlaylists } from "@/lib/userFunctions";
import { getUserData } from "@/lib/userFunctions";
import { Session } from "next-auth";
import SubmitPlaylist from "./SubmitPlaylist";

import Combobox from "./PlaylistCombobox";
import { SearchParamsType } from "@/lib/types";
import { playlistDataType, UserPlaylistType } from "@/lib/types";
import Playlist from "./Playlist";

export default async function Dashboard({
  session,
  searchParams,
}: {
  session: Session;
  searchParams: SearchParamsType;
}): Promise<JSX.Element> {
  // added searchParams here which gets passed down from the page
  const accessToken = session?.user?.accessToken ?? null;
  const user = await getUserData(accessToken);
  const fetchPlaylists = (await getUserPlaylists(accessToken)) ?? null;

  const selectedPlaylistId = searchParams?.id ?? null; // gets the id of the selected playlist from the combobox using the search params

  const playlistData: playlistDataType[] = [];
  fetchPlaylists.items.forEach((playlist: UserPlaylistType) => {
    if (playlist && playlist.name && playlist.id && playlist.images) {
      playlistData.push({
        name: playlist.name,
        id: playlist.id,
        image: playlist.images[0]?.url ?? "", // to add a default playlist image in the public to access here
      });
    } // I don't know what spotify did, but now official playlists made by them will not show up in the application.
  });

  return (
    <div className="relative top-[200px] flex w-full flex-col items-center justify-center">
      <Combobox playlistData={playlistData} />
      {selectedPlaylistId &&
      accessToken &&
      typeof accessToken === "string" &&
      typeof selectedPlaylistId === "string" ? (
        <>
          <Playlist playlistId={selectedPlaylistId} accessToken={accessToken} />
          <SubmitPlaylist
            playlistName={
              playlistData.find(
                (playlist) => playlist.id === selectedPlaylistId,
              )?.name ?? ""
            }
            product={user.product}
          />
        </>
      ) : (
        <h1 className="mt-4">Select a playlist</h1>
      )}
    </div>
  );
}
