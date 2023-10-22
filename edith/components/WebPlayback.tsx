"use client";
import { useEffect, useState } from "react";
import SpotifyPlayerUI from "./SpotifyPlayerUI";

const WebPlayback = ({ token }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    const handleSDKReady = async () => {
      const playerInstance = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(playerInstance);

      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      playerInstance.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      await playerInstance.connect();
    };

    // Check if the SDK is already loaded and ready
    if (window.Spotify) {
      handleSDKReady();
    } else {
      window.onSpotifyWebPlaybackSDKReady = handleSDKReady;
    }

    // Cleanup on component unmount
    return () => {
      if (player) {
        player.disconnect();
      }
      document.body.removeChild(script);
    };
  }, []);

  if (!player) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <SpotifyPlayerUI player={player} />
        </div>
      </div>
    </>
  );
};

export default WebPlayback;
