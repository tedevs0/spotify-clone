import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const fetchPlaylistTracks = async (playlistId) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.items.map((item) => item.track); // Solo los tracks
};


export default function PlaylistTracks() {
  const { playlistId } = useParams(); // Recibe el ID de la playlist desde la URL
  const { data: tracks, isLoading, isError, error } = useQuery({
    queryKey: ["playlistTracks", playlistId],
    queryFn: () => fetchPlaylistTracks(playlistId),
    enabled: !!playlistId,
  });

  if (isLoading) return <p className="text-white">Cargando canciones...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="text-white p-6">
      <Link to="/playlists" className="text-blue-400 underline">
        Volver
      </Link>
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Canciones</h2>
      <ul className="space-y-3">
        {tracks.map((track) => (
          <li key={track.id} className="bg-gray-800 p-4 rounded">
            <p className="text-lg font-semibold">{track.name}</p>
            <p className="text-sm text-gray-400">Artista: {track.artists[0]?.name}</p>
            {track.preview_url ? (
              <audio controls src={track.preview_url} className="w-full mt-2" />
            ) : (
              <a
                href={`https://open.spotify.com/track/${track.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline mt-2 inline-block"
              >
                Escuchar en Spotify
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
