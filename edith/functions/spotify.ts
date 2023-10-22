export async function getAccessToken(
  clientId: string,
  code: string
): Promise<string> {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/callback");
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

export async function fetchProfile(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchCurrentSong(token: string): Promise<any> {
  const result = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await result.json();
}

export async function fetchReccomendations(
  token: string,
  targetValence: string,
  topTracksIds: string[]
): Promise<any> {
  const result = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${topTracksIds.join(
      ","
    )}&valence=${targetValence}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await result.json();
}

export async function fetchTopTracks(token: string): Promise<any> {
  const result = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (result) {
    return await result.json();
  }
}

export async function createPlaylist(
  token: string,
  id: string,
  tracksUri: string[]
): Promise<any> {
  const body = JSON.stringify({
    name: "My recommendation playlistssss",
    description: "Playlist created by the tutorial on developer.spotify.com",
    public: false,
  });
  const result = await fetch(
    `https://api.spotify.com/v1/users/${id}/playlists`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: body,
    }
  );
  const { id: playlistId } = await result.json();

  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksUri.join(
      ","
    )}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  await res.json();
  return playlistId;
}
