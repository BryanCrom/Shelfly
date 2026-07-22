import { Link, useNavigate } from "react-router-dom";
import { IconBook } from "@tabler/icons-react";
import { supabaseClient } from "../utils/SupabaseUtil";
import { useAuth } from "../utils/ZustandUtil";
import { useState } from "react";
import ProfileData from "./ProfileData";

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
        <>
          <div className="avatar avatar-placeholder dropdown dropdown-center dropdown-bottom">
            <div
              className="bg-neutral text-neutral-content hover:border-neutral-content mx-10 w-16 rounded-full text-3xl hover:border-2"
              role="button"
              tabIndex={0}
            >
              <span>B</span>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 border-base-200 my-4 flex w-full rounded-lg border p-2 shadow-sm"
            >
              <ProfileData />
              <button
                onClick={handleSignOut}
                className="btn btn-primary"
                disabled={loading}
              >
                Sign Out
              </button>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
