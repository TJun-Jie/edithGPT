import React, { useState } from "react";

const SpotifyAuthButton: React.FC<{ clientId: string }> = ({ clientId }) => {
  const [message, setMessage] = useState<string | null>(null);

  const redirectToAuthCodeFlow = async () => {
    try {
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      localStorage.setItem("verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", "http://localhost:3000/callback");
      params.append(
        "scope",
        "user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-top-read playlist-modify-private playlist-modify-public"
      );
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    } catch (err) {
      setMessage((err as Error).message);
    }
  };

  return (
    <div>
      <button onClick={redirectToAuthCodeFlow}>
        Authenticate with Spotify
      </button>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

function generateCodeVerifier(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default SpotifyAuthButton;
