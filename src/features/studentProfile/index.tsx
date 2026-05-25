"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMe, useResetPassword } from "@/shared/api/services/auth";
import Skeleton from "@/shared/components/skeleton";
import CustomInput from "@/shared/components/customInput";
import { useUpdateStudent } from "@/shared/api/services/student";
import { toast } from "react-toastify";

const studentProfileSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  new_password: z.string().min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد"),
});

type StudentProfileFormValues = z.infer<typeof studentProfileSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function StudentProfile() {
  const { isPending, data, isError } = useMe();
  const { mutate, isPending: mutatePending } = useUpdateStudent();
  const { mutate: mutatePass, isPending: resetPending } = useResetPassword();
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
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
    if (!data) return;

    resetProfile({
      email: data.email ?? "",
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
    });

    resetResetPassword({
      email: data.email ?? "",
      new_password: "",
    });
  }, [data, resetProfile, resetResetPassword]);

  const onSubmitProfile = (values: StudentProfileFormValues) => {
    mutate(values, {
      onSuccess(data, variables, onMutateResult, context) {
        toast.success("اطلاعات با موفقیت بروز رسانی شد");
      },
    });
  };

  const onSubmitResetPassword = (values: ResetPasswordFormValues) => {
    mutatePass(values, {
      onSuccess(data, variables, onMutateResult, context) {
        toast.success("رمز عبور با موفقیت تغییر کرد");
        resetResetPassword();
      },
    });
  };

  if (isPending) {
    return (
      <>
        <h1 className="text-2xl font-black mb-10">اطلاعات دانش آموز</h1>

        <div className="flex flex-col gap-10">
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1 className="text-2xl font-black mb-10">اطلاعات دانش آموز</h1>
        <p>اطلاعاتی برای نمایش وجود ندارد</p>
      </>
    );
  }

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-black mb-10">اطلاعات دانش آموز</h1>

        <form
          onSubmit={handleSubmitProfile(onSubmitProfile)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right"
        >
          <CustomInput
            label="ایمیل"
            type="email"
            error={profileErrors.email?.message}
            {...registerProfile("email")}
          />

          <CustomInput
            label="نام"
            error={profileErrors.first_name?.message}
            {...registerProfile("first_name")}
          />

          <CustomInput
            label="نام خانوادگی"
            error={profileErrors.last_name?.message}
            {...registerProfile("last_name")}
          />

          <button
            type="submit"
            disabled={mutatePending}
            className="w-fit px-7 rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 lg:col-span-2"
          >
            {mutatePending ? "لطفا صبر کنید..." : " ذخیره تغییرات"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-10">تغییر رمز عبور</h2>

        <form
          onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right"
        >
          <input type="hidden" {...registerResetPassword("email")} />

          <CustomInput
            label="رمز عبور جدید"
            type="password"
            placeholder="رمز عبور جدید را وارد کنید"
            error={resetPasswordErrors.new_password?.message}
            {...registerResetPassword("new_password")}
          />

          <button
            type="submit"
            className="w-fit px-7 rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 lg:col-span-2"
          >
            {resetPending ? "لطفا صبر کنید..." : "تغییر رمز عبور"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default StudentProfile;
