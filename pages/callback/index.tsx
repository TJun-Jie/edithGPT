"use client";
import WebPlayback from "@/edith/components/WebPlayback";
import {
  createPlaylist,
  fetchCurrentSong,
  fetchProfile,
  fetchReccomendations,
  fetchTopTracks,
  getAccessToken,
} from "@/edith/functions/spotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CallbackComponent = () => {
  const router = useRouter();

  const { code } = router.query;

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        const newAccessToken = await getAccessToken(clientId, code as string);
        setAccessToken(newAccessToken);

        if (newAccessToken) {
          const profile = await fetchProfile(newAccessToken);
          const id = profile.id;
          const topTracks = await fetchTopTracks(newAccessToken);
          const topTracksIds = topTracks.items.map((song: any) => song.id);

          const reccomendedSongs = await fetchReccomendations(
            newAccessToken,
            "0.7",
            topTracksIds
          );
          const reccomendedUri = reccomendedSongs.tracks.map(
            (tracks: any) => tracks.uri
          );

          const playlist = await createPlaylist(
            newAccessToken,
            id,
            reccomendedUri
          );

          console.log(playlist);
        }
      }
    };

    fetchData();
  }, [code]);

  const SPOTIFY_CLIENT_ID = "4813024f30024c439959dba65088bd0f";
  const SPOTIFY_CLIENT_SECRET = "4fc2c96cac0e4c79aa145fb7698c5309";
  const SPOTIFY_REDIRECT_URI = "http://localhost:3000/callback";

  const clientId = SPOTIFY_CLIENT_ID;
  const client_secret = SPOTIFY_CLIENT_SECRET;
  const refresh_token = "4fc2c96cac0e4c79aa145fb7698c5309";

  //   const profile = await fetchProfile(accessToken);
  //   console.log(profile);

  if (accessToken) {
    return (
      <div>
        hi
        {/* <WebPlayback token={accessToken} /> */}
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default CallbackComponent;
