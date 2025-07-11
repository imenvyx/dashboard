import { AuthStoreType, UserType } from "@/types";
import { create } from "zustand";

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: (email: string, password: string) => {
    if (
      email === "technology@kameleonlabs.ai" &&
      password === "#4nrsHSre1#@uPC$3ZR8"
    ) {
      const user: UserType = {
        email,
        companies: ["company-1"],
        reports: ["sales", "inventory"],
      };
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
