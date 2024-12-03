import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { pauseTrack } from "@/lib/userFunctions"; // Import the playTrack function
import { accessTokenType } from "@/lib/types";

export async function PUT() {
  try {
    const session = await getServerSession(options);
    const accessToken = session?.user?.accessToken as accessTokenType;
    // generate access token
    await pauseTrack(accessToken);
    // pass the generated access token to the pauseTrack server action
    return new Response("Track is paused", { status: 200 });
  } catch {
    return new Response("An error occurred while trying to pause the track", {
      status: 500,
    });
  }
  // TO DO: better error handling
}
