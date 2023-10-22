// components/SpotifyPlayer.tsx
import React from "react";

interface SpotifyPlayerProps {
  playlistId: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ playlistId }) => {
  return (
    <iframe
      title="Spotify Embed: Recommendation Playlist"
      src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
      width="100%"
      height="100%"
      style={{ minHeight: "360px" }}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
};

export default SpotifyPlayer;
