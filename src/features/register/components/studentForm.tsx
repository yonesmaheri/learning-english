"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/shared/lib/auth";
import CustomInput from "@/shared/components/customInput";
import CustomButton from "@/shared/components/customButton";
import { useRegister } from "@/shared/api/services/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterStudentForm() {
  const router = useRouter();

  const { isPending, isSuccess, mutate } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      is_teacher: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    mutate(data, {
      onSuccess(data) {
        toast.success("کاربر ثبت نام شد.");
        router.push("/login");
      },
      onError() {
        toast.error("کاربر با این اطلاعات ثبت نام شده است");
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
        error={errors.first_name?.message}
        {...register("first_name")}
      />
      <CustomInput
        label="نام خانوادگی"
        placeholder="نام خانوادگی خود را وارد کنید"
        error={errors.last_name?.message}
        {...register("last_name")}
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
      <CustomButton label="ثبت‌نام به عنوان دانشجو" loading={isPending} />
    </form>
  );
}
