import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");

  // Se não houver token ou user, redireciona para login
  if (!token || !user) {
    alert("Faça login para acessar esta página.");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}