"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useMe, useResetPassword } from "@/shared/api/services/auth";
import Skeleton from "@/shared/components/skeleton";
import { toast } from "react-toastify";
import { useUpdateTutor, useTutorDashboard } from "@/shared/api/services/tutor";
import { useQueryClient } from "@tanstack/react-query";
import CustomInput from "@/shared/components/customInput";

const tutorProfileSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  new_password: z.string().min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد"),
});

type TutorProfileFormValues = z.infer<typeof tutorProfileSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function TutorProfile() {
  const queryClient = useQueryClient();
  const { isPending: mePending, data: meData, isError: meError } = useMe();
  const {
    isPending: tutorPending,
    data: tutorData,
    isError: tutorError,
  } = useTutorDashboard();

  const { mutate: updateProfile, isPending: mutatePending } = useUpdateTutor();
  const { mutate: mutatePass, isPending: resetPending } = useResetPassword();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<TutorProfileFormValues>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleSubmitResetPassword,
    reset: resetResetPassword,
    formState: { errors: resetPasswordErrors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      new_password: "",
    },
  });

  useEffect(() => {
    if (!meData) return;

    resetProfile({
      email: meData.email ?? "",
      first_name: meData.first_name ?? "",
      last_name: meData.last_name ?? "",
    });

    resetResetPassword({
      email: meData.email ?? "",
      new_password: "",
    });
  }, [meData, resetProfile, resetResetPassword]);

  const onSubmitProfile = (values: TutorProfileFormValues) => {
    updateProfile(values, {
      onSuccess() {
        toast.success("اطلاعات با موفقیت بروز رسانی شد");
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
    });
  };

  const onSubmitResetPassword = (values: ResetPasswordFormValues) => {
    mutatePass(values, {
      onSuccess() {
        toast.success("رمز عبور با موفقیت تغییر کرد");
        resetResetPassword();
      },
    });
  };

  if (mePending || tutorPending) {
    return (
      <div dir="rtl">
        <h1 className="text-2xl font-black mb-10">اطلاعات مدرس</h1>
        <div className="flex flex-col gap-10">
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20" dir="rtl">
      <section>
        <h1 className="text-2xl font-black mb-10 text-right">اطلاعات مدرس</h1>

        <form
          onSubmit={handleSubmitProfile(onSubmitProfile)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right"
        >
          <CustomInput
            label="ایمیل"
            type="email"
            error={profileErrors.email?.message as string}
            {...registerProfile("email")}
          />

          <CustomInput
            label="نام"
            error={profileErrors.first_name?.message as string}
            {...registerProfile("first_name")}
          />

          <CustomInput
            label="نام خانوادگی"
            error={profileErrors.last_name?.message as string}
            {...registerProfile("last_name")}
          />

          <button
            type="submit"
            disabled={mutatePending}
            className="w-fit px-8 rounded-2xl bg-indigo-600 py-3 text-white font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 lg:col-span-2 disabled:opacity-70"
          >
            {mutatePending ? "لطفا صبر کنید..." : "ذخیره تغییرات"}
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/tutor/certificates"
          className="group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-100 transition-colors text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="M11 8v5l3 3" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-black text-slate-800">
                گواهینامه‌ها
              </h3>
              <p className="text-sm text-slate-500">
                مدیریت مدارک و گواهینامه‌های اخذ شده
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400 group-hover:translate-x-[-4px] transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        <Link
          href="/dashboard/tutor/education"
          className="group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-100 transition-colors text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-black text-slate-800">
                سوابق تحصیلی
              </h3>
              <p className="text-sm text-slate-500">
                مدیریت سوابق دانشگاهی و تحصیلی
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400 group-hover:translate-x-[-4px] transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        <Link
          href="/dashboard/tutor/experience"
          className="group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-100 transition-colors text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-black text-slate-800">سوابق کاری</h3>
              <p className="text-sm text-slate-500">
                مدیریت تجربیات و سوابق شغلی
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400 group-hover:translate-x-[-4px] transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        <Link
          href="/dashboard/tutor/profile-courses"
          className="group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-100 transition-colors text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-black text-slate-800">
                دوره‌های آموزشی
              </h3>
              <p className="text-sm text-slate-500">
                مدیریت دوره‌ها و کلاس‌های تدریس
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400 group-hover:translate-x-[-4px] transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-black mb-10 text-right text-slate-800">
          تغییر رمز عبور
        </h2>

        <form
          onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right"
        >
          <input type="hidden" {...registerResetPassword("email")} />

          <CustomInput
            label="رمز عبور جدید"
            type="password"
            placeholder="رمز عبور جدید را وارد کنید"
            error={resetPasswordErrors.new_password?.message as string}
            {...registerResetPassword("new_password")}
          />

          <button
            type="submit"
            disabled={resetPending}
            className="w-fit px-8 rounded-2xl bg-indigo-600 py-3 text-white font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 lg:col-span-2 disabled:opacity-70"
          >
            {resetPending ? "لطفا صبر کنید..." : "تغییر رمز عبور"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default TutorProfile;
