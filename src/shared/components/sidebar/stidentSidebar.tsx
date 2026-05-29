"use client";

import { useLogout } from "@/shared/api/services/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    title: "داشبورد",
    href: "/dashboard/student",
  },
  {
    title: "دوره های من",
    href: "/dashboard/student/courses",
  },
  {
    title: "پرداخت ها",
    href: "/dashboard/student/payments",
  },
  {
    title: "پروفایل",
    href: "/dashboard/student/edit",
  },
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logoutMutate, isPending } = useLogout();
  function logout() {
    logoutMutate(undefined, {
      onSuccess() {
        localStorage.removeItem("token");
        localStorage.removeItem("access");
        router.push("/");
      },
    });
  }
  return (
    <div className="flex h-full flex-col">
      <div className="mb-10">
        <h2 className="text-2xl font-black">پنل دانش آموز</h2>

        <p className="mt-2 text-sm text-slate-400">
          مدیریت دوره ها و حساب کاربری
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
              group flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all
              ${
                isActive
                  ? "bg-blue-500/15 text-blue-500 shadow-sm"
                  : "text-slate-800 hover:bg-blue-500/10 hover:text-blue-400"
              }
            `}
            >
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        disabled={isPending}
        className="
          mt-6 flex items-center gap-3 rounded-2xl
          border border-red-500/20 bg-red-500/10
          px-4 py-3 text-red-400 transition
          hover:bg-red-500/20
        "
      >
        <span>{isPending ? "لطفا صبر کنید..." : " خروج از حساب"}</span>
      </button>
    </div>
  );
}
