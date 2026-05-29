"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/shared/lib/auth";
import CustomInput from "@/shared/components/customInput";
import CustomButton from "@/shared/components/customButton";
import { useLogin } from "@/shared/api/services/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth";

export default function LoginForm() {
  const router = useRouter();
  const { isPending, isSuccess, mutate } = useLogin();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    mutate(data, {
      async onSuccess(data) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setIsLoggedIn(true);
        toast.success("کاربر وارد شد.");
        router.push("/");
      },
      onError(error, variables, onMutateResult, context) {
        toast.success("نام کاربری یا رمز عبور نادرست میباشد");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-in fade-in duration-500"
    >
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
        placeholder="رمز عبور خود را وارد کنید"
        error={errors.password?.message}
        {...register("password")}
      />

      <CustomButton label="ورود" loading={isPending} />

      <p className="pt-2 text-center text-sm text-gray-500">
        حساب کاربری ندارید؟{" "}
        <Link
          href="/register"
          className="font-bold text-indigo-600 transition-colors duration-300 hover:text-indigo-700"
        >
          ثبت‌نام کنید
        </Link>
      </p>
    </form>
  );
}
