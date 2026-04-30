import { create } from "zustand";
import { supabaseClient } from "./SupabaseUtil";

import type { User } from "@supabase/supabase-js";

interface AuthState {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  init: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  authenticated: false,
  user: null,
  loading: true,
  init: async () => {
    const {
      data: { session: initialSession },
      error,
    } = await supabaseClient.auth.getSession();
    set({
      authenticated: !!initialSession,
      user: initialSession?.user ?? null,
      loading: false,
    });
    if (error) console.log("Supabase Auth Error: ", error);

    supabaseClient.auth.onAuthStateChange((_event, currentSession) => {
      set({
        authenticated: !!currentSession,
        user: currentSession?.user ?? null,
        loading: false,
      });
    });
  },
}));
