"use server";

import {
  accessTokenType,
  UserDataType,
  UserPlaylistsType,
  ApiError,
  PlaylistItemsType,
  AvailableDevices,
  PlaybackType,
} from "@/lib/types";

async function fetchData<T>(
  url: string,
  accessToken: accessTokenType,
): Promise<T> {
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
        if (errorResponse.error.status === 401) {
          throw new ApiError(
            errorResponse.error.status,
            "Your session has expired. Please log in again.",
          );
        } else if (errorResponse.error.status === 429) {
          throw new ApiError(
            errorResponse.error.status,
            "Too many people are using the app. Please try again later.",
          );
        } else if (errorResponse.error.status === 403)
          throw new ApiError(
            errorResponse.error.status,
            "You encountered a server exception. Please contact owners.",
          );
        else {
          throw new ApiError(
            errorResponse.error.status,
            errorResponse.error.message,
          );
        }
      } else {
        throw new ApiError(response.status, `An unexpected error occurred.`);
      }
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // re-throw ApiError as is
    }

    if (error instanceof Error) {
      if (error.message === "fetch failed") {
        throw new ApiError(
          500,
          "Unable to retrieve data. Try checking your internet connection.",
        );
      }
      // for people with no internet connection.
      throw new ApiError(500, error.message);
    }
    throw new ApiError(500, "An unexpected error occurred.");
  }
}
// generic function that can be used to fetch most of the endpoints in spotify api
// error handling is made up to throw errors for the error.tsx page
// the errors from spotify are of type { error:{ status:number, message:string }}

export async function getUserData(
  accessToken: accessTokenType,
): Promise<UserDataType> {
  const url = "https://api.spotify.com/v1/me";
  return await fetchData<UserDataType>(url, accessToken);
}
// https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile

export async function getUserPlaylists(
  accessToken: accessTokenType,
): Promise<UserPlaylistsType> {
  const userData = await getUserData(accessToken);
  const url = `https://api.spotify.com/v1/users/${userData.id}/playlists?limit=50`;
  return await fetchData<UserPlaylistsType>(url, accessToken);
}
// https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists

export async function getPlaylistById(
  accessToken: accessTokenType,
  playlistId: string,
): Promise<PlaylistItemsType> {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5`;
  // await new Promise((resolve) => setTimeout(resolve, 2000)); - to check suspense (not implemented yet)
  return await fetchData<PlaylistItemsType>(url, accessToken);
}
// https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

export async function getDevices(
  accessToken: accessTokenType,
): Promise<AvailableDevices> {
  const url = "https://api.spotify.com/v1/me/player/devices";
  return await fetchData<AvailableDevices>(url, accessToken);
}
// https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices

export async function getPlayback(
  accessToken: accessTokenType,
): Promise<PlaybackType> {
  const url = "https://api.spotify.com/v1/me/player";
  return await fetchData<PlaybackType>(url, accessToken);
}
// https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback

async function updateData<T>(
  url: string,
  accessToken: accessTokenType,
  body: Record<string, any> | null,
): Promise<T | Response> {
  // updated return type to include Response
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.ok) {
      return response; // return the response if status is 204 - otherwise you will get a 500 although the music starts
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.error) {
        if (errorResponse.error.status === 401) {
          throw new ApiError(
            errorResponse.error.status,
            "Your session has expired. Please log in again.",
          );
        } else if (errorResponse.error.status === 429) {
          throw new ApiError(
            errorResponse.error.status,
            "Too many people are using the app. Please try again later.",
          );
        } else if (errorResponse.error.status === 403) {
          throw new ApiError(
            errorResponse.error.status,
            "You encountered a server exception. Please contact owners.",
          );
        } else {
          throw new ApiError(
            errorResponse.error.status,
            errorResponse.error.message,
          );
        }
      } else {
        throw new ApiError(response.status, `An unexpected error occurred.`);
      }
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // re-throw ApiError as is
    }

    if (error instanceof Error) {
      if (error.message === "fetch failed") {
        throw new ApiError(
          500,
          "Unable to retrieve data. Try checking your internet connection.",
        );
      }
      // for people with no internet connection.
      throw new ApiError(500, error.message);
    }
    throw new ApiError(500, "An unexpected error occurred.");
  }
}

export async function playTrack(
  accessToken: accessTokenType,
  playlistId: string,
  offsetPosition: number,
  positionMs: number,
  deviceId: number,
): Promise<void> {
  const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
  const body = {
    context_uri: `spotify:playlist:${playlistId}`,
    offset: {
      position: offsetPosition,
    },
    position_ms: positionMs,
  };

  await updateData<void>(url, accessToken, body);
}

export async function resumeTrack(
  accessToken: accessTokenType,
  deviceId: number,
): Promise<void> {
  const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

  await updateData<void>(url, accessToken, null);
}

export async function pauseTrack(accessToken: accessTokenType): Promise<void> {
  const url = "https://api.spotify.com/v1/me/player/pause";

  await updateData<void>(url, accessToken, null);
}

// i recommend checking out "@/lib/types.tsx" to understand what each function returns
