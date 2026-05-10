"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/shared/lib/auth";
import CustomInput from "@/shared/components/customInput";
import CustomButton from "@/shared/components/customButton";

export default function RegisterTutorForm() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/tutor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result?.message || "ثبت‌نام مدرس با خطا مواجه شد");
        return;
      }

      setSuccessMessage("ثبت‌نام مدرس با موفقیت انجام شد");
      reset();
    } catch {
      setServerError("خطای ارتباط با سرور");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-in fade-in duration-500"
    >
      <CustomInput
        label="نام"
        placeholder="نام خود را وارد کنید"
        error={errors.name?.message}
        {...register("name")}
      />

      <CustomInput
        label="ایمیل"
        type="email"
        placeholder="example@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <CustomInput
        label="رمز عبور"
        type="password"
        placeholder="حداقل ۶ کاراکتر"
        error={errors.password?.message}
        {...register("password")}
      />

      {serverError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 animate-in fade-in duration-300">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600 animate-in fade-in duration-300">
          {successMessage}
        </div>
      )}

      <CustomButton label="ثبت‌نام به عنوان مدرس" loading={isSubmitting} />
    </form>
  );
}
