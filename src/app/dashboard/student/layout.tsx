import DashboardShell from "@/shared/components/sidebar";
import StudentSidebar from "@/shared/components/sidebar/stidentSidebar";
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

  if (me.is_teacher) {
    redirect("/dashboard/tutor");
  }

  return (
    <DashboardShell sidebar={<StudentSidebar />}>{children}</DashboardShell>
  );
}
