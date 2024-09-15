import {
  accessTokenType,
  UserDataType,
  UserPlaylistsType,
  ApiError,
  PlaylistItemsType,
} from "@/lib/types";

async function fetchData<T>(
  url: string,
  accessToken: accessTokenType,
): Promise<T | ApiError> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.error) {
        const apiError: ApiError = {
          status: errorResponse.error.status,
          message: errorResponse.error.message,
        };
        throw new Error(
          `Status ${apiError.status}, Message: ${apiError.message}`,
        );
      } else {
        throw new Error(`Unknown error. Status: ${response.status}`);
      }
    }

    const data: T = await response.json(); // Enforces type
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
// generic function that can be used to fetch most of the endpoints in spotify api
// error handling is made up to throw errors for the error.tsx page
// the errors from spotify are of type { error:{ status:number, message:string }}

export async function getUserData(
  accessToken: accessTokenType,
): Promise<UserDataType | ApiError> {
  const url = "https://api.spotify.com/v1/me";
  return await fetchData<UserDataType>(url, accessToken);
}

export async function getUserPlaylists(
  accessToken: accessTokenType,
): Promise<UserPlaylistsType | ApiError> {
  const userData = await getUserData(accessToken);
  if (!userData || "status" in userData) {
    return userData;
  }

  const url = `https://api.spotify.com/v1/users/${userData.id}/playlists?limit=50`;
  return await fetchData<UserPlaylistsType>(url, accessToken);
}

export async function getPlaylistById(
  accessToken: accessTokenType,
  playlistId: string,
): Promise<PlaylistItemsType | ApiError> {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5`;
  // await new Promise((resolve) => setTimeout(resolve, 2000)); - to check suspense (not implemented yet)
  return await fetchData<PlaylistItemsType>(url, accessToken);
}

// i recommend checking out "@/lib/types.tsx" to understand what each function returns
