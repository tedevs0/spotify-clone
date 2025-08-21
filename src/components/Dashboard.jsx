import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";

const fetchUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No token found");

  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;

};

export default function Dashboard() {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["spotifyUser"],
    queryFn: fetchUser,
    retry: false, // evita reintentos si no hay token
    enabled: !!localStorage.getItem("access_token"), // solo corre si hay token
  });


  if (isLoading) return <p className="text-white">Cargando perfil...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="text-white p-10 bg-black ">
      {/* <h1 className="text-3xl font-bold mb-4">Bienvenido a Spotify Clone</h1> */}
      <div>
        <p className="text-xl">Hola, {user.display_name}!</p>
        <p className="text-sm text-gray-400">Email: {user.email}</p>
        <img width="300px" height="300px" src={user.images[0]?.url} alt="me" />
      </div>
      <br />
      <Link to="/playlists" className="text-blue-400 underline">
        Ver mis playlists
      </Link>
    </div>
  );
}
