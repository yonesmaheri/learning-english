"use client";

import { useState } from "react";
import NavLogo from "./components/navLogo";
import NavMenu from "./components/navMenu";
import NavActions from "./components/navActions";
import MobileMenuButton from "./components/mobileMenuButton";
import Skeleton from "../skeleton";
import { useAuthStore } from "@/shared/store/auth";

const navItems = [
  { label: "خانه", href: "/" },
  { label: "وبلاگ", href: "/blog" },
  { label: "دوره ها", href: "/courses" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { is_loggedin, is_tutor } = useAuthStore();

  const isLoading = is_loggedin === null;

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md"
    >
      <nav className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="order-3 md:order-1 flex items-center">
            <NavLogo />
          </div>

          <div className="order-2 hidden flex-1 justify-center md:flex">
            <NavMenu items={navItems} />
          </div>

          <div className="order-1 md:order-3 hidden items-center gap-3 md:flex">
            {isLoading ? (
              <Skeleton className="h-10 w-20 rounded-md" />
            ) : (
              <NavActions isLoggedIn={is_loggedin} isTutor={is_tutor} />
            )}
          </div>

          <div className="order-1 md:hidden">
            <MobileMenuButton
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <NavMenu items={navItems} mobile />

            <div className="border-t border-gray-100 pt-4">
              {isLoading ? (
                <Skeleton className="h-10 w-20 rounded-md" />
              ) : (
                <NavActions
                  mobile
                  isLoggedIn={is_loggedin}
                  isTutor={is_tutor}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
