async function fetchData(
  url: string,
  accessToken: string | null | undefined,
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUserData(accessToken: string | null | undefined) {
  const url = "https://api.spotify.com/v1/me";
  return await fetchData(url, accessToken);
}

export async function getUserPlaylists(accessToken: string | null | undefined) {
  const userData = await getUserData(accessToken);
  if (!userData) return null;

  const url = `https://api.spotify.com/v1/users/${userData.id}/playlists?limit=50`;
  return await fetchData(url, accessToken);
}
