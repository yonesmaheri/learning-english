import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getMe() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  const res = await fetch(`http://localhost:8000/api/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function DashboardPage() {
  const me = await getMe();

  if (!me) {
    redirect("/login");
  }

  if (me.is_teacher) {
    redirect("/dashboard/tutor");
  }

  redirect("/dashboard/student");
}
