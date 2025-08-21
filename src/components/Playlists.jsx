import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchUserPlaylists = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No token found");

  const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.items;
};

export default function PlaylistTracker() {
  const { data: playlists, isLoading, isError, error } = useQuery({
    queryKey: ["userPlaylists"],
    queryFn: fetchUserPlaylists,
    enabled: !!localStorage.getItem("access_token"),
  });

  const [selected, setSelected] = useState(null);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-lg border border-gray-800">
      {/* Sidebar playlists */}
      <div className="w-1/3 border-r border-gray-700 p-4 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/" className="text-blue-400 underline">
            volver
          </Link>
          <h2 className="text-xl font-bold ">Tus Playlists</h2>
        </div>
        {isLoading && <p>Cargando...</p>}
        {isError && <p className="text-red-500">Error: {error.message}</p>}
        <ul className="space-y-3">
          {playlists?.map((playlist) => (
            <li
              key={playlist.id}
              onClick={() => setSelected(playlist)}
              className={`cursor-pointer p-3 rounded ${selected?.id === playlist.id ? "bg-green-700" : "bg-gray-800"
                } hover:bg-gray-700 transition-colors`}
            >
              <p className="text-base font-semibold">{playlist.name}</p>
              <p className="text-sm text-gray-400">{playlist.tracks.total} canciones</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selected ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ">{selected.name}</h2>
              <div className="">
                <a
                  href={selected.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Abrir en Spotify
                </a>
              </div>
            </div>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${selected.id}`}
              width="100%"
              height="600"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded"
            ></iframe>

          </>
        ) : (
          <p className="text-gray-400">Selecciona una playlist para ver su contenido</p>
        )}
      </div>
    </div>
  );
}
