import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { playTrack } from "@/lib/userFunctions"; // Import the playTrack function
import { accessTokenType } from "@/lib/types";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    // get data from request body
    const session = await getServerSession(options);
    const accessToken = session?.user?.accessToken as accessTokenType;
    // generate the access token
    await playTrack(
      accessToken,
      data.playlistId,
      data.offsetPosition,
      data.positionMs,
      data.deviceId,
    );
    // pass the access token and data from request body to the playTrack server action
    return new Response("Track is playing", { status: 200 });
  } catch {
    return new Response("An error occurred while trying to play the track", {
      status: 500,
    });
  }
  // TO DO: better error handling
}
