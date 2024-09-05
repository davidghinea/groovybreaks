"use server";

export async function getUserData(accessToken: string | null | undefined) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
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

export async function getUserPlaylists(accessToken: string | null | undefined) {
  const userData = await getUserData(accessToken);
  // I could in fact store the userId somewhere else so I don't need to fetch this everytime, but I'm lazy.
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userData.id}/playlists?limit=50`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

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
