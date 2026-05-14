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

    if (initialSession) {
      const { data: initialProfile } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", initialSession?.user.id)
        .single<Profile>();

      set({ profile: initialProfile });
    } else {
      set({ profile: null });
    }

    set({
      authenticated: !!initialSession,
      user: initialSession?.user ?? null,
      loading: false,
    });
    if (error) console.log("Supabase Auth Error: ", error);

    supabaseClient.auth.onAuthStateChange(async (_event, currentSession) => {
      set({
        authenticated: !!currentSession,
        user: currentSession?.user ?? null,
        loading: false,
      });

      if (currentSession) {
        setTimeout(async () => {
          const { data: currentProfile } = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", currentSession?.user.id)
            .single<Profile>();

          set({ profile: currentProfile });
        }, 0);
      } else {
        set({ profile: null });
      }
    });
  },
}));
