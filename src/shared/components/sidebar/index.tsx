"use client";

import { useMe } from "@/shared/api/services/auth";
import Link from "next/link";
import { useState } from "react";

type DashboardShellProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardShell({
  sidebar,
  children,
}: DashboardShellProps) {
  const [open, setOpen] = useState(false);
  const { isPending, isSuccess, data } = useMe();
  return (
    <div className="min-h-screen relative">
      <div className="mx-auto flex max-w-[1280px] gap-6 px-4 py-6 lg:px-6">
        {open && (
          <div
            className="fixed inset-0 z-40  lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`
            fixed right-0 top-0 z-50 h-screen w-72
            transform border-l border-white/10
             p-5 transition-transform duration-300
            lg:hidden
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">منو</h2>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 transition hover:bg-white/10"
            >
              <span>X</span>
            </button>
          </div>

          {sidebar}
        </div>

        <aside className="sticky top-6 hidden h-[calc(100vh-48px)] w-72 shrink-0 overflow-y-auto rounded-3xl border border-gray-300  p-5 backdrop-blur lg:block">
          {sidebar}
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-white/10 bg-slate-900 p-3 transition hover:bg-slate-800"
            >
              Menu
            </button>
          </div>

          <div className="rounded-3xl border border-gray-300 h-full p-5 backdrop-blur md:p-7">
            {children}
          </div>
        </main>
      </div>
      {isSuccess && !data.tutor_approved && (
        <div className="fixed bg-black/50 top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-2xl px-10 py-5 max-w-200 flex flex-col">
            متاسفانه حساب کاربری شما هنوز توسط ادمین تایید نشده است
            <div className="text-center mt-10">
              <Link href={'/'} className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-600 hover:text-indigo-600">
                بازگشت به خانه
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
