// src/components/Dashboard.jsx
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="text-white p-10 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a Spotify Clone</h1>
      {user ? (
        <div>
          <p className="text-xl">Hola, {user.display_name}!</p>
          <p className="text-sm text-gray-400">Email: {user.email}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}
