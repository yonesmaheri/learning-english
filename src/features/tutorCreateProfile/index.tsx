"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tutorProfileSchema } from "@/shared/lib/tutor";
import { z } from "zod";
import { useState } from "react";
import CustomInput from "@/shared/components/customInput";
import { useTutorCreateProfile } from "@/shared/api/services/tutor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof tutorProfileSchema>;

export default function CreateTutorProfile() {
  const router = useRouter();
  const { mutate, isPending } = useTutorCreateProfile();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(tutorProfileSchema),
  });

  const commaSeparatedToArray = (value: string) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();

    const languages = commaSeparatedToArray(values.languages_spoken as any);
    const subjects = commaSeparatedToArray(values.subjects as any);

    Object.entries(values).forEach(([key, value]) => {
      if (key === "languages_spoken" || key === "subjects") {
        return;
      }

      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    languages.forEach((language, index) => {
      formData.append(`languages_spoken[${index}]`, language);
    });

    subjects.forEach((subject, index) => {
      formData.append(`subjects[${index}]`, subject);
    });

    mutate(formData, {
      onSuccess() {
        toast.success("پروفایل با موفقیت ساخته شد");
        router.push("/");
      },
    });
  };

  return (
    <div dir="rtl" className="mt-15">
      <h1 className="text-2xl font-black mb-10">ایجاد فرم مدرس</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 w-full grid grid-cols-1 lg:grid-cols-2 text-right"
      >
        <CustomInput
          label="ایمیل"
          type="email"
          error={errors.user_email?.message}
          {...register("user_email")}
        />

        <CustomInput
          label="نام"
          error={errors.user_first_name?.message}
          {...register("user_first_name")}
        />

        <CustomInput
          label="نام خانوادگی"
          error={errors.user_last_name?.message}
          {...register("user_last_name")}
        />

        <CustomInput
          label="کشور"
          error={errors.country?.message}
          {...register("country")}
        />

        <CustomInput
          label="شماره تماس"
          error={errors.phone_number?.message}
          {...register("phone_number")}
        />

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            تصویر پروفایل
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("profile_picture", file, { shouldValidate: true });
              }
            }}
          />
          {errors.profile_picture && (
            <p className="text-red-500 text-sm">
              {errors.profile_picture.message as string}
            </p>
          )}
        </div>

        <CustomInput
          label="زبان‌ها"
          placeholder="مثلاً English, Spanish, German"
          error={errors.languages_spoken?.message}
          {...register("languages_spoken")}
        />

        <CustomInput
          label="تخصص‌ها / دروس"
          placeholder="مثلاً Math, Physics, Programming"
          error={errors.subjects?.message}
          {...register("subjects")}
        />

        <CustomInput
          label="بیوگرافی"
          error={errors.bio?.message}
          {...register("bio")}
        />

        <CustomInput
          label="سبک تدریس"
          error={errors.teaching_style?.message}
          {...register("teaching_style")}
        />

        <CustomInput
          label="انتظارات"
          error={errors.expectation?.message}
          {...register("expectation")}
        />

        <CustomInput
          label="توضیحات تکمیلی"
          error={errors.description?.message}
          {...register("description")}
        />

        <button
          disabled={isPending}
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 mb-15 col-span-2"
        >
          {isPending ? "لطفا صبر کنید..." : "ایجاد پروفایل"}
        </button>
      </form>
    </div>
  );
}
