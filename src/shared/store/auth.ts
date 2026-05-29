import { create } from "zustand";

type AuthState = {
  is_loggedin: boolean | null;
  is_tutor: boolean | null;

  setIsLoggedIn: (value: boolean) => void;
  setIsTutor: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  is_loggedin: null,
  is_tutor: null,

  setIsLoggedIn: (value) =>
    set({
      is_loggedin: value,
    }),

  setIsTutor: (value) =>
    set({
      is_tutor: value,
    }),
}));
