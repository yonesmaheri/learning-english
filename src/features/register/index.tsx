"use client";
import { useState } from "react";
import AuthCard from "./components/authCard";
import AuthTabs from "./components/authTabs";
import RegisterStudentForm from "./components/studentForm";
import RegisterTutorForm from "./components/tutorForm";
import Link from "next/link";

type UserType = "student" | "tutor";
function RegisterTemplate() {
  const [activeTab, setActiveTab] = useState<UserType>("student");

  return (
    <main
      className="relative mx-auto flex w-full max-w-lg h-screen items-center justify-center px-4 py-10 sm:px-6"
      dir="rtl"
    >
      <div className="w-full">
        <AuthCard
          title="ایجاد حساب کاربری"
          description="برای شروع، نوع حساب خود را انتخاب کرده و اطلاعاتتان را وارد کنید."
        >
          <AuthTabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="relative">
            {activeTab === "student" ? (
              <RegisterStudentForm />
            ) : (
              <RegisterTutorForm />
            )}
            <p className="pt-2 text-center text-sm text-gray-500">
              حساب کاربری دارید؟{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 transition-colors duration-300 hover:text-indigo-700"
              >
                وارد شوید
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}

export default RegisterTemplate;
