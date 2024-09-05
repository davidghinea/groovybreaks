import React from "react";
import { getUserPlaylists } from "@/lib/userFunctions";
import { Session } from "next-auth";
import Playlist from "./Playlist";

export default async function Dashboard({ session }: { session: Session }) {
  const fetchPlaylists = await getUserPlaylists(session?.user?.accessToken);
  return (
    <div>
      {/* TODO: make this as a combobox with the names of the playlists */}

      {/* {fetchPlaylists.total} - shows total playlist count, could be useful for 
      pagination but I don't think I'm gonna need it, since I might go with a combobox.*/}

      {fetchPlaylists.items.map((playlist: any) => (
        <Playlist
          key={playlist.id}
          img={playlist.images[0].url}
          name={playlist.name}
        />
      ))}
    </div>
  );
}
