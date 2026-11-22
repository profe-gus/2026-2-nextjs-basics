import { SessionUser } from "@/lib/jwt"
import { create } from "zustand";

type SessionState = {
    user : SessionUser | null;
    setUser : (user: SessionUser | null) => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
    user: null,
    setUser: (user) => set({user})
}))