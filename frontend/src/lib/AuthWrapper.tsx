import { Navigate } from "react-router";
import { useAuth } from "../utils/ZustandUtil";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const authenticated = useAuth((state) => state.authenticated);
  const loadingAuth = useAuth((state) => state.loading);

  if (!loadingAuth && !authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthWrapper;
