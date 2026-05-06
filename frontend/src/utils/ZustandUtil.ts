import { create } from "zustand";
import { supabaseClient } from "./SupabaseUtil";

import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string;
  createdAt: string;
}

interface AuthState {
  authenticated: boolean;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  init: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  authenticated: false,
  user: null,
  loading: true,
  profile: null,
  init: async () => {
    const {
      data: { session: initialSession },
      error,
    } = await supabaseClient.auth.getSession();

    const { data: initialProfile } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", initialSession?.user.id)
      .single<Profile>();

    set({
      authenticated: !!initialSession,
      user: initialSession?.user ?? null,
      profile: initialProfile,
      loading: false,
    });
    if (error) console.log("Supabase Auth Error: ", error);

    supabaseClient.auth.onAuthStateChange(async (_event, currentSession) => {
      const { data: currentProfile } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", currentSession?.user.id)
        .single<Profile>();

      set({
        authenticated: !!currentSession,
        user: currentSession?.user ?? null,
        profile: currentProfile,
        loading: false,
      });
    });
  },
}));
