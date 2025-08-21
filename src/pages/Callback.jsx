import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";


export default function Callback({ onSuccess }) {
  const hasRun = useRef(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!code || !codeVerifier) {
      console.warn("Callback abortado: falta 'code' o 'code_verifier'");
      return; // ⛔ no navegues ni hagas fetch si falta algo
    }

    const fetchToken = async () => {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        code_verifier: codeVerifier,
      });

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.removeItem("code_verifier");

          // 🧹 Limpia la URL para evitar usar el mismo código otra vez
          window.history.replaceState({}, document.title, "/callback");

          onSuccess(); // ✅ actualiza el token en App
          navigate("/"); // 🚀 redirige al dashboard
        } else {
          console.error("Token exchange failed:", data);
          navigate("/");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/");
      }
    };

    fetchToken();
  }, [navigate, onSuccess]);

  return (
    <div className="text-white h-screen flex items-center justify-center bg-black">
      <p>Autenticando con Spotify...</p>
    </div>
  );
}
