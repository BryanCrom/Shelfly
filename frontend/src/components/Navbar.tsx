import { Link, useNavigate } from "react-router-dom";
import { IconBook } from "@tabler/icons-react";
import { supabaseClient } from "../utils/SupabaseUtil";
import { useAuth } from "../utils/ZustandUtil";
import { useState } from "react";

const Navbar = () => {
  const authenticated = useAuth((state) => state.authenticated);
  const loadingAuth = useAuth((state) => state.loading);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    setLoading(true);

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.log("Supabase Auth error: ", error);
    } else {
      setLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-200 border-primary fixed top-0 z-10 flex h-32 justify-between border-b shadow-md">
      <Link
        to="/"
        className="btn btn-ghost text-primary font-serif text-6xl font-light"
      >
        Shelfly
        <IconBook size={64} />
      </Link>
      {authenticated && !loadingAuth && (
        <button
          onClick={handleSignOut}
          className="btn btn-primary mx-10"
          disabled={loading}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Navbar;
