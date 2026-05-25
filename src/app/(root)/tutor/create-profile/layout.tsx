import DashboardShell from "@/shared/components/sidebar";
import TutorSidebar from "@/shared/components/sidebar/tutorSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getMe() {
  const cookieStore = await cookies();

  const res = await fetch(`http://localhost:8000/api/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) {
    redirect("/login");
  }

  if (!me.is_teacher) {
    redirect("/dashboard/student");
  }
  if (me.is_teacher && me.has_tutor_profile) {
    redirect("/dashboard/tutor");
  }

  return children;
}
