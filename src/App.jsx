// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./pages/Callback";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />} />
        <Route path="/callback" element={<Callback onSuccess={() => setToken(localStorage.getItem("access_token"))} />} />
      </Routes>
    </BrowserRouter>
  );
}
