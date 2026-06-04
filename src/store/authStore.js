import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      role: null,
      name: null,

      login: (role) =>
        set({
          role,
          name: role === "admin" ? "Admin User" : "Normal User",
        }),

      logout: () =>
        set({
          role: null,
          name: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;