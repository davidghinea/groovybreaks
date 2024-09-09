import {
  accessTokenType,
  UserDataType,
  UserPlaylistsType,
  ApiError,
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
          `API Error: Status ${apiError.status}, Message: ${apiError.message}`,
        );
      } else {
        throw new Error(`Unknown API error. Status: ${response.status}`);
      }
    }

    const data: T = await response.json(); // Enforces type
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(
      `Fetch Error: ${error instanceof Error ? error.message : "Unknown error"}`,
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

// i recommend checking out "@/lib/types.tsx" to understand what each function returns
