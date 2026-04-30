import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../utils/SupabaseUtil";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.log("Supabase Auth error: ", error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="navbar bg-base-200 border-base-300 fixed top-0 z-10 flex h-32 justify-between shadow-sm">
      <a className="btn btn-ghost text-primary font-serif text-6xl font-light">
        Shelfly
      </a>
      <button onClick={handleSignOut} className="btn btn-primary mx-10">
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
