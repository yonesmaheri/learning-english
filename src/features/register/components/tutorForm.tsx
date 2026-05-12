"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/shared/lib/auth";
import CustomInput from "@/shared/components/customInput";
import CustomButton from "@/shared/components/customButton";
import { toast } from "react-toastify";
import { useRegTutor } from "@/shared/api/services/auth";

export default function RegisterTutorForm() {
  const { isPending, isSuccess, mutate } = useRegTutor();
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
    mutate(data, {
      onSuccess(data) {
        toast.success("کاربر ثبت نام شد.");
      },
      onError() {
        toast.error("مشکلی رخ داده است");
      },
    });
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

      <CustomButton label="ثبت‌نام به عنوان مدرس" loading={isPending} />
    </form>
  );
}
