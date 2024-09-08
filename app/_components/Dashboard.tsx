"use server";

import React from "react";
import { getUserPlaylists } from "@/lib/userFunctions";
import { Session } from "next-auth";

import Combobox from "./PlaylistCombobox";

export type playlistDataType = { name: string; id: string; image: string };

export async function Dashboard({
  session,
  searchParams,
}: {
  session: Session;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Added searchParams here which gets passed down from the page

  const fetchPlaylists = await getUserPlaylists(session?.user?.accessToken);

  const idd = searchParams?.id; // gets the id of the selected playlist from the combobox using the search params

  const playlistData: playlistDataType[] = [];
  fetchPlaylists.items.forEach((playlist: any) => {
    playlistData.push({
      name: playlist.name,
      id: playlist.id,
      image: playlist.images[0].url,
    });
  });

  return (
    <div className="relative top-[200px] flex w-full flex-col items-center justify-center">
      <Combobox playlistData={playlistData} />
      <h1 className="mt-8 max-w-[350px] text-center text-2xl font-normal md:max-w-[425px] md:text-4xl">
        {idd}
      </h1>
    </div>
  );
}
