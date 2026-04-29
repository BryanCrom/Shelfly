import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/SupabaseUtil";
import { Navigate } from "react-router";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      console.log(session, error);

      if (error) {
        console.log("Supabase Auth Error: ", error);
      }

      setAuthenticated(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  } else {
    if (authenticated) {
      return <>{children}</>;
    }
    return <Navigate to="/" />;
  }
}

export default AuthWrapper;
