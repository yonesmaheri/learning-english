import { useAuthStore } from "@/shared/store/auth";

export async function checkAuth() {
  const res = await fetch("http://localhost:8000/api/me", {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    useAuthStore.getState().setIsLoggedIn(false);
    return;
  }

  if (res.ok) {
    useAuthStore.getState().setIsLoggedIn(true);
  }
}
