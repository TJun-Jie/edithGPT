import SpotifyAuthButton from "./button";
import SpotifyPlayer from "../../edith/components/spotifyEmbedded";

const Spotify = () => {
  const SPOTIFY_CLIENT_ID = "4813024f30024c439959dba65088bd0f";
  const SPOTIFY_CLIENT_SECRET = "4fc2c96cac0e4c79aa145fb7698c5309";
  const SPOTIFY_REDIRECT_URI = "http://localhost:3000/callback";

  const key = SPOTIFY_CLIENT_ID;

  return (
    <div>
      <h1>Spotify</h1>
      <SpotifyAuthButton clientId={key} />
      <div className="tw-w-1/2">
        <SpotifyPlayer playlistId="6lHIfp4RnvAoXxSeLzIY49" />
      </div>
    </div>
  );
};

export default Spotify;
