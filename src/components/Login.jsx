// src/components/Login.jsx
import { generateCodeVerifier, generateCodeChallenge } from "../auth/pkce";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

export default function Login() {
  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem("code_verifier", codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-xl font-bold shadow-md"
      >
        Iniciar sesión con Spotify
      </button>
    </div>
  );
}
