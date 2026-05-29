import { useAuthStore } from "@/shared/store/auth";

export async function checkAuth() {
  const res = await fetch("http://localhost:8000/api/me", {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    useAuthStore.getState().setIsLoggedIn(false);
    useAuthStore.getState().setIsTutor(false);
    return;
  }

  if (res.ok) {
    const data = await res.json();

    useAuthStore.getState().setIsLoggedIn(true);
    useAuthStore.getState().setIsTutor(data.is_teacher);
  }
}
