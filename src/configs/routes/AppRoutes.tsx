import { Routes, Route } from "react-router";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute"; 
import { Cadastro } from "../../pages/Cadastro"; 
import { Login } from "../../pages/Login";
import { Perfil } from "../../pages/Perfil";
import { Explore } from "../../pages/Explore";
import { PaginaInicial } from "../../pages/PaginaInicial";
import { NotFoundPage } from "../../pages/NotFoundPage";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/cadastrar" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><PaginaInicial /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}